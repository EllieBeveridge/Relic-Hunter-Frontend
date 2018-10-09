import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { StyleSheet, Button, Image, Animated } from 'react-native';

import FadeInView from '../components/FadeInView';
// import FadeSpinView from '../components/FadeSpinView';

class ScoreCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
    };
  }

  render() {

    const { navigation } = this.props
    const currQ = navigation.getParam('currQ')
    const score = navigation.getParam('score')

    let { fadeAnim } = this.state;

    return (
      <View style={styles.container}>

        <View>
          <Text style={styles.titleMode}>Relic Hunters</Text>
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
          <Text style={styles.titleMode}>Game Complete</Text>
        </View>

        <View style={styles.welcomeContainer}>
          <Button
            title="NEXT"
            onPress={() =>
              this.props.navigation.navigate('LandingPage')
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
    backgroundColor: '#fff',
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
  titleMode: {
    textAlign: 'center',
    fontSize: 28,
    color: '#333',
    fontWeight: 'bold',
    padding: 5,
  },
  scoreMode: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold',
    padding: 15,
    color: 'green',
    fontWeight: 'bold',
  },
  mainText: {
    fontSize: 17,
    color: '#333',
    lineHeight: 24,
    textAlign: 'center',
  },
});

export default ScoreCard;
