import React from "react";
import {FlatList, StyleSheet, Text, View, Image} from "react-native";
import {useRoute} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../Store/store";
import {getAlbum} from "../Store/AlbumState";
import {format} from 'date-fns';

export const AlbumDetail = () => {
    const route = useRoute();
    const id = (route.params as any).id;

    const albumState = useSelector((state: AppState) => state.albums);
    const dispatch = useDispatch();

    const album = albumState.albums.find(album => album.id === id)
        ?? (albumState.album?.id === id ? albumState.album : undefined);

    if (album === undefined) {
        if (albumState.singleId !== id || albumState.singleFetchState !== 'loading') {
            dispatch(getAlbum(id));
        }
        return <Text>Album not found</Text>;
    }

    const image = album.images.length > 0 ? album.images[0] : undefined;
    return <View style={styles.container}>
        <Text>{album.name}</Text>
        {image && <Image source={{uri: image.url}} style={styles.image}/>}
        <Text>Artists</Text>
        <FlatList data={album.artists} renderItem={({item}) => <Text>{item.name}</Text>}/>
        <Text>Other information</Text>
        <Text>Released on {format(new Date(album.release_date), 'EEEE, MMMM Do yyyy')}</Text>
        <Text>{album.total_tracks} tracks</Text>
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 300,
        height: 300,
    }
});