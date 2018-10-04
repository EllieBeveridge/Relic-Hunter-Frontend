import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, FlatList, ScrollView } from 'react-native';
import Panel from '../components/QuestList'
import questList from '../mock-data/quest'
//import { List, ListItem } from 'react-native-elements'

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quests: questList
    };
  }

  render() {
    return (
      <View>
        <ScrollView>
          {this.state.quests.map((quest, index) => (
            <Panel navigation={this.props.navigation} title={quest.title}
              key={index} description={quest.description}>
              <Text>{quest.description}</Text>
            </Panel>
          ))}
        </ScrollView>
      </View>
      // <View style={{ flex: 1 }}>
      //   <Text>Hi, this is the landing page. Touch something to start</Text>
      //   <List>
      //     {
      //       this.state.quests.map((quest, index) => (
      //         < ListItem
      //           key={index}
      //           title={quest.title}
      //           subtitle={`${quest.description}\n${quest.suitability}`}
      //           onPress={() => {
      //             this.props.navigation.navigate('Question')
      //           }}
      //         />
      //       ))
      //     }
      //   </List>
      //   {/* <QuestList navigation={this.props.navigation} /> */}
      // </View>
    );
  }
}


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: '100%',
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

export default LandingPage;
