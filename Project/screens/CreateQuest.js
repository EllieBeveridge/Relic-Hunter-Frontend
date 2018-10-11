import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, Alert } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import * as api from '../api'

class CreateQuest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Title of quest here',
      intro_text: 'Short summary of quest',
      full_text: 'More details on quest here',
      suitability: 'Who is this quest for?',
      venue_area: 'Where is it, ie 3rd floor, garden'
    };
  }

  static navigationOptions = { title: 'Relic Hunter', header: null };

  submitForm = () => {
    const { navigation } = this.props
    const venue_id = navigation.getParam('venue_id');
    api.postNewQuest(venue_id, this.state)
      .then(quest => {
        Alert.alert("Quest created");
        this.props.navigation.navigate('CreateQuestion', quest)
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
          {(this.state.title.length < 3 && this.state.title !== '') && <FormValidationMessage>Must be at least 3 characters.</FormValidationMessage>}
          <FormLabel>Short Summary of Quest</FormLabel>
          <FormInput
            value={this.state.intro_text}
            onChangeText={(intro_text) => this.setState({ intro_text })} />
          {(this.state.intro_text.length < 3 && this.state.intro_text !== '') && <FormValidationMessage>Must be at least 3 characters.</FormValidationMessage>}
          <FormLabel>Full Summary of Quest (include suitability, theme and difficulty</FormLabel>
          <FormInput
            value={this.state.full_text}
            onChangeText={(full_text) => this.setState({ full_text })} />
          {(this.state.full_text.length < 3 && this.state.full_text !== '') && <FormValidationMessage>Must be at least 3 characters.</FormValidationMessage>}
          {/* <FormLabel>Icon URL</FormLabel>
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
          /> */}
          <FormLabel>Age suitability</FormLabel>
          <FormInput
            value={this.state.suitability}
            onChangeText={(suitability) => this.setState({ suitability })} />
          {(this.state.suitability.length < 3 && this.state.suitability !== '') && <FormValidationMessage>Must be at least 3 characters.</FormValidationMessage>}
          <FormLabel>Area within Venue</FormLabel>
          <FormInput
            value={this.state.venue_area}
            onChangeText={(venue_area) => this.setState({ venue_area })} />
          {(this.state.venue_area.length < 3 && this.state.venue_area !== '') && <FormValidationMessage>Must be at least 3 characters.</FormValidationMessage>}
          <Button
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

export default CreateQuest;
