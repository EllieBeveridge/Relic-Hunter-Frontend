import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, Alert } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import * as api from '../api'
import generalStyle from '../stylesheets/generalStyle';

class CreateQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Input question title here',
      text: 'Input question here',
      hint_text: 'Include a hint here',
      answer_text: 'Write your answer here'
    };
  }

  static navigationOptions = { title: 'Relic Hunter', header: null };

  submitForm = () => {
    const { navigation } = this.props
    const quest_id = navigation.getParam('id');
    api.postNewQuestion(quest_id, this.state)
      .then((question) => {
        Alert.alert("Question Added");
        this.props.navigation.navigate('AddPicture', { id: question.id, quest_id })
      })
      .catch(err => console.log(err));
  }

  render() {

    return (
      <View style={generalStyle.topView}>
        <ScrollView>
          <FormLabel labelStyle={{ color: '#583E5C' }}>Question Title</FormLabel>
          <FormInput
            inputStyle={{ color: '#583E5C' }}
            value={this.state.title}
            onChangeText={(title) => this.setState({ title })} />
          {(this.state.title.length < 3 && this.state.title !== '') && <FormValidationMessage>Must be at least 3 characters.</FormValidationMessage>}
          <FormLabel labelStyle={{ color: '#583E5C' }}>Question Text</FormLabel>
          <FormInput
            inputStyle={{ color: '#583E5C' }}
            value={this.state.text}
            onChangeText={(text) => this.setState({ text })} />
          {(this.state.text.length < 10 && this.state.text !== '') && <FormValidationMessage>Must be at least 10 characters.</FormValidationMessage>}
          <FormLabel labelStyle={{ color: '#583E5C' }}>Question Hint</FormLabel>
          <FormInput
            inputStyle={{ color: '#583E5C' }}
            value={this.state.hint_text}
            onChangeText={(hint_text) => this.setState({ hint_text })} />
          {(this.state.hint_text.length < 5 && this.state.hint_text !== '') && <FormValidationMessage>Must be at least 5 characters.</FormValidationMessage>}
          <FormLabel labelStyle={{ color: '#583E5C' }}>Question Answer</FormLabel>
          <FormInput
            inputStyle={{ color: '#583E5C' }}
            value={this.state.answer_text}
            onChangeText={(answer_text) => this.setState({ answer_text })} />
          {(this.state.answer_text.length < 5 && this.state.answer_text !== '') && <FormValidationMessage>Must be at least 5 characters.</FormValidationMessage>}

          <Button
            buttonStyle={generalStyle.buttonStyle}
            title="Submit"
            onPress={() => {
              this.submitForm()
            }
            } />
        </ScrollView>
      </View>
    );

  }
}

export default CreateQuestion;
