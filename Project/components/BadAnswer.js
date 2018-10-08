import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import Question from '../screens/Question'

class BadAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> WHOOPS - Not the right Image - try again or try a HINT </Text>
        <Button
          title="NEXT"
          onPress={() => this.done()
          }
        />
      </View>
    );
  }

  done = () => {
    // set feedback to null
    this.props.updateAnswers(this.props.answers, null)
  }

}

export default BadAnswer;


