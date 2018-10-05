import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, FlatList, ScrollView } from 'react-native';
import Panel from '../components/Panel'
import questList from '../mock-data/quest'

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quests: questList
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <ScrollView>
          {this.state.quests.map((quest, index) => (
            <Panel navigation={this.props.navigation} title={quest.title} key={index} description={quest.description}>
              <Text>{quest.description}</Text>
            </Panel>
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default LandingPage;
