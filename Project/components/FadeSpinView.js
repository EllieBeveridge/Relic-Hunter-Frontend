import React, { Component } from 'react';
import { Animated } from 'react-native';

class FadeSpinView extends React.Component {
  state = {
    spinAnim: new Animated.Value(0),  // Initial value for opacity: 0
  }

  componentDidMount() {
    Animated.loop(
      Animated.timing(
        this.state.spinAnim,
        {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }
      )).start()
  }

  render() {
    let { spinAnim } = this.state;
    // Second interpolate beginning and end values (in this case 0 and 1)
    const spin = this.state.spinAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })

    return (
      <Animated.Image
        style={{
          ...this.props.style,
          transform: [{ rotate: spin }]
        }}
      // source={require('../assets/images/robot-dev.png')}
      />
    );
  }
}

export default FadeSpinView;