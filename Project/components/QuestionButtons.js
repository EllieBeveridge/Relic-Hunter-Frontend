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
            Alert.alert(this.props.hintText)
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
            this.props.navigation.navigate('ScoreCard')
          }
        />
      </View>
    );
  }

  skip = () => {
    if (this.props.currQ === this.props.questions.length - 1) {
      this.props.navigation.navigate('ScoreCard')
    } else {
      this.props.updateCurrQ()
    }
  }

}

export default componentName;
