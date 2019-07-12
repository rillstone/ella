import React, { PureComponent } from "react";
import { View } from "react-native";
import * as Animatable from "react-native-animatable";
import PropTypes from "prop-types";

export default class TransitionView extends PureComponent {
  static propTypes = {
    index: PropTypes.number
  };
  render() {
    const { index, ...rest } = this.props;
    const duration = 500;
    return (
      <Animatable.View
        animation="fadeIn"
        duration={duration}
        delay={index ? (index * duration) / 5 : 0}
        useNativeDriver
        {...rest}
      />
    );
  }
}
