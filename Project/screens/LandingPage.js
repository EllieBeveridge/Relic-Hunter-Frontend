import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Panel from '../components/Panel'
import { Constants } from 'expo'
import * as api from '../api'

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quests: []
    };
  }

  componentDidMount = () => {
    const { navigation } = this.props
    const venue_id = navigation.getParam('venue_id')
    api.fetchAllQuests(venue_id)
      .then(quests => {
        this.setState({
          quests
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
    color: '#583E5C',
    fontWeight: 'bold',
    padding: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#FED158',
  },
});

export default LandingPage;