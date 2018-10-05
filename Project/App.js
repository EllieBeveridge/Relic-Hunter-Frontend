import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import Expo from 'expo'


export default class App extends React.Component {

  static navigationOptions = { title: 'Welcome', header: { visible: false } };

  render() {
    return (
      <AppNavigator />
    )
  }
}

