import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, FlatList, ScrollView } from 'react-native';
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
    api.fetchAllQuests()
      .then(quests => {
        this.setState({
          quests
        })
      })
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <ScrollView>
          {this.state.quests.map((quest, index) => (
            <Panel quest_id={quest.id} navigation={this.props.navigation} icon_url={quest.icon_url} title={quest.title}
              key={index} description={quest.intro_text} >
            </Panel>
          ))}
        </ScrollView>
      </View>
    );
  }
}


export default LandingPage;
