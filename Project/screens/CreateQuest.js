import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import * as api from '../api'

class CreateQuest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      intro_text: null,
      full_text: null,
      icon_url: null,
      background_url: null,
      suitability: null,
      venue_area: null
    };
  }

  submitForm = () => {
    const { navigation } = this.props
    const venue_id = navigation.getParam('venue_id')
    console.log(this.state)
    api.postNewQuest(venue_id, this.state)
      .then(data => {
        Alert.alert("Quest submitted")
        this.props.navigation.navigate('SubmitQuestion', {
          data
        })
      })
  }

  render() {
    return (

      <View>
        <ScrollView>
          <FormLabel>Title of Quest</FormLabel>
          <FormInput
            value={this.state.title}
            onChangeText={(title) => this.setState({ title })} />
          <FormValidationMessage>Error message</FormValidationMessage>
          <FormLabel>Short Summary of Quest</FormLabel>
          <FormInput onChangeText={(intro_text) => this.setState({ intro_text })} />
          <FormValidationMessage>Error message</FormValidationMessage>
          <FormLabel>Full Summary of Quest (include suitability, theme and difficulty</FormLabel>
          <FormInput onChangeText={(full_text) => this.setState({ full_text })} />
          <FormValidationMessage>Error message</FormValidationMessage>
          <FormLabel>Icon URL</FormLabel>
          <FormInput
            onChangeText={(icon_url) => this.setState({ icon_url })}
            placeholder='Leave blank if not using'
          />
          <FormLabel>Background URL</FormLabel>
          <FormInput
            onChangeText={(background_url) => this.setState({ background_url })}
            placeholder='Leave blank if not using'
          />
          <FormLabel>Age suitability</FormLabel>
          <FormInput onChangeText={(suitability) => this.setState({ suitability })} />
          <FormValidationMessage>Error message</FormValidationMessage>
          <FormLabel>Area within Venue</FormLabel>
          <FormInput onChangeText={(venue_area) => this.setState({ venue_area })} />
          <FormValidationMessage>Error message</FormValidationMessage>
          <Button
            title="Submit"
            onPress={() => this.submitForm()} />
        </ScrollView>
      </View>
    );

  }
}

export default CreateQuest;
