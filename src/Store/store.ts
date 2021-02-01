import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {albums, AlbumState} from "./AlbumState";
import {credentials, Credentials} from "./CredentialsState";

export type AppState = {
    albums: AlbumState,
    credentials: Credentials,
};

export const rootReducer = combineReducers<AppState>({
    albums,
    credentials,
});

// @ts-ignore
export const store = createStore(
    rootReducer,
    undefined,
    applyMiddleware(thunk)
);