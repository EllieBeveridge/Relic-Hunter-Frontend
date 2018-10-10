import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Camera } from 'expo';
import styles from '../stylesheets/CameraStylesheet'
import generalStyle from '../stylesheets/generalStyle'
import Spinner from 'react-native-loading-spinner-overlay';

class CameraPicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusing: false,
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
          <Text style={generalStyle.titleMode}>Relic Hunter</Text>
          <View >
            <Spinner
              visible={this.state.focusing}
              textContent={"Taking Picture..."}
              textStyle={{ color: '#FFF' }} />
          </View>
          <Camera
            style={styles.preview}
            ref={(ref) => { this.camera = ref }}
          >
            <TouchableOpacity
              style={styles.capture}
              onPress={this.snap.bind(this)}
            >
              <Text style={{ fontSize: 18, marginBottom: 20, color: 'purple' }}>
                PRESS ME</Text>
            </TouchableOpacity>

          </Camera>
        </View>
      );
    }
  }

  snap = async () => {
    if (this.state.focusing) return;
    console.log('take a picture')
    this.setState({
      focusing: true
    })
    if (this.camera) {
      let photo = await this.camera.takePictureAsync()
        .then(data => {
          this.props.updateUri(data.uri, false, true)
        })
    }
    // gives async problem if actually do this setstate to false!
    // cant set unmonunted component!
    // so setstate to false` removed pending further investigation...
    // this.setState({
    //   focusing: false
    // })
  }

}

export default CameraPicture;
