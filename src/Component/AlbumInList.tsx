import React from "react";
import {Album} from "../Model/Album";
import {Button, View, Image, Text, StyleSheet} from "react-native";
import {useNavigation} from '@react-navigation/native';

export const AlbumInList: React.FC<{ album: Album }> = props => {
    const navigation = useNavigation();
    const image = props.album.images.length > 0 ? props.album.images[props.album.images.length - 1] : undefined;
    return <View style={styles.container}>
        <View style={styles.albumContainer}>
            {image !== undefined && <Image style={styles.image} source={{uri: image.url}}/>}
            <Text>{props.album.name}</Text>
            <Text>{props.album.artists.map(artist => artist.name).join(', ')}</Text>
        </View>
        <Button title={'View'} onPress={() => navigation.navigate('AlbumDetail', {id: props.album.id})}/>
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
    },
    albumContainer: {
        flex: 1,
    },
    image: {
        width: 64,
        height: 64,
    },
});