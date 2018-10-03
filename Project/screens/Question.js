import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import QuestionButtons from '../components/QuestionButtons'
import { Image, TouchableOpacity } from 'react-native';
import { Camera, Permissions, ImageManipulator, FileSystem } from 'expo';
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


  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text> QUESTION: TELL ME HOW YOU FEEL ABOUT REACT NATIVE </Text>
        <Button
          title="Take a picture"
          onPress={() =>
            this.setState({
              pressed: true
            })
          }
        />

        {this.state.pressed && this.state.uri && this.renderImage()}
        {this.state.pressed && !this.state.uri && this.renderCamera()}

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
        <Image
          source={{ uri: this.state.uri }}
          style={{ width: "100%", height: "80%" }}
        />
        <Text
          style={{ fontSize: 18, marginBottom: 20, color: 'blue' }}
          onPress={() => this.setState({ uri: null })}
        >Cancel
        </Text>
        <Text
          style={{ fontSize: 18, marginBottom: 20, color: 'blue' }}
          onPress={() => this.sendImage()}
        >Use My IMAGE
        </Text>
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
            style={{ flex: 1 }}
            ref={(ref) => { this.camera = ref }}
          >
            <View style={{ flex: 1 }}></View>
            <TouchableOpacity
              style={{ flex: 0, backgroundColor: 'red' }}
              onPress={this.snap.bind(this)}
            >
              <Text style={{ fontSize: 18, marginBottom: 20, color: 'black' }}>
                >Touch Me</Text>
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
          console.log(this.state, '<<<<<<<')
        })
    }
  }

  sendImage() {
    console.log('send IMAGE')
    this.setState({
      uploading: true
    })

    ImageManipulator.manipulate(
      this.state.uri,
      [{ resize: { width: 100 } }]
    )
      .then(({ uri }) => {
        console.log('uri:', uri)
        return this.fileToBase64Helper(uri)
      })
      // this.fileToBase64Helper(manipResult.uri)
      .then(base64URI => {
        // base64URI = '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';
        const finalB64 = { answer: { image: base64URI } }
        console.log(finalB64);
        const question_id = 1;
        const API_URL = `http://ec2-35-177-132-73.eu-west-2.compute.amazonaws.com:9090/api/answers/${question_id}`;

        return axios.post(API_URL, finalB64)
          .then(res => {
            console.log('>>>>>', res)
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
      // console.log('read file', content)
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
