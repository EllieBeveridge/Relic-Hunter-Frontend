import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import generalStyle from '../stylesheets/generalStyle'
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

  static navigationOptions = { title: 'Relic Hunter', header: null };

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
    const { navigation } = this.props;
    const venue_id = navigation.getParam('venue_id')
    return (
      <View style={styles.container}>
        <ScrollView  >
          <Text style={generalStyle.titleMode}>Relic Hunter</Text>
          <Panel quests={this.state.quests} navigation={this.props.navigation}></Panel>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // listHead: {
  //   textAlign: 'center',
  //   fontSize: 22,
  //   color: '#583E5C',
  //   fontWeight: 'bold',
  //   margin: 10,
  //   color: '#333',
  // },
  container: {
    flex: 1,
    backgroundColor: '#FED158',
  },
});

export default LandingPage;