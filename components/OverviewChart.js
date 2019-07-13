import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import PropTypes from "prop-types";
import * as shape from "d3-shape";
import Icon from "react-native-vector-icons/Ionicons";
import { AreaChart } from "react-native-svg-charts";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
export default class OverviewChart extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  dataChange(data, title) {
    let sum = data.reduce((previous, current) => (current += previous));
    let avg = Math.round(sum / data.length);
    let current = data[data.length - 1];

    return (
      <View style={styles.chartInfo}>
        <Icon
          name={
            current < avg
              ? "ios-arrow-round-down"
              : current > avg
              ? "ios-arrow-round-up"
              : "ios-remove"
          }
          size={26}
          color="#FFF"
        />
        <View>
          <Text style={styles.chartInfoQuantity}>
            ${Math.abs(current - avg)}
          </Text>
        </View>
        <View>
          <Text style={styles.chartInfoTitle}>{title}</Text>
        </View>
      </View>
    );
  }

  render() {
    const {
      data: { position, image, data, color, title }
    } = this.props;

    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("OverviewChart", {
            navigation: this.props.navigation,
            title: title,
            data: data,
            colors: [image[1], color]
          })
        }
        style={
          position === "left"
            ? styles.container_left
            : position === "right"
            ? styles.container_right
            : styles.container_center
        }
      >
        <View style={styles.tile}>
          {/* <ImageBackground
            source={image}
            style={[
              {
                marginHorizontal: position === "center" ? 9 : 5
              },
              styles.card
            ]}
          > */}
          {/* <LinearGradient
          style={[
            {
              marginHorizontal: position === "center" ? 9 : 5
            },
            styles.card
          ]}
          colors={image}
          start={[0.2, 0.2]}
          end={[0.6, 0.6]}
        > */}
          <View
            style={[
              {
                marginHorizontal: position === "center" ? 9 : 5,
                backgroundColor: image[1]
              },
              styles.card
            ]}
          >
            <View />
            {this.dataChange(data, title)}
            <AreaChart
              style={{
                height: viewportWidth / 2.5 + 2
              }}
              curve={shape.curveNatural}
              data={data}
              gridMax={56}
              contentInset={{ top: 60, bottom: 20 }}
              svg={{ fill: color }}
            />
          </View>
          {/* </LinearGradient> */}
          {/* </ImageBackground> */}
        </View>
      </TouchableOpacity>
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
    height: viewportWidth / 2.5,
    overflow: "hidden",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 1
  },
  chartInfo: {
    position: "absolute",
    zIndex: 999,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    top: 8
  },
  chartInfoQuantity: {
    fontSize: 25,
    fontWeight: "700",
    color: "#FFF"
  },
  chartInfoTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFF"
  }
});
