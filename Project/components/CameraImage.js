import React, { Component } from 'react';
import { ImageBackground, View, Text, Alert, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
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
          {this.props.addPicture && <TouchableOpacity
            style={styles.submit}
            onPress={() => this.calibrateImage()}
          >
            <Text
              style={{ fontSize: 18, color: 'black' }}
            >Submit
            </Text>
          </TouchableOpacity>
          }
          {(this.props.Question || this.props.TestPics) && <TouchableOpacity
            style={styles.submit}
            onPress={() => this.sendImage()}
          >
            <Text
              style={{ fontSize: 18, color: 'black' }}
            >Submit
            </Text>
          </TouchableOpacity>
          }
        </ImageBackground>
      </View >
    );
  }

  discardImage() {
    console.log('discarding image')
    this.props.updateUri(null, true, false)
  }

  calibrateImage() {
    this.setState({
      uploading: true
    })
    ImageManipulator.manipulate(this.props.uri, [{ resize: { width: 1000 } }], { base64: true, format: 'jpeg' })
      .then(({ base64 }) => {
        const finalB64 = { answer: { image: base64 } }
        const question_id = this.props.question_id
        api.addPicture(question_id, finalB64)
          .then(data => {
            Alert.alert("Picture Added");
            this.props.updateUri(null, false, false)
          })

      })
      .catch(err => console.log(err))
  }


  sendImage() {
    console.log('sending image...')
    this.setState({
      uploading: true
    })

    ImageManipulator.manipulate(this.props.uri, [{ resize: { width: 1000 } }], { base64: true, format: 'jpeg' })
      .then(({ base64 }) => {
        const finalB64 = { answer: { image: base64 } }
        console.log(this.props);
        const question_id = this.props.question_id || this.props.question.id
        api.checkPicture(question_id, finalB64)
          .then(answer => {
            // gives async problem if actually do this setstate to false!
            // cant set unmonunted component!
            // so setstate to false removed pending further investigation...
            // this.setState({
            //   uploading: false,
            // }) 
            const ansFlag = (answer) ? 't' : 'f';
            if (this.props.Question) {
              const newPoints = (answer) ? this.props.score + 1 : this.props.score;
              this.props.updateAnswers(newPoints, ansFlag)
              this.props.updateUri(null, false, false)
            } else {
              this.props.updateAnswers(0, ansFlag)
              this.props.updateUri(null, false, false)

            }
          })
          .catch(err => {
            console.log('error in axios Post', err)
          })
      })
  }

}

export default CameraImage;
