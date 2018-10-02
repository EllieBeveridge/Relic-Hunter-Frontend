import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import Question from '../screens/Question'

class QuestDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> Hi this is the details of each quest.  </Text>
        <Button
          title="Go to this quest"
          onPress={() =>
            this.props.navigation.navigate('Question')
          }
        />
      </View>
    );
  }
}

export default QuestDetails;
