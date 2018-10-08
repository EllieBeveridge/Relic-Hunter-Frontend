import React, { Component } from 'react';
import { View, Text, Button, Alert } from 'react-native';

class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Button
          title="Get a Hint"
          onPress={() => {
            Alert.alert(this.props.hint_text)
          }
          }
        />
        <Button
          title="Skip this question"
          onPress={() => this.skip()}
        />
        <Button
          title="Finish this quest"
          onPress={() =>
            this.props.navigation.navigate('ScoreCard', {
              currQ: rounds,
              score: this.props.score
            })
          }
        />
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

export default componentName;
