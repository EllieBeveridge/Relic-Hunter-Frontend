import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Picker } from 'react-native';
//import styles from '../stylesheets/QuestionStylesheet'
import { Button, Icon } from 'react-native-elements'
import buttonStyles from '../stylesheets/buttonStyles'
import * as api from '../api'

class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venue: 1,
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
    return (
      <View style={styles.container}>
        <Image
          source={require('../images/logo.png')}
          style={styles.logoImage}
        />
        <View style={styles.buttonStyle}>
          <Text style={styles.textStyle}>Choose a Venue</Text>
          <Picker
            selectedValue={this.state.venue}
            style={{ height: 40, width: 160, color: '#583E5C' }}
            onValueChange={(itemValue, itemIndex) => this.setState({ venue: itemValue })}>
            {this.state.venues.map((venue, index) => (
              <Picker.Item label={venue.name} value={venue.id} key={index} />
            ))}
          </Picker>

          <Button
            buttonStyle={buttonStyles.buttonStyle}
            title="Let's Begin..."
            icon={{
              name: "treasure-chest",
              type: "material-community"
            }}
            onPress={() =>
              this.props.navigation.navigate('LandingPage', {
                venue_id: this.state.venue
              })
            }
          />
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
    alignItems: 'center'
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
