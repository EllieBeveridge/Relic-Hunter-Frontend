import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
//import styles from '../stylesheets/QuestionStylesheet'
import { Button, Icon } from 'react-native-elements'

class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    return (
      <View style={styles.container}>
        <Image
          source={require('../images/logo.png')}
          style={styles.logoImage}
        />
        <View style={styles.buttonStyle}>
          {/* <Icon
            name="treasure-chest"
            type="material-community"
            color="#4E3948"
          /> */}
          <Button
            title="Let's Begin..."
            fontSize={20}
            buttonStyle={{
              backgroundColor: "#4E3948",
            }}
            icon={{
              name: "treasure-chest",
              type: "material-community"
            }}
            onPress={() =>
              this.props.navigation.navigate('LandingPage')
            }
          />
          {/* <Icon
            name="sword"
            type="material-community"
            color="#4E3948"
          /> */}
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBD158',
    margin: 10,
    overflow: 'hidden',
    alignItems: 'center',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonStyle: {
    alignItems: 'center',
    // position: 'absolute',
    // bottom: 30,
    //marginBottom: 50
  },
  logoImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10
  }
});

export default componentName;
