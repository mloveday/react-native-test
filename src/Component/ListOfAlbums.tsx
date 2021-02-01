import React from "react";
import {FlatList, StyleSheet, Text, TextInput, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {AppState} from "../Store/store";
import {useSelector} from "react-redux";
import {SearchBar} from "./SearchBar";
import {AlbumInList} from "./AlbumInList";
import {StackNavigationProp} from "@react-navigation/stack";

export const ListOfAlbums: React.FC = () => {
    const albumState = useSelector((state: AppState) => state.albums);
    return <View style={styles.container}>
        <View style={styles.search}><SearchBar/></View>
        <View style={styles.content}>
            <FlatList style={styles.listItem} data={albumState.albums} renderItem={({item}) => <AlbumInList album={item}/>}/>
        </View>
        <StatusBar style="auto" />
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    search: {
        flex: 0,
        width: '100%',
    },
    content: {
        flex: 1,
        width: '100%',
    },
    listItem: {
        padding: 10,
        fontSize: 16,
        height: 100,
        width: '100%',
    },
});