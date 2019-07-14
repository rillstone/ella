import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/Ionicons";
import * as theme from "../theme";
import * as categoryTypes from "../components/CategoryTypes";
import TimeAgo from "react-native-timeago";
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
      data: { title, date, type, category, value, period }
    } = this.props;
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("ViewGoal", {
            navigation: this.props.navigation, title: title,
              date: date,
              category: category,
              value: value,
              period: period
          })
        }
        style={styles.card}
      >
        <LinearGradient
          style={styles.card}
          colors={[theme.scheme.sunshade, theme.scheme.sunshade]}
          start={[0.3, 0]}
          end={[0.8, 0]}
        >
          <View style={styles.icon}>
            <Icon
              name={
                category != null
                  ? categoryTypes.categoryIcons[category]
                  : "ios-rocket"
              }
              color={"#FFF"}
              size={40}
            />
          </View>
          <View style={styles.goalText}>
            <Text style={styles.goalTitle}>{title}</Text>
            <Text style={styles.goalSubtitle}>
              <TimeAgo time={date} />
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
    width: viewportWidth - 40,
    height: 70,
    // overflow: "hidden",
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
    flexDirection: "row",
  },
  icon: {
    flex: 1.5,
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    left: 10
  },
  iconArrow: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center"
  },
  goalText: {
    padding: 15,
    alignItems: "flex-start",
    borderRadius: 5,
    flex: 8
  },
  goalTitle: {
    backgroundColor: "transparent",
    fontSize: 18,
    fontWeight: "700",
    color: "#fff"
  },
  goalSubtitle: {
    backgroundColor: "transparent",
    fontSize: 15,
    fontWeight: "500",
    color: "#fff"
  }
});
