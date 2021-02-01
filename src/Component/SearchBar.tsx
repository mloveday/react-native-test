import React from "react";
import {AppState} from "../Store/store";
import {useDispatch, useSelector} from "react-redux";
import {StyleSheet, TextInput} from "react-native";
import debounce from 'lodash/debounce';
import {AlbumState, clearAlbums, searchAlbums} from "../Store/AlbumState";

const requestSearch = debounce((value: string, state: AlbumState, dispatch) => {
    if (value === '') {
        dispatch(clearAlbums());
        return;
    }
    if (state.abortController !== undefined) {
        state.abortController.abort();
    }
    dispatch(searchAlbums(value));
}, 250);

export const SearchBar: React.FC = () => {
    const dispatch = useDispatch();
    const albumState = useSelector((state: AppState) => state.albums);
    const [searchTerm, setSearchTerm] = React.useState<string>();

    const onSearchChange = (value: string) => {
        requestSearch(value, albumState, dispatch);
        setSearchTerm(value);
    };

    return <TextInput style={styles.input} value={searchTerm} onChangeText={onSearchChange} />;
}

const styles = StyleSheet.create({
    input: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'grey',
        padding: 10,
        width: '100%',
    },
});