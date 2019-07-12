import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform
} from "react-native";
import PropTypes from "prop-types";

const IS_IOS = Platform.OS === "ios";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.15;
const slideWidth = wp(85);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export default class IntroSlider extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    const {
      data: { id, image }
    } = this.props;

    return (
      <View style={styles.slideInnerContainer}>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  slideInnerContainer: {
    width: viewportWidth - 60,
    height: viewportWidth - 60,
    // backgroundColor: 'green'
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8,
    resizeMode: "cover",
    // backgroundColor: 'green'
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  }
});
