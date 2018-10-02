import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import QuestList from '../components/QuestList'

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hi, this is the landing page. Touch something to start</Text>
        <QuestList navigation={this.props.navigation} />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LandingPage;
