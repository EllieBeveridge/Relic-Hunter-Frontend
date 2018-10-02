import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import QuestDetails from './QuestDetails'

class QuestList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      string: 'hi'
    };
  }

  render() {
    return (
      <View>
        <Text> This is a list of all the quests</Text>
        <QuestDetails navigation={this.props.navigation} />
      </View>
    );
  }
}

export default QuestList;
