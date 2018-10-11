import React, { Component } from 'react';
import { ImageBackground, View, Text, Alert, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Camera, Permissions, ImageManipulator, FileSystem } from 'expo';
import styles from '../stylesheets/CameraStylesheet'
import generalStyle from '../stylesheets/generalStyle'
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

      <View style={styles.container}>

        <Text style={generalStyle.titleMode}>Relic Hunter</Text>
        <View style={{ flex: 1 }}>

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

                style={
                  {
                    fontSize: 22, width: 80, padding: 0, margin: 0,
                    color: 'purple',
                  }
                }>Retake
            </Text>
            </TouchableOpacity>


            <TouchableOpacity
              style={styles.submit}
              onPress={() => {
                if (this.props.Question || this.props.TestPics) this.sendImage()

                else if (this.props.addPicture) this.calibrateImage()
              }
              }
            >
              <Text
                style={
                  {
                    fontSize: 22, width: 80, padding: 0, margin: 0,
                    color: 'purple',
                  }
                }>Submit
            </Text>
            </TouchableOpacity>

          </ImageBackground>
        </View >
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

        if (this.props.Question) {
          api.checkPicture(question_id, finalB64)
            .then(answer => {
              // gives async problem if actually do this setstate to false!
              // cant set unmonunted component!
              // so setstate to false removed pending further investigation...
              // this.setState({
              //   uploading: false,
              // }) 

              const ansFlag = (answer) ? 't' : 'f';
              const newPoints = (answer) ? this.props.score + 1 : this.props.score;
              this.props.updateAnswers(newPoints, ansFlag)
              this.props.updateUri(null, false, false)
            })
        } else {
          api.testModel(question_id, finalB64)
            .then(answer => {
              const ansFlag = (answer) ? 't' : 'f';
              this.props.updateAnswers(0, ansFlag)
              this.props.updateUri(null, false, false)

            })
        }
      })
      .catch(err => {
        console.log('error in axios Post', err)
      })

  }

}

export default CameraImage;
