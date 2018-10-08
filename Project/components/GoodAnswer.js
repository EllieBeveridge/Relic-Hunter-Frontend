import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import Question from '../screens/Question'

class GoodAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> GoodAnswer! Go to the next question... </Text>
        <Text> You are now on {this.props.score} points </Text>
        <Button
          title="Next Q"
          onPress={() => this.done()
          }
        />
      </View>
    );
  }

  done = () => {
    if (this.props.currQ === this.props.questions.length - 1) {
      this.props.navigation.navigate('ScoreCard', {
        currQ: rounds,
        score: this.props.score
      })
    } else {
      this.props.updateAnswers(this.props.score, null)
      this.props.updateCurrQ()
    }
  }

}

export default GoodAnswer;
