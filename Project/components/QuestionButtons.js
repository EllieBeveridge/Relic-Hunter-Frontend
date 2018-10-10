import React, { Component } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
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
            title="Get a Hint"
            icon={{ name: 'question-circle', type: 'font-awesome' }}
            backgroundColor="#4E3948"
            fontSize={16}
            onPress={() => {
              Alert.alert(this.props.hint_text)
            }
            }
          />
        </View>
        <View style={styles.welcomeContainer}>
          <Button
            title="Skip this question"
            backgroundColor="#4E3948"
            fontSize={16}
            icon={{ name: 'fast-forward', type: 'font-awesome' }}
            onPress={() => this.skip()}
          />
        </View>
        <View style={styles.welcomeContainer}>
          <Button
            title="Finish this quest"
            backgroundColor="#4E3948"
            fontSize={16}

            buttonStyle={{
              backgroundColor: "rgba(92, 99,216, 1)",
              width: 300,
              height: 45,
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 5
            }}

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
  }
});

export default componentName;
