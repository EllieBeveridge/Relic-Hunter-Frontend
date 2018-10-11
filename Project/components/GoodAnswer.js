import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import * as api from '../api'
import { Button } from 'react-native-elements';
import generalStyle from '../stylesheets/generalStyle'

class GoodAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    const { score } = this.props;
    const pointWord = (score === 1) ? 'point' : 'points';
    if (this.props.TestPics) {
      return (
        <View style={generalStyle.topView}>

          <View>
            <Text style={generalStyle.titleMode}>Relic Hunter</Text>
          </View>

          <Animatable.View
            duration={1000}
            delay={1000}
            style={styles.contentAnimated}
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

        <View style={generalStyle.topView}>
          {console.log(this.props.score, 'this is the score in goodanswer')}

          <View>
            <Text style={generalStyle.titleMode}>Relic Hunter</Text>
          </View>

          <Animatable.View
            duration={1000}
            delay={1000}
            style={styles.contentAnimated}
            transition="backgroundColor">
            <Animatable.Text animation={'bounceIn'}>
              <Text style={styles.title}>
                GoodAnswer!  </Text>
            </Animatable.Text >
          </Animatable.View>
          <Text style={styles.scoreMode}>
            Go to the next question... </Text>
          <Text style={styles.scoreMode}> You are now on {score} {pointWord} </Text>

          <Button
            buttonStyle={generalStyle.buttonStyle}
            title="NEXT"
            onPress={() => this.done()
            }
          ></Button>
        </View >
      );
    }
  }

  done = () => {
    if (this.props.currQ === this.props.questions.length - 1) {
      const finalRound = this.props.currQ + 1;
      this.props.navigation.navigate('ScoreCard', {
        currQ: finalRound,
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
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
    color: 'purple',
    fontWeight: 'bold',
  },
  contentAnimated: {
    padding: 40,
    backgroundColor: '#FED158',
    alignItems: 'center',
  },

})

export default GoodAnswer;
