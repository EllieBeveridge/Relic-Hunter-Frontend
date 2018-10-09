import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Panel from '../components/Panel'
import { Constants } from 'expo'
import * as api from '../api'
import * as questList from '../mock-data/quest'

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quests: []
    };
  }

  componentDidMount = () => {
    const venue = 1;
    api.fetchAllQuests(venue)
      .then(quests => {
        this.setState({
          // quests
          // temp use of mockdata as only 1 quest on API currently
          quests: questList.quests
        })
      })
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView  >
          <Text style={styles.titleMode}>Relic Hunter</Text>
          <Panel quests={this.state.quests} navigation={this.props.navigation}></Panel>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleMode: {
    textAlign: 'center',
    fontSize: 28,
    color: '#333',
    fontWeight: 'bold',
    padding: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#FED158',
  },
});

export default LandingPage;