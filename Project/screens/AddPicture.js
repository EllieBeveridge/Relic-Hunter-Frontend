import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native-elements'
import * as api from '../api'
import { Camera, Permissions, ImageManipulator, FileSystem } from 'expo';
import styles from '../stylesheets/QuestionStylesheet'
import CameraPicture from '../components/CameraPicture'
import CameraImage from '../components/CameraImage'


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

  render() {
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
        score={score}
        updateAnswers={this.updateAnswers}
        lastAnswer={lastAnswer}
        question={questions[currQ]}
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
              title="Take a picture"
              backgroundColor="#4E3948"
              fontSize={16}
              icon={{ name: 'camera', type: 'font-awesome' }}
              onPress={() =>
                this.setState({
                  takePic: true,
                  lastAnswer: null
                })
              }
            />
          </View>
        </View>
        <QuestionButtons
          navigation={this.props.navigation}
          hint_text={questions[currQ].hint_text}
          currQ={currQ}
          questions={questions}
          updateCurrQ={this.updateCurrQ}
          score={this.state.score}
        />
      </View>
    );
  }
}

export default AddPicture;
