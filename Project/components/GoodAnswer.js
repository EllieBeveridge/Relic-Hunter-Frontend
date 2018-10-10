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
    return (

      <View style={styles.container}>
        {console.log(this.props.score, 'this is the score in goodanswer')}
        <Text style={generalStyle.titleMode}>Relic Hunter</Text>
        <Animatable.View
          duration={1000}
          delay={1000}
          style={styles.content}
          transition="backgroundColor">
          <Animatable.Text animation={'bounceIn'}>
            <Text style={styles.title}>
              GoodAnswer!  </Text>
          </Animatable.Text >
        </Animatable.View>
        <Text style={styles.scoreMode}>
          Go to the next question... </Text>
        <Text> You are now on {this.props.score} points </Text>

        <Button
          buttonStyle={generalStyle.buttonStyle}
          title="Next"
          onPress={() => this.done()
          }
        />
      </View >
    );
  }

  done = () => {
    if (this.props.currQ === this.props.questions.length - 1) {
      this.props.navigation.navigate('ScoreCard', {
        currQ: this.props.currQ,
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
})

export default GoodAnswer;
