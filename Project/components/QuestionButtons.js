import React, { Component } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import buttonStyles from '../stylesheets/buttonStyles'
import { Button } from 'react-native-elements';

class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const rounds = this.props.currQ + 1;
    return (
      <View>
        <View style={styles.welcomeContainer}>
          <Button
            buttonStyle={buttonStyles.buttonStyle}
            title="Get a Hint"
            icon={{ name: 'question-circle', type: 'font-awesome' }}
            onPress={() => {
              Alert.alert(this.props.hint_text)
            }
            }
          />
        </View>
        <View style={styles.welcomeContainer}>
          <Button
            buttonStyle={buttonStyles.buttonStyle}
            title="Skip this question"
            icon={{ name: 'fast-forward', type: 'font-awesome' }}
            onPress={() => this.skip()}
          />
        </View>
        <View style={styles.welcomeContainer}>
          <Button
            buttonStyle={buttonStyles.buttonStyle}
            title="Finish this quest"
            icon={{ name: 'times-circle', type: 'font-awesome' }}
            onPress={() =>
              this.props.navigation.navigate('ScoreCard', {
                currQ: rounds,
                score: this.props.score
              })
            }
          />
        </View>
      </View>
    );
  }

  skip = () => {
    if (this.props.currQ === this.props.questions.length - 1) {
      rounds = this.props.currQ + 1;
      this.props.navigation.navigate('ScoreCard', {
        currQ: rounds,
        score: this.props.score
      })
    } else {
      this.props.updateCurrQ()
    }
  }

}

const styles = StyleSheet.create({
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
})

export default componentName;
