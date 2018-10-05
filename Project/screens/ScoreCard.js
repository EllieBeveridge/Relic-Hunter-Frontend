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
      // spinAnim: new Animated.Value(0)
    };
  }

  render() {
    const player =
    {
      "location": "MOSE",
      "quest-id": 1,
      "score": 5,
      "answers": [
        "true",
        "true",
        "skip",
        "true",
        "true",
        "skip",
        "true"
      ],
      "timings": [
        100,
        600,
        300,
        400,
        312,
        90,
        145
      ]
    };

    const rounds = player.answers.length;
    // let { spinAnim } = this.state;
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
            <Text style={styles.scoreMode}> You scored {player.score} POINTS !! </Text>
          </FadeInView>
          <Text style={styles.mainText}> Thank you for playing at {player.location} </Text>
          <Text style={styles.mainText}> You played for {rounds} rounds</Text>
        </View>

        <View>
          <Text style={styles.titleMode}>Game Complete</Text>
        </View>

        <View style={styles.welcomeContainer}>
          <Button
            title="Back to Homepage"
            onPress={() =>
              this.props.navigation.navigate('Home')
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
