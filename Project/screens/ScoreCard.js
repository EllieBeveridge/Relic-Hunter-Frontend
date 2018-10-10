import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { StyleSheet, Image, Animated } from 'react-native';
import { Button } from 'react-native-elements';
import generalStyle from '../stylesheets/generalStyle'

import FadeInView from '../components/FadeInView';

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
    const firstWord = (score === 1) ? 'Well done' : 'Fantastic';
    const pointWord = (score === 1) ? 'point' : 'points';
    let { fadeAnim } = this.state;

    return (
      <View style={styles.container}>

        <View style={styles.welcomeContainer}>
          <FadeInView style={{ width: 200, height: 200, backgroundColor: '#FED158' }}>
            <Image
              source={require('../images/logo.png')}
              style={styles.welcomeImage}
            />
          </FadeInView>
        </View>

        <View style={styles.welcomeContainer}>
          <FadeInView style={{ backgroundColor: '#FED158' }}>


            {score === 0 && <View>
              <Text style={styles.scoreMode}> Come back and play again soon </Text>
            </View>
            }

            {score > 0 && <View>
              <Text style={styles.scoreMode}> {firstWord} </Text>
              <Text style={styles.scoreMode}> You scored {score} {pointWord}</Text>
            </View>
            }

          </FadeInView>
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
    width: 200,
    height: 200,
    resizeMode: 'contain',
    // marginTop: 3,
    // marginLeft: -10,
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
    marginTop: 10,
    marginBottom: 20,
  },
});

export default ScoreCard;
