import React, { Component } from 'react';
import { ImageBackground, View, Text, Button, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import QuestionButtons from '../components/QuestionButtons'
import { Camera, Permissions, ImageManipulator, FileSystem } from 'expo';
import styles from '../stylesheets/QuestionStylesheet'
import base64 from 'base64-js';
import axios from 'axios';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: null,
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      uri: null
    };
  }

  static navigatorStyle = {
    navBarHidden: true
  }

  render() {
    const { pressed, uri } = this.state
    if (pressed && uri) return this.renderImage();
    if (pressed && !uri) return this.renderCamera();
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.question}> QUESTION: TELL ME HOW YOU FEEL ABOUT REACT NATIVE </Text>
        <Button
          title="Take a picture"
          onPress={() =>
            this.setState({
              pressed: true
            })
          }
        />
        <QuestionButtons navigation={this.props.navigation} />
      </View>
    );
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  renderImage = () => {
    return (
      <View>
        <ImageBackground
          source={{ uri: this.state.uri }}
          style={{ width: "100%", height: "100%" }}
        >
          <TouchableOpacity
            style={styles.discard}
          >
            <Text
              onPress={() => this.setState({ uri: null })}
              style={{ fontSize: 18, color: 'black' }}
            >Discard
        </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submit}
            onPress={() => this.sendImage()}
          >
            <Text
              style={{ fontSize: 18, color: 'black' }}
            >Submit
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }

  renderCamera = () => {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={styles.preview}
            ref={(ref) => { this.camera = ref }}
          >
            <TouchableOpacity
              style={styles.capture}
              onPress={this.snap.bind(this)}
            >
              <Text style={{ fontSize: 18, marginBottom: 20, color: 'black' }}>
                Touch Me</Text>
            </TouchableOpacity>
          </Camera>
        </View>
      );
    }
  }

  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync()
        .then(data => {
          this.setState({
            uri: data.uri
          })
        })
    }
  }

  sendImage() {
    this.setState({
      uploading: true
    })


    ImageManipulator.manipulate(this.state.uri, [{ resize: { width: 1000 } }], { base64: true, format: 'jpeg' })
      .then(({ base64 }) => {

        const finalB64 = { answer: { image: base64 } }
        const question_id = 1;
        const API_URL = `http://ec2-35-177-132-73.eu-west-2.compute.amazonaws.com/api/answers/${question_id}`;

        return axios.post(API_URL, finalB64)
          .then(res => {
            this.setState({
              uploading: false,
              uri: null
            })
          })
          .catch(err => {
            console.log('error in axios Post', err)
          })
      })
  }

  fileToBase64Helper(uriString) {
    return this.fileToBase64(uriString)
  }

  async fileToBase64(input) {
    try {
      const content = await FileSystem.readAsStringAsync(input)
      return base64.fromByteArray(this.stringToUint8Array(content))
    } catch (e) {
      console.warn('fileToBase64()', e.message)
      return ''
    }
  }

  stringToUint8Array(str) {
    const length = str.length
    const array = new Uint8Array(new ArrayBuffer(length))
    for (let i = 0; i < length; i++) array[i] = str.charCodeAt(i)
    return array
  }

}

export default Question;
