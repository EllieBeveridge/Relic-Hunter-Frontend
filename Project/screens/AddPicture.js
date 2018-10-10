import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native-elements'
import * as api from '../api'
import { Camera, Permissions, ImageManipulator, FileSystem } from 'expo';
import styles from '../stylesheets/QuestionStylesheet'
import CameraPicture from '../components/CameraPicture'
import CameraImage from '../components/CameraImage';
import QuestionButtons from '../components/QuestionButtons'


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
        console.log(data, '<<<data')
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
        <ScrollView>
          <Text style={styles.question}>
            Add a picture
            </Text>
        </ScrollView>
        <View >
          <View style={styles.takePictureButton}>
            <Button
              title="Add a picture"
              backgroundColor="#4E3948"
              fontSize={16}
              marginBottom={20}
              icon={{ name: 'camera', type: 'font-awesome' }}
              onPress={() =>
                this.setState({
                  takePic: true,
                  lastAnswer: null
                })
              }
            />
            <Button
              title="Finish Adding Pictures"
              backgroundColor="#4E3948"
              fontSize={16}
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

export default AddPicture;
