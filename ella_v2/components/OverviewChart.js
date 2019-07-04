import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground
} from "react-native";
import PropTypes from "prop-types";
import SlidingUpPanel from "rn-sliding-up-panel";
import * as shape from "d3-shape";
import { LineChart, Grid } from "react-native-svg-charts";
import * as theme from "../theme";
import { Button, Input, Avatar, Card, Divider } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
export default class OverviewChart extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    const {
      data: { position, image, data }
    } = this.props;

    return (
      <View
        style={
          position === "left"
            ? styles.container_left
            : position === "right"
            ? styles.container_right
            : styles.container_center
        }
      >
        <View style={styles.tile}>
          <ImageBackground
            source={image}
            style={[
              {
                marginHorizontal: position === "center" ? 9 : 5
              },
              styles.card
            ]}
          >
            <LineChart
              style={{
                height: viewportWidth / 3
              }}
              curve={shape.curveNatural}
              data={data}
              contentInset={{ top: 20, bottom: 20 }}
              svg={{
                strokeWidth: 2,
                stroke: "#FFF"
              }}
            />
          </ImageBackground>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6f5f7"
  },
  dragHandler: {
    alignSelf: "stretch",
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
    // alignContent: "flex-start",  justifyContent: "flex-start",alignSelf: "flex-start",
  },
  container_left: {
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    left: 0
  },
  container_center: {
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center"
  },
  container_right: {
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    alignContent: "flex-end",
    right: 0
  },
  tile: {
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: "#0000"
  },
  card: {
    borderRadius: 12,
    width: viewportWidth / 3.6,
    height: viewportWidth / 3,
    overflow: "hidden",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 1
  }
});
