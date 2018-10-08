import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import Expo from 'expo'


export default class App extends React.Component {


  render() {
    return (
      <AppNavigator />
    )
  }
}

