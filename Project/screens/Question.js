import React, { Component } from 'react';
import { ImageBackground, View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import QuestionButtons from '../components/QuestionButtons'
import { Camera, Permissions, ImageManipulator, FileSystem } from 'expo';
import styles from '../stylesheets/QuestionStylesheet'
import CameraPicture from '../components/CameraPicture'
import CameraImage from '../components/CameraImage'
import GoodAnswer from '../components/GoodAnswer'
import BadAnswer from '../components/BadAnswer'
import { Button } from 'react-native-elements';

import { questid } from '../mock-data/question.json'

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showImage: false,
      takePic: false,
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      uri: null,
      questions: [],
      currQ: 0,
      score: 0,
      lastAnswer: null
    };
  }

  static navigatorStyle = {
    navBarHidden: true
  }

  render() {
    const { hasCameraPermission, takePic, uri, currQ, questions, score, lastAnswer } = this.state;
    if (!questions[0]) return null;

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
        score={score}
        updateAnswers={this.updateAnswers}
        lastAnswer={lastAnswer}
        question={questions[currQ]}
      />

    if (lastAnswer === 't')
      return <GoodAnswer
        score={score}
        updateAnswers={this.updateAnswers}
        currQ={currQ}
        questions={questions}
        navigation={this.props.navigation}
        updateCurrQ={this.updateCurrQ} />
    if (lastAnswer === 'f')
      return <BadAnswer
        score={score} updateAnswers={this.updateAnswers} />

    return (
      <View style={{ backgroundColor: '#FBD158', height: '100%' }}>
        <Text style={styles.titleMode}>QUESTION {questions[currQ].id}
          : {questions[currQ].title}
        </Text>
        <Text style={styles.question}>
          {questions[currQ].text}
        </Text>
        <View >
          <View style={styles.takePictureButton}>
            <Button
              title="Take a picture"
              backgroundColor="#4E3948"
              fontSize={16}
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
        <QuestionButtons
          navigation={this.props.navigation}
          hint_text={questions[currQ].hint_text}
          currQ={currQ}
          questions={questions}
          updateCurrQ={this.updateCurrQ}
          score={this.state.score}
        />
      </View>
    );
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const questions = navigation.getParam('questions')
    this.setState({
      hasCameraPermission: status === 'granted',
      questions: questions.questions
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

export default Question;
