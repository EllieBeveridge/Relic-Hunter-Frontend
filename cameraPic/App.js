import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';
import base64 from 'base64-js';
import { FileSystem } from 'expo';

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    uri: null,
    image: null,
    uploading: false
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
            uri: data.uri,
            image: data
          })
          // console.log(this.state, '<<<<<<<')
          console.log(data, '<<<<<<< data');
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

  sendImage() {
    console.log('send IMAGE')
    this.setState({
      uri: null,
      uploading: true
    })
    console.log('this.state.uri', this.state.uri)
    let base64URI = null;
    this.fileToBase64Helper(this.state.uri)
      .then(b64 => {
        base64URI = b64;
        console.log('sendImage base64URI', base64URI.slice(0, 10));
      })
      .then(() => {
        const API_URL = 'localhost:9090/api'
        console.log('postImage base64URI', base64URI.slice(0, 10));
        fetch(`${API_URL}`, {
          method: 'POST',
          body: base64URI
        })
          .then(res => res.json())
          .then(image => {
            this.setState({
              uploading: false,
              image
            })
          })
          .catch(err => {
            console.log('error in Fetch/POST !!!', err)
          })
      })
  }

  stringToUint8Array(str) {
    const length = str.length
    const array = new Uint8Array(new ArrayBuffer(length))
    for (let i = 0; i < length; i++) array[i] = str.charCodeAt(i)
    return array
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

  fileToBase64Helper(uriString) {
    return this.fileToBase64(uriString)
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
              <Text style={{ fontSize: 18, marginBottom: 20, color: 'black' }}>
                >Touch Me</Text>
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



