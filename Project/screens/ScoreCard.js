import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { StyleSheet, Image, Animated } from 'react-native';
import { Button } from 'react-native-elements';
import generalStyle from '../stylesheets/generalStyle'

import FadeInView from '../components/FadeInView';
// import FadeSpinView from '../components/FadeSpinView';

class ScoreCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
    };
  }

  static navigationOptions = { title: 'Relic Hunter', header: null };

  render() {

    const { navigation } = this.props
    const currQ = navigation.getParam('currQ')
    const score = navigation.getParam('score')

    let { fadeAnim } = this.state;

    return (
      <View style={styles.container}>
        <View>
          <Text style={generalStyle.titleMode}>Relic Hunter</Text>
        </View>

        <View style={styles.welcomeContainer}>
          <FadeInView style={{ width: 100, height: 80, backgroundColor: '#fff' }}>
            <Image
              source={require('../assets/images/robot-dev.png')}
              style={styles.welcomeImage}
            />
          </FadeInView>
        </View>

        <View style={styles.welcomeContainer}>
          <FadeInView style={{ backgroundColor: '#fff' }}>
            <Text style={styles.scoreMode}> Congratulations </Text>
            {(score === 0 || score > 1) && <Text style={styles.scoreMode}> You scored {score} POINTS !! </Text>}
            {score === 1 && <Text style={styles.scoreMode}> You scored {score} POINT !! </Text>}
          </FadeInView>
          <Text style={styles.mainText}> Thank you for playing at {} </Text>
          {currQ === 1 && <Text style={styles.mainText}> You played for {currQ} round</Text>}
          {currQ > 1 && <Text style={styles.mainText}> You played for {currQ} rounds</Text>}
        </View>

        <View>
          <Text style={generalStyle.titleMode}>Game Complete</Text>
        </View>

        <View style={styles.welcomeContainer}>
          <Button
            buttonStyle={generalStyle.buttonStyle}
            title="Next"
            onPress={() =>
              this.props.navigation.navigate('Logo')
            }
          />
        </View>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FED158',
    margin: 10,
    overflow: 'hidden'
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  scoreMode: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold',
    padding: 15,
    color: 'purple',
    fontWeight: 'bold',
  },
  mainText: {
    fontSize: 17,
    color: 'purple',
    lineHeight: 24,
    textAlign: 'center',
  },
});

export default ScoreCard;
