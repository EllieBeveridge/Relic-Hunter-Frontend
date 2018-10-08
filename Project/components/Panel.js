import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableHighlight, Animated } from 'react-native'; //Step 1

class Panel extends Component {
  constructor(props) {
    super(props);

    this.icons = {
      'up': require('../images/index.png'),
      'down': require('../images/arrowdown.png')
    };

    this.state = {
      title: props.title,
      description: props.description,
      expanded: true,
      animation: new Animated.Value()
    };
  }

  toggle() {
    let initialValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
      finalValue = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

    this.setState({
      expanded: !this.state.expanded
    });

    this.state.animation.setValue(initialValue);
    Animated.spring(
      this.state.animation,
      {
        toValue: finalValue
      }
    ).start();
  }

  _setMaxHeight(event) {
    this.setState({
      maxHeight: event.nativeEvent.layout.height
    });
  }

  _setMinHeight(event) {
    this.setState({
      minHeight: 80
    });
  }


  render() {
    let icon = this.icons['down']

    if (this.state.expanded) {
      icon = this.icons['up']
    }
    return (
      <Animated.View style={[styles.container, { height: this.state.animation }]}>
        <View style={styles.container} >
          <View style={styles.titleContainer} onLayout={this._setMinHeight.bind(this)}>
            <Text style={styles.title}>{this.state.title}</Text>
            <TouchableHighlight
              style={styles.button}
              onPress={this.toggle.bind(this)}
              underlayColor="#f1f1f1">
              <Image
                style={styles.buttonImage}
                source={icon}
              ></Image>
            </TouchableHighlight>
          </View>

          <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
            <Text>{this.state.description}</Text>
            <Button
              title="Go to Quest"
              onPress={() => {
                this.props.navigation.navigate('Question')
              }} />

          </View>

        </View>
      </Animated.View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 10,
    overflow: 'hidden'
  },
  titleContainer: {
    flexDirection: 'row'
  },
  title: {
    flex: 1,
    padding: 10,
    color: '#2a2f43',
    fontWeight: 'bold'
  },
  button: {

  },
  buttonImage: {
    width: 30,
    height: 25
  },
  body: {
    padding: 10,
    paddingTop: 0
  }
});

export default Panel;

// import React, { Component } from 'react';
// import { View, Text, FlatList } from 'react-native';
// import QuestDetails from './QuestDetails'
// import questList from '../mock-data/quest'
// import { List, ListItem } from 'react-native-elements'

// class QuestList extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       quests: questList
//     };
//   }

//   render() {

//     return (
//       <View>
//         <Text> This is a list of all the quests</Text>
//         <FlatList
//           data={this.state.quests}
//           renderItem={({ item }) => (
//             < ListItem
//               key={item.id}
//               title={item.title}
//               subtitle={`${item.description}\n${item.suitability}`}
//               onPress={() => {
//                 this.props.navigation.navigate('Question')
//               }
//               }
//             />
//           )}
//           keyExtractor={(item, index) => item.id}
//         />
//         {/* <QuestDetails navigation={this.props.navigation} /> */}
//       </View>
//     );

//   }
// }

// export default QuestList;
