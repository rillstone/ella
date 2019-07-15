import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from "react-native";
import * as theme from "../theme";
import {
  Slider
} from "react-native-elements";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
export default class GoalSlider extends Component {
  constructor(props) {
    super();
    this.state = {
      value: 0
    };
    this.props = props;
  }

  render() {
    const { color } = this.props;
    return (
      <View>
        <View pointerEvents={"none"}
          style={{zIndex:999}}>
          <Text
            style={styles.amountStyle}
          >
            ${this.state.value}
          </Text>
        </View>
        <Slider
          value={this.state.value}
          maximumValue={1000}
          minimumValue={0}
          step={1}
          onValueChange={value => { this.setState({ value }); this.props.onSlide(value); }}
          style={styles.sliderStyle}
          trackStyle={styles.trackStyle}
          minimumTrackTintColor={color}
          maximumTrackTintColor={theme.colors.lightGray}
          thumbTintColor={color}
          animationType={"spring"}
          thumbStyle={styles.thumbStyle}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  sliderStyle: {
    width: viewportWidth - 50,
    left: 0
  },
  trackStyle: {
    backgroundColor: theme.colors.lightGray,
    height: 70,
    borderRadius: 10
  },
  thumbStyle: {
    height: 70,
    width: 30,
    borderRadius: 10
  },
  amountStyle: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    alignSelf: "center",
    top: 10,

    fontWeight: "700",

    fontSize: 20,
    color: "#FFF",
    zIndex: 999
  }
});
