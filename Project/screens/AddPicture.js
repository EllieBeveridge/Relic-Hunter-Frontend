import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, Alert, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements'
import * as api from '../api'
import { Camera, Permissions, ImageManipulator, FileSystem } from 'expo';
import styles from '../stylesheets/QuestionStylesheet'
import CameraPicture from '../components/CameraPicture'
import CameraImage from '../components/CameraImage';
import generalStyle from '../stylesheets/generalStyle'


class AddPicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showImage: false,
      takePic: false,
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      uri: null,
      addPicture: true
    };
  }

  static navigationOptions = { title: 'Relic Hunter', header: null };

  async componentDidMount() {
    const { navigation } = this.props;
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted'
    });
  }

  updateUri = (uriTaken, reshow, imageOn) => {
    this.setState({
      uri: uriTaken,
      takePic: reshow,
      showImage: imageOn
    })
  }

  trainModel = () => {
    const { navigation } = this.props
    const question_id = navigation.getParam('id');
    const quest_id = navigation.getParam('quest_id');
    api.trainModel(question_id)
      .then(data => {
        Alert.alert('Image recognition model created')
        this.props.navigation.navigate('TestPics', { question_id, quest_id })
      })
      .catch(err => {
        if (err) Alert.alert('More photos are required')
      })
  }

  render() {

    const { navigation } = this.props
    const question_id = navigation.getParam('id');
    const { hasCameraPermission, takePic, uri } = this.state;

    if (hasCameraPermission === false) {
      return <Text>Camera permission needed to play</Text>
    }

    if (takePic && !uri)
      return <CameraPicture updateUri={this.updateUri}
      />

    if (!takePic && uri)
      return <CameraImage
        addPicture={this.state.addPicture}
        updateUri={this.updateUri}
        uri={uri}
        question_id={question_id}
        navigation={navigation}

      />

    return (
      <View style={{ backgroundColor: '#FBD158', height: '100%' }}>
        <Text style={addPicStyles.heading}>
          Add pictures to Model
            </Text>
        <ScrollView>
          <Text style={addPicStyles.explanation}>
            Take pictures to generate an image recognition model. For best results, include at least 10 pictures from multiple angles. Try to keep lighting consistent.
            </Text>
        </ScrollView>
        <View >
          <View style={styles.welcomeContainer}>
            <Button
              title="Add picture"
              buttonStyle={generalStyle.buttonStyle}
              icon={{ name: 'camera', type: 'font-awesome' }}
              onPress={() =>
                this.setState({
                  takePic: true,
                  lastAnswer: null
                })
              }
            />
          </View>
          <View style={addPicStyles.welcomeContainer}>
            <Button
              title="Finish Adding Pictures"
              buttonStyle={generalStyle.buttonStyle}
              icon={{ name: 'camera', type: 'font-awesome' }}
              onPress={() =>
                this.trainModel()
              }
            />
          </View>
        </View>
      </View>
    );
  }
}

const addPicStyles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    fontSize: 32,
    color: '#583E5C',
    padding: 10,
    marginTop: 60
  },
  explanation: {
    textAlign: 'center',
    fontSize: 18,
    color: '#583E5C',
    padding: 10
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 80,
  },
})

export default AddPicture;
