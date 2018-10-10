import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, Alert } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import * as api from '../api'

class CreateQuest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'test',
      intro_text: 'test',
      full_text: 'test',
      icon_url: null,
      background_url: null,
      suitability: 'test',
      venue_area: 'test'
    };
  }

  submitForm = () => {
    const { navigation } = this.props
    const venue_id = navigation.getParam('venue_id');
    console.log(venue_id);
    console.log(this.state)
    const { title, intro_text, full_text, suitability, venue_area } = this.state;
    const quest = { title, intro_text, full_text, suitability, venue_area };
    if (this.state.icon_url) quest.icon_url = this.state.icon_url;
    if (this.state.background_url) quest.background_url = this.state.background_url;
    api.postNewQuest(venue_id, quest)
      .then(data => {
        Alert.alert("Quest created");
      })
      .catch(err => console.log(err));
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
          <FormInput
            value={this.state.intro_text}
            onChangeText={(intro_text) => this.setState({ intro_text })} />
          <FormValidationMessage>Error message</FormValidationMessage>
          <FormLabel>Full Summary of Quest (include suitability, theme and difficulty</FormLabel>
          <FormInput
            value={this.state.full_text}
            onChangeText={(full_text) => this.setState({ full_text })} />
          <FormValidationMessage>Error message</FormValidationMessage>
          <FormLabel>Icon URL</FormLabel>
          <FormInput
            value={this.state.icon_url}
            onChangeText={(icon_url) => this.setState({ icon_url })}
            placeholder='Leave blank if not using'
          />
          <FormLabel>Background URL</FormLabel>
          <FormInput
            value={this.state.background_url}
            onChangeText={(background_url) => this.setState({ background_url })}
            placeholder='Leave blank if not using'
          />
          <FormLabel>Age suitability</FormLabel>
          <FormInput
            value={this.state.suitability}
            onChangeText={(suitability) => this.setState({ suitability })} />
          <FormValidationMessage>Error message</FormValidationMessage>
          <FormLabel>Area within Venue</FormLabel>
          <FormInput
            value={this.state.venue_area}
            onChangeText={(venue_area) => this.setState({ venue_area })} />
          <FormValidationMessage>Error message</FormValidationMessage>
          <Button
            title="Submit"
            onPress={() => {
              this.submitForm()
              this.props.navigation.navigate('CreateQuestion')
            }
            } />
        </ScrollView>
      </View>
    );

  }
}

export default CreateQuest;
