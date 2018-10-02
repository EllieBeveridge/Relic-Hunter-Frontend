import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import QuestionButtons from '../components/QuestionButtons'
import Camera from '../components/Camera'

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: null
    };
  }

  render() {
    return (
      <View>
        <Text> QUESTION: TELL ME HOW YOU FEEL ABOUT ME </Text>
        <Button
          title="Take a picture"
          onPress={() =>
            this.setState({
              pressed: true
            })
          }
        />
        {this.state.pressed && <Camera />}
        <QuestionButtons navigation={this.props.navigation} />
      </View>
    );
  }
}

export default Question;
