import React, { Component } from 'react';
import { ImageBackground, View, Text, Button, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import QuestionButtons from './QuestionButtons'
import { Camera, Permissions, ImageManipulator, FileSystem } from 'expo';
import styles from '../stylesheets/QuestionStylesheet'
import base64 from 'base64-js';
import * as api from '../api';

class CameraImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: Camera.Constants.Type.back,
      uploading: false
    };
  }

  render = () => {

    console.log('i am in camera IMAGE')
    const { uri, answers } = this.props
    return (

      <View>

        <ImageBackground
          source={{ uri: uri }}
          style={{ width: "100%", height: "100%" }}
        >
          {this.state.uploading && <View>
            <Text>UPLOADING IMAGE</Text>
          </View>
          }

          <TouchableOpacity
            style={styles.discard}
          >

            <Text
              onPress={() => this.discardImage()}
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
      </View >
    );
  }

  discardImage() {
    console.log('discarding image')
    this.props.updateUri(null, true, false)
  }

  sendImage() {
    console.log('sending image...')
    this.setState({
      uploading: true
    })

    ImageManipulator.manipulate(this.props.uri, [{ resize: { width: 1000 } }], { base64: true, format: 'jpeg' })
      .then(({ base64 }) => {
        const finalB64 = { answer: { image: base64 } }
        const question_id = 1;
        api.checkPicture(question_id, finalB64)
          .then(answer => {
            console.log('>>>>>>   checking picture...', answer)
            // const points = this.props.answers
            // const newPoints = points + 1
            this.setState({
              uploading: false,
            })
            // null is not set yet so dont render feedback
            const ansFlag = (answer) ? 't' : 'f';
            const newPoints = (answer) ? this.props.answers + 1 : this.props.answers;
            this.props.updateAnswers(newPoints, ansFlag)
            this.props.updateUri(null, false, false)
            console.log(this.props.answers, 'score')
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

export default CameraImage;
