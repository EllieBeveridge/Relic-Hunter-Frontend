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
            Alert.alert('Here is a lovely hint!')
          }
          }
        />
        <Button
          title="Skip this question"
          onPress={() =>
            Alert.alert('At some point there will be a skip function')
          }
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
}

export default componentName;
