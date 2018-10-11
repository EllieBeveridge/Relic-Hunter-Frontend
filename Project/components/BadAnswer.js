import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Question from '../screens/Question'
import * as Animatable from 'react-native-animatable';
import { Button } from 'react-native-elements'
import generalStyle from '../stylesheets/generalStyle'

class BadAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={generalStyle.topView}>
        <View>
          <Text style={generalStyle.titleMode}>Relic Hunter</Text>
        </View>

        <Animatable.View
          duration={3000}
          delay={1000}
          style={styles.contentAnimated}
          transition="backgroundColor">
          <Animatable.Text animation={'bounceIn'}>
            <Text style={styles.title}>
              WHOOPS </Text>
          </Animatable.Text >
        </Animatable.View>

        <View style={styles.welcomeContainer}>
          <Text style={styles.scoreMode}>
            Not the right image, sorry
            </Text>
        </View>
        {this.props.Question
          ?
          <View style={styles.welcomeContainer}>
            <Button
              buttonStyle={generalStyle.buttonStyle}
              title="Try again"
              onPress={() => this.done()
              }
            />
          </View>
          :
          <View style={styles.welcomeContainer}>
            <Button
              buttonStyle={generalStyle.buttonStyle}
              title="Try again"
              onPress={() => this.fail()
              }
            />
          </View>
        }
      </View >
    );
  }

  done = () => {
    // set feedback to null
    this.props.updateAnswers(this.props.score, null)
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
    fontSize: 22,
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
  contentAnimated: {
    padding: 40,
    backgroundColor: '#FED158',
    alignItems: 'center',
  },

  welcomeContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },

})

export default BadAnswer;


