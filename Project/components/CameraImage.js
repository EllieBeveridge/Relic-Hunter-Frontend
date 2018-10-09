import React, { Component } from 'react';
import { ImageBackground, View, Text, Button, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Camera, Permissions, ImageManipulator, FileSystem } from 'expo';
import styles from '../stylesheets/CameraStylesheet'
import * as api from '../api';
import Spinner from 'react-native-loading-spinner-overlay';

class CameraImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: Camera.Constants.Type.back,
      uploading: false,
    };
  }

  render = () => {
    const { uri } = this.props
    return (

      <View>

        <ImageBackground
          source={{ uri: uri }}
          style={{ width: "100%", height: "100%" }}
        >

          <View style={{ flex: 1 }}>
            <Spinner
              visible={this.state.uploading}
              textContent={"Checking..."}
              textStyle={{ color: '#FFF' }} />
          </View>


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
        const finalB64 = { answer: { image: base64, model_name: this.props.question.model_name } }
        const question_id = this.props.question.id
        api.checkPicture(question_id, finalB64)
          .then(answer => {
            this.setState({
              uploading: false,
            })

            const ansFlag = (answer) ? 't' : 'f';
            const newPoints = (answer) ? this.props.score + 1 : this.props.score;
            this.props.updateAnswers(newPoints, ansFlag)
            this.props.updateUri(null, false, false)
          })
          .catch(err => {
            console.log('error in axios Post', err)
          })
      })
  }

}

export default CameraImage;
