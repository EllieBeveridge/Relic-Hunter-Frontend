import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import Question from './screens/Question'

class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> That didn't look right, please try again...</Text>
        <Button
          title="Go Back"
          onPress={() =>
            <Question />
          }
        />
      </View>
    );
  }
}

export default componentName;
