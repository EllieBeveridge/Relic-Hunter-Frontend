import React, { Component } from 'react';
import { ImageBackground, View, Text, Button, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import QuestionButtons from '../components/QuestionButtons'
import { Camera, Permissions, ImageManipulator, FileSystem } from 'expo';
import styles from '../stylesheets/QuestionStylesheet'
import CameraPicture from '../components/CameraPicture'
import CameraImage from '../components/CameraImage'
import GoodAnswer from '../components/GoodAnswer'
import BadAnswer from '../components/BadAnswer'

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
      answers: 0,
      lastAnswer: null
    };
  }

  static navigatorStyle = {
    navBarHidden: true
  }

  render() {
    const { hasCameraPermission, takePic, uri, currQ, questions, answers, lastAnswer } = this.state;
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
        answers={answers}
        updateAnswers={this.updateAnswers}
        lastAnswer={lastAnswer}
      />

    if (lastAnswer === 't')
      return <GoodAnswer
        answers={answers}
        updateAnswers={this.updateAnswers}
        currQ={currQ}
        questions={questions}
        navigation={this.props.navigation}
        updateCurrQ={this.updateCurrQ} />
    if (lastAnswer === 'f')
      return <BadAnswer
        answers={answers} updateAnswers={this.updateAnswers} />

    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.question}> QUESTION{questions[currQ].question_id}:
          {questions[currQ].questionTitle}
        </Text>
        <Text style={styles.question}>
          {questions[currQ].questionText}
        </Text>
        <Button
          title="Take a picture"
          onPress={() =>
            this.setState({
              takePic: true,
              lastAnswer: null
            })
          }
        />
        <QuestionButtons
          navigation={this.props.navigation}
          hintText={questions[currQ].hintText}
          currQ={currQ}
          questions={questions}
          updateCurrQ={this.updateCurrQ} />
      </View>
    );
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
      questions: questid.questions,
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
      answers: newScore,
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
