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
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={styles.container}>

          <Text style={generalStyle.titleMode}>Relic Hunter</Text>
          <View style={{ flex: 1 }}>

            <View >
              <Spinner
                visible={this.state.focusing}
                textContent={"Taking Picture..."}
                textStyle={{ color: '#FFF' }} />
            </View>
            <Camera
              style={styles.preview}
              ref={(ref) => { this.camera = ref }}
              autoFocus={'on'}
            >
              <TouchableOpacity
                style={styles.capture}
                onPress={this.snap.bind(this)}
              >
                <Text
                  style={
                    {
                      fontSize: 22, width: 100, padding: 0, margin: 0,
                      color: 'purple',
                    }
                  }>
                  Press me</Text>
              </TouchableOpacity>

            </Camera>
          </View>
        </View>
      );
    }
  }

  snap = async () => {
    if (this.state.focusing) return;
    this.setState({
      focusing: true
    })
    if (this.camera) {
      let photo = await this.camera.takePictureAsync()
        .then(data => {
          this.props.updateUri(data.uri, false, true)
        })
    }
  }

}

export default CameraPicture;
