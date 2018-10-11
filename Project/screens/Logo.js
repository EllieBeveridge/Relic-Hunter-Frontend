import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Picker } from 'react-native';
import { Button, Icon } from 'react-native-elements'
import generalStyle from '../stylesheets/generalStyle'
import * as api from '../api'

class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venueState: 1,
      venues: []
    }

  }

  static navigationOptions = { title: 'Relic Hunter', header: null };

  componentDidMount = () => {
    api.fetchAllVenues()
      .then(venues => {
        this.setState({
          venues
        })
      })
  }

  render() {
    const { venueState } = this.state
    return (
      <View style={styles.container}>
        <Image
          source={require('../images/logo.png')}
          style={styles.logoImage}
        />
        <View style={styles.buttonStyle}>
          <Text style={styles.textStyle}>Choose a Venue</Text>
          <Picker

            selectedValue={venueState}
            style={{ height: 40, width: 160, color: '#583E5C' }}
            onValueChange={(itemValue, itemIndex) => this.setState({ venueState: itemValue })}>
            {this.state.venues.map((venue, index) => (
              <Picker.Item label={venue.name} value={venue.id} key={index} />
            ))}
          </Picker>
          <View style={styles.welcomeContainer}>
            <Button
              buttonStyle={generalStyle.buttonStyle}
              title="Play a Quest..."
              icon={{
                name: "treasure-chest",
                type: "material-community"
              }}
              onPress={() =>
                this.props.navigation.navigate('LandingPage', {
                  venue_id: venueState
                })
              }
            />
          </View>

          <View style={styles.welcomeContainer}>
            <Button
              buttonStyle={generalStyle.buttonStyle}
              title="Create a Quest"
              onPress={() =>
                this.props.navigation.navigate('CreateQuest', {
                  venueState
                })
              }
            />
          </View>
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBD158',
    overflow: 'hidden',
    alignItems: 'center',
  },
  textStyle: {
    textAlign: 'left',
    fontSize: 16,
    color: '#583E5C',
    fontWeight: 'bold',
    padding: 10
  },
  welcomeContainer: {
    alignItems: 'center',
    padding: 20,
  },
  buttonStyle: {
    alignItems: 'center'
  },
  logoImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginTop: 0
  }
});

export default componentName;
