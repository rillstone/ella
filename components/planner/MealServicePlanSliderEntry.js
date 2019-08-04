import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Linking
} from "react-native";
import PropTypes from "prop-types";
import { Dimensions, Platform } from "react-native";
import * as theme from "../../theme";
import { Transition } from "react-navigation-fluid-transitions";
import * as firebase from "firebase";
import "firebase/storage";
import "firebase/firestore";
import { dispatch, connect } from "../../store";

const IS_IOS = Platform.OS === "ios";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
const entryBorderRadius = 8;
const slideHeight = viewportHeight / 2.5;
const slideWidth = viewportWidth * 0.8;
const itemHorizontalMargin = wp(2);
export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const mapStateToProps = state => ({
  user: state.user
});

class MealServicePlanSliderEntry extends Component {
  constructor(props) {
    super();
    this.state = { loaded: false };
  }
  db = firebase.firestore();
  storage = firebase.storage();
  static propTypes = {
    data: PropTypes.object.isRequired
  };
  _onLoad = () => {
    this.setState(() => ({ loaded: true }));
  };
  saveProfile(type, count, dietary, service, plan, url, navigation) {
    this.db
      .collection("users")
      .doc(this.props.user.uid)
      .set(
        {
          plannerType: type,
          mealSize: count,
          dietaryRequirements: dietary,
          mealCompany: service,
          chosenPlan: plan
        },
        { merge: true }
      )
      .catch(error => {})
      .then(() => {
        navigation.navigate("Planner", {});
        // Linking.openURL(url);
      });
  }

  render() {
    const { data, navigation } = this.props;
    const type = navigation.getParam("type", "other");
    const count = navigation.getParam("count", 2);
    const dietary = navigation.getParam("dietary", []);
    const service = navigation.getParam("service", "");

    console.log(type + " " + count + " " + dietary + " ");
    return (
      <TouchableOpacity
        activeOpacity={1}
        // onPress={() => navigation.navigate('MealView', { data: data })}
        onPress={() => {
          this.saveProfile(
            type,
            count,
            dietary,
            service,
            data.name.toString(),
            data.url,
            navigation
          );
        }}
      >
        <ImageBackground
          source={data.image}
          imageStyle={{ borderRadius: entryBorderRadius }}
          onLoad={this._onLoad}
          style={[
            styles.slideInnerContainer,
            {
              shadowOpacity: this.state.loaded ? 0.4 : 0.1,
              backgroundColor: this.state.loaded
                ? "transparent"
                : theme.colors.lightGray
            }
          ]}
        >
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={2}>
              {data.name}
            </Text>
            <Text style={styles.subtitle} numberOfLines={2}>
              ${data.price2} / serving
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}
export default connect(mapStateToProps)(MealServicePlanSliderEntry);

const styles = StyleSheet.create({
  slideInnerContainer: {
    width: slideWidth,
    height: slideHeight,
    marginHorizontal: itemHorizontalMargin,
    borderRadius: entryBorderRadius,
    paddingBottom: itemHorizontalMargin,
    shadowColor: "#6b6b6b",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    justifyContent: "flex-end"
  },
  textContainer: {
    justifyContent: "center",
    paddingTop: 20 - entryBorderRadius,
    // height: 100,
    paddingBottom: 10,
    paddingHorizontal: 16,
    marginHorizontal: wp(2),
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: entryBorderRadius,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#6b6b6b",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.gray
  },
  subtitle: {
    marginTop: 2,
    fontSize: 15,
    color: theme.colors.gray
  }
});
