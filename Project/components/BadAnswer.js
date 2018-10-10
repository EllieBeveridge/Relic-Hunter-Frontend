import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Question from '../screens/Question'
import * as Animatable from 'react-native-animatable';
import { Button } from 'react-native-elements'

class BadAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Animatable.View
          duration={1000}
          delay={1000}
          style={styles.content}
          transition="backgroundColor">
          <Animatable.Text animation={'bounceIn'}>
            <Text style={styles.title}>
              WHOOPS </Text>
          </Animatable.Text >
        </Animatable.View>
        <Text style={styles.scoreMode}>
          Image not recognised, sorry </Text>
        {this.props.Question
          ? <Button
            style={styles.buttonImage}
            backgroundColor="#4E3948"
            title="TRY AGAIN"
            onPress={() => this.done()}
          />
          : <Button
            style={styles.buttonImage}
            backgroundColor="#4E3948"
            title="TRY AGAIN"
            onPress={() => this.fail()}
          />

        }

      </View >
    );
  }



  done = () => {
    // set feedback to null
    this.props.updateAnswers(this.props.answers, null)
  }

  fail = () => {
    this.props.updateAnswers(null, null);
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

export default BadAnswer;


