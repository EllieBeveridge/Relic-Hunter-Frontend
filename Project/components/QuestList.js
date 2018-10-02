import React, { Component } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import QuestDetails from './QuestDetails'
import questList from '../mock-data/quest'

class QuestList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quests: questList
    };
  }

  render() {
    return (
      <View>
        <Text> This is a list of all the quests</Text>
        <FlatList
          data={[
            { key: 'hello' },
            { key: 'goodbye' },
          ]}
          renderItem={({ item }) => <Text>{item.key}</Text>}
        />
        <QuestDetails navigation={this.props.navigation} />
      </View>
    );
  }
}

export default QuestList;
