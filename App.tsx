import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Provider} from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import {store} from "./src/Store/store";
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import {ListOfAlbums} from "./src/Component/ListOfAlbums";
import {AlbumDetail} from "./src/Component/AlbumDetail";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
          <Stack.Navigator initialRouteName='ListOfAlbums'>
              <Stack.Screen name='ListOfAlbums' component={ListOfAlbums} />
              <Stack.Screen name='AlbumDetail' component={AlbumDetail} />
          </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
