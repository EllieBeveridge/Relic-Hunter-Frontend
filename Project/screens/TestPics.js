import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import QuestionButtons from '../components/QuestionButtons'
import { Camera, Permissions, ImageManipulator, FileSystem } from 'expo';
import styles from '../stylesheets/QuestionStylesheet'
import generalStyle from '../stylesheets/generalStyle'
import CameraPicture from '../components/CameraPicture'
import CameraImage from '../components/CameraImage'
import GoodAnswer from '../components/GoodAnswer'
import BadAnswer from '../components/BadAnswer'
import { Button } from 'react-native-elements';

class TestPics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showImage: false,
      takePic: false,
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      uri: null,
      lastAnswer: null
    };
  }

  static navigationOptions = { title: 'Relic Hunter', header: null };

  render() {
    const { navigation } = this.props
    const question_id = navigation.getParam('question_id');
    const quest_id = navigation.getParam('quest_id');
    console.log(question_id);
    const { hasCameraPermission, takePic, uri, currQ, questions, score, lastAnswer } = this.state;

    if (hasCameraPermission === false) {
      return <Text>Camera permission needed to play</Text>
    }

    if (takePic && !uri)
      return <CameraPicture updateUri={this.updateUri}
      />
    if (!takePic && uri)
      return <CameraImage
        updateUri={this.updateUri}
        uri={uri}
        question_id={question_id}
        TestPics={true}
        updateAnswers={this.updateAnswers}
      />

    if (lastAnswer === 't')
      return <GoodAnswer
        quest_id={quest_id}
        TestPics={true}
        navigation={navigation}
      />
    if (lastAnswer === 'f')
      return <BadAnswer
        TestPics={true}
        updateAnswers={this.updateAnswers}
      />

    return (
      <View style={{ backgroundColor: '#FBD158', height: '100%' }}>
        <ScrollView>
          <Text style={styles.question}>
            Test Your Picture!
          </Text>
        </ScrollView>
        <View >
          <View style={styles.takePictureButton}>
            <Button
              title="Take a picture"
              buttonStyle={generalStyle.buttonStyle}
              icon={{ name: 'camera', type: 'font-awesome' }}
              onPress={() =>
                this.setState({
                  takePic: true,
                  lastAnswer: null
                })
              }
            />
          </View>
        </View>
      </View>
    );
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const questions = navigation.getParam('questions')
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  }

  updateUri = (uriTaken, reshow, imageOn) => {
    this.setState({
      uri: uriTaken,
      takePic: reshow,
      showImage: imageOn
    })
  }

  updateAnswers = (newScore, ansFlag) => {
    this.setState({
      score: newScore,
      lastAnswer: ansFlag,
      takePic: false,
      showImage: false
    })
  }

  updateCurrQ = () => {
    const newQ = this.state.currQ + 1;
    this.setState({
      currQ: newQ
    })
  }
}

export default TestPics;
