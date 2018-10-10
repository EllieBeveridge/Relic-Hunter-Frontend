import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Question from '../screens/Question'
import * as Animatable from 'react-native-animatable';
import * as api from '../api'
import { Button } from 'react-native-elements';
import { addPicture } from '../api';

class GoodAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    if (this.props.TestPics) {
      return (
        <View style={styles.container}>
          <Animatable.View
            duration={1000}
            delay={1000}
            style={styles.content}
            transition="backgroundColor">
            <Animatable.Text animation={'bounceIn'}>
              <Text style={styles.title}>
                Test OK!  </Text>
            </Animatable.Text >
          </Animatable.View>
          <Button
            style={styles.buttonImage}
            backgroundColor="#4E3948"
            title="Publish Quest"
            onPress={() => this.publishQuest()
            }
          />
          <Button
            style={styles.buttonImage}
            backgroundColor="#4E3948"
            title="Create Another Question"
            onPress={() => this.props.navigation.navigate('CreateQuestion')
            }
          />
        </View>
      )
    }
    if (this.props.Question) {
      return (

        <View style={styles.container}>
          {console.log(this.props.score, 'this is the score in goodanswer')}

          <Animatable.View
            duration={1000}
            delay={1000}
            style={styles.content}
            transition="backgroundColor">
            <Animatable.Text animation={'bounceIn'}>
              <Text style={styles.title}>
                GoodAnswer!  </Text>
            </Animatable.Text >
          </Animatable.View>
          <Text style={styles.scoreMode}>
            Go to the next question... </Text>
          <Text> You are now on {this.props.score} points </Text>

          <Button
            style={styles.buttonImage}
            backgroundColor="#4E3948"
            title="NEXT"
            onPress={() => this.done()
            }
          />
        </View >
      );
    }
  }

  done = () => {
    if (this.props.currQ === this.props.questions.length - 1) {
      this.props.navigation.navigate('ScoreCard', {
        currQ: this.props.currQ,
        score: this.props.score
      })
    } else {
      this.props.updateAnswers(this.props.score, null)
      this.props.updateCurrQ()
    }
  }

  publishQuest = () => {
    const quest_id = this.props.quest_id
    const publish = true
    api.publishQuest(quest_id, publish)
      .then(res => {
        Alert.alert('Your quest has been published!')
        this.props.navigation.navigate('Logo')
      })
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FED158',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scoreMode: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 15,
    color: 'purple',
    fontWeight: 'bold',
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
    color: 'purple',
  },
  buttonImage: {
    width: 30,
    height: 25,
    alignItems: 'center',
    color: 'white',
    backgroundColor: "purple"
  },
})

export default GoodAnswer;
