import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
//import styles from '../stylesheets/QuestionStylesheet'

class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    return (
      <View style={{ backgroundColor: "#FBD158" }}>
        <Image
          source={require('../images/logo.png')}
          style={styles.logoImage}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    justifyContent: 'center'
  }
});

export default componentName;
