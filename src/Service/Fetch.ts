import {encode} from 'js-base64';
import clientDetails from "../../do-not-commit/client-details.json";
import AsyncStorage from '@react-native-async-storage/async-storage';

const accessTokenKey = 'SPOTIFY_ACCESS_TOKEN';

const ERR_CODE__AUTH_EXPIRED = 'ERR_CODE__AUTH_EXPIRED';

export const getAccessToken = () => {
  const clientId = clientDetails.id;
  const clientSecret = clientDetails.secret;
  return fetch(`https://accounts.spotify.com/api/token`, {
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${encode(`${clientId}:${clientSecret}`)}`,
    }
  })
    .then(r => r.json())
    .then(r => {
      console.log(r);
      AsyncStorage.setItem(accessTokenKey, r.access_token);
      return r.access_token;
    }).catch(console.error);
  // todo handle errors
}

export const fetchWithAuth = async (url: string, abortController: AbortController) => {
  const accessToken = await AsyncStorage.getItem(accessTokenKey);
  if (!accessToken) {
    return getAccessToken().then(r => fetchWithAccessToken(url, r, abortController));
  }
  return fetchWithAccessToken(url, accessToken, abortController)
    .catch((r: Error) => {
      if (r.message === ERR_CODE__AUTH_EXPIRED) {
        return getAccessToken().then(r => fetchWithAccessToken(url, r, abortController));
      }
      console.error(r);
      throw r;
    });
};

export const fetchWithAccessToken = (url: string, accessToken: string, abortController: AbortController) => fetch
(`https://api.spotify.com${url}`, {
  signal: abortController.signal,
  headers: {
    'Authorization': `Bearer ${accessToken}`,
  }
}).then(r => {
  if (r.ok) {
    return r.json();
  }
  if (r.status === 401) {
    return r.json().then(r => {
      if (r.error?.message === 'The access token expired') {
        throw new Error(ERR_CODE__AUTH_EXPIRED);
      }
      throw r;
    })
  }
  return r.json();
});