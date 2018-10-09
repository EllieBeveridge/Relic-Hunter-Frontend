import React, { Component } from 'react';
import { ImageBackground, View, Text, Button, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import QuestionButtons from './QuestionButtons'
import { Camera, Permissions, ImageManipulator, FileSystem } from 'expo';
import styles from '../stylesheets/CameraStylesheet'
import base64 from 'base64-js';
import * as api from '../api';

class CameraPicture extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render = () => {
    console.log('i am in camera picture')
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
    console.log('take a picture')
    if (this.camera) {
      let photo = await this.camera.takePictureAsync()
        .then(data => {
          this.props.updateUri(data.uri, false, true)
        })
    }
  }

}

export default CameraPicture;
