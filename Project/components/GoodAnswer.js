import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Question from '../screens/Question'
import * as Animatable from 'react-native-animatable';
import { Button } from 'react-native-elements';
import generalStyle from '../stylesheets/generalStyle'

class GoodAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { score } = this.props;
    const pointWord = (score === 1) ? 'point' : 'points';
    return (
      <View style={generalStyle.topView}>
        <View>
          <Text style={generalStyle.titleMode}>Relic Hunter</Text>
        </View>

        <Animatable.View
          duration={1000}
          delay={1000}
          style={styles.contentAnimated}
          transition="backgroundColor">
          <Animatable.Text animation={'bounceIn'}>
            <Text style={styles.title}>
              GoodAnswer!  </Text>
          </Animatable.Text >
        </Animatable.View>
        <Text style={styles.scoreMode}>
          Go to the next question... </Text>

        <Text style={styles.scoreMode}> You are now on {score} {pointWord} </Text>

        <View style={styles.container}>
          <Button
            buttonStyle={generalStyle.buttonStyle}
            title="Next"
            onPress={() => this.done()
            }
          />
        </View >
      </View >
    );
  }

  done = () => {
    if (this.props.currQ === this.props.questions.length - 1) {
      const finalRound = this.props.currQ + 1;
      this.props.navigation.navigate('ScoreCard', {
        currQ: finalRound,
        score: this.props.score
      })
    } else {
      this.props.updateAnswers(this.props.score, null)
      this.props.updateCurrQ()
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FED158',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scoreMode: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 15,
    color: 'purple',
    fontWeight: 'bold',
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
    color: 'purple',
  },
  contentAnimated: {
    padding: 40,
    backgroundColor: '#FED158',
    alignItems: 'center',
  },

})

export default GoodAnswer;
