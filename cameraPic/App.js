import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    uri: null
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
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

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.uri ? this.renderImage() : this.renderCamera()}
      </View>
    );
  }

  renderImage() {
    return (
      <View>
        <Image
          source={{ uri: this.state.uri }}
          style={{ width: 40, height: 40 }}
        />
        <Text
          style={{ fontSize: 18, marginBottom: 0, color: 'blue' }}
          onPress={() => this.setState({ uri: null })}
        >Cancel
        </Text>
      </View>
    );
  }

  renderCamera() {
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
              <Text>Touch Me</Text>
            </TouchableOpacity>
          </Camera>
          {/* <Camera style={{ flex: 1 }} type={this.state.type} ref={(ref) => { this.camera = ref }}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent', // dont change or cant see camera view
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.5,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                // onPress={() => {
                //   this.setState({
                //     type: this.state.type === Camera.Constants.Type.back
                //       ? Camera.Constants.Type.front
                //       : Camera.Constants.Type.back,
                //   });
                // }}
                onPress={this.snap.bind(this)}
              >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'blue' }}>
                  {' '}Flippy!{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera> */}

        </View>
      );
    }
  }
}



