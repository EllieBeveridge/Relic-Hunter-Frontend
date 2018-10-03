import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import Question from './screens/Question'

class Correct extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> Correct! Go to the next question... </Text>
        <Button
          title="Next Q"
          onPress={() =>
            <Question />
          }
        />
      </View>
    );
  }
}

export default Correct;
