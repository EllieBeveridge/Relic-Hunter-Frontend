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
        <Text> You are now on {this.props.answers} points </Text>
        <Button
          title="Next Q"
          onPress={() => this.done()
          }
        />
      </View>
    );
  }

  done = () => {
    // set feedback to null
    this.props.updateAnswers(this.props.answers, null)
    this.props.updateCurrQ()
  }

}

export default GoodAnswer;
