import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableHighlight, Animated } from 'react-native';
import * as api from '../api'

class Panel extends Component {
  constructor(props) {
    super(props);
    this.icons = {
      'up': require('../images/index.png'),
      'down': require('../images/arrowdown.png')
    };

    this.state = {
      expanded: false,
      animation: new Animated.Value(),
      height: 95,
    };
  }

  toggle() {
    let initialValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight;
    let finalValue = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight;
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
      maxHeight: 180 //event.nativeEvent.layout.height
    });
  }

  _setMinHeight(event) {
    this.setState({
      minHeight: 95
    });
  }

  goToQuestions = (quest_id) => {
    api.fetchQuestById(quest_id)
      .then(questions => {
        this.props.navigation.navigate('Question', {
          questions
        })
        console.log('questions', questions)
      })
  }

  render() {
    const { expanded, animation } = this.state
    let icon = this.icons['down']
    if (expanded) {
      icon = this.icons['up']
    }
    return (
      <Animated.View style={[styles.container, { height: animation }]}>
        <View style={styles.container} >
          <View style={styles.titleContainer}
            onLayout={this._setMinHeight.bind(this)}>
            <Text style={styles.title}>{this.props.title}</Text>

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
            <Button
              title={"Go to Quest" + this.props.quest_id}
              onPress={() => {
                this.goToQuestions(this.props.quest_id)
              }} />
          </View>

          <View>
            <Text style={styles.myDescription}>{this.props.full}</Text>
            <Text style={styles.myDescription}>Quest Area: {this.props.venue_area}</Text>
            {this.props.icon_url && <Image
              source={{ uri: this.props.icon_url }}
              style={styles.welcomeImage}
            />
            }
            <Text style={styles.myDescription}>Suitability: {this.props.suitability}</Text>
          </View>

        </View>
      </Animated.View>
      <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
        <Button
          title={"Go to Quest" + this.props.quest_id}
          onPress={() => {
            this.goToQuestions(this.props.quest_id)
          }} />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 10,
    overflow: 'hidden',
  },
  titleContainer: {
    flexDirection: 'row' // column is default
  },
  title: {
    flex: 1,
    padding: 10,
    color: '#2a2f43',
    fontWeight: 'bold',
  },
  titleMode: {
    textAlign: 'center',
    fontSize: 28,
    color: '#333',
    fontWeight: 'bold',
    padding: 5,
  },
  myDescription: {
    padding: 5,
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
