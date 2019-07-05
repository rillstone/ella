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
import Icon from "react-native-vector-icons/Ionicons";
import { LineChart, Grid, AreaChart } from "react-native-svg-charts";
import * as theme from "../theme";
import {
  Button,
  Input,
  Avatar,
  Card,
  Divider,
  ListItem
} from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
const icons = [
  "ios-tennisball",
  "ios-stopwatch",
  "ios-pie",
  "ios-happy",
  "ios-chatbubbles",
  "ios-basketball",
  "ios-baseball",
  "ios-aperture",
  "ios-analytics",
  "ios-appstore"
];
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
export default class Goal extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    const {
      data: { title, subtitle }
    } = this.props;

    return (
        <TouchableOpacity style={styles.card} >
      <LinearGradient style={styles.card} colors={["#F6699A", "#FF7DAA"]} start={[0.3,0]} end={[0.8,0]} >
        <View style={styles.icon}>
          <Icon
            name={icons[Math.floor(Math.random() * icons.length)]}
            color={"#FFF"}
            size={40}
          />
        </View>
        <View style={styles.goalText}>
          <Text
            style={styles.goalTitle}
          >
            {title}
          </Text>
          <Text
            style={styles.goalSubtitle}
          >
            {subtitle}
          </Text>
        </View>
        <View style={styles.iconArrow}>
          <Icon name="ios-arrow-forward" color={"#FFF"} size={26} />
        </View>
      </LinearGradient>
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
    alignSelf: "center",
    // justifyContent: "center",
    // alignContent: "center",
    marginVertical: 5,
    width: viewportWidth-40,
    height: 70,
    overflow: "hidden",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    flexDirection: 'row',
    elevation: 1
  },
  icon:{
      flex:1.5,
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    left: 10,
  },
  iconArrow:{
      flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  goalText:{
    padding: 15, alignItems: "flex-start", borderRadius: 5,
    flex: 8
  },
  goalTitle:{
    backgroundColor: "transparent",
    fontSize: 18,
    fontWeight: "700",
    color: "#fff"
  },
  goalSubtitle:{
    backgroundColor: "transparent",
    fontSize: 15,
    fontWeight: "500",
    color: "#fff"
  },
});
