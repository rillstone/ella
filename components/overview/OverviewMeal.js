import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import PropTypes from "prop-types";
import { Dimensions, Platform } from "react-native";
import * as theme from "../../theme";
import { Transition } from "react-navigation-fluid-transitions";
import mfb from "../../assets/mfb.json";
import moment from "moment";
const IS_IOS = Platform.OS === "ios";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
const entryBorderRadius = 8;
const slideHeight = viewportWidth / 2.5;
const slideWidth =     viewportWidth / 3.7;
const itemHorizontalMargin = wp(2);
export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

export default class OverviewMeal extends Component {
  constructor(props) {
    super();
    this.state = {
      loaded: false
    };
  }
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  _onLoad = () => {
    this.setState(() => ({ loaded: true }));
  };


  render() {
    const { data, navigation } = this.props;

    const today = moment().weekday();
    const start = today >=3? 2 : today == 0? 0 : today-1;
    const end = start + 3;
    const displayRecipes = data.recipes.slice(start,end);
    return (
        <View style={{flexDirection: 'row'}}>
            {displayRecipes.map((recipe,index) => {
return (
        <TouchableOpacity
        key={recipe.id}
        activeOpacity={1}
        onPress={() => navigation.navigate("MealView", { data: recipe })}
        style={
            index === 0
              ? styles.container_left
              : index === 2
              ? styles.container_right
              : styles.container_center
          }
      >
        <ImageBackground
          source={{ uri: recipe.imageUrl }}
          imageStyle={{ borderRadius: entryBorderRadius }}
          style={[
            styles.slideInnerContainer,
            {
              shadowOpacity: this.state.loaded ? 0.4 : 0.1,
              backgroundColor: this.state.loaded
                ? "transparent"
                : theme.colors.lightGray
            }
          ]}
          onLoad={this._onLoad}
        >
          <View
            style={[
              styles.textContainer,
              {
                backgroundColor: this.state.loaded
                  ? theme.scheme.crusta
                  : "#d9d9d9"
              }
            ]}
          >
            <Text
              style={[
                styles.title,
                {
                  display: this.state.loaded ? "flex" : "none"
                }
              ]}
              numberOfLines={2}
            >
              {/* {recipe.name} */}
              {moment().isoWeekday(start+1+index).format('dddd')}
            </Text>
            {/* <Text
              style={[
                styles.subtitle,
                {
                  display: this.state.loaded ? "flex" : "none"
                }
              ]}
              numberOfLines={2}
            >
              Preparation time: {recipe.readyInTime} mins
            </Text> */}
          </View>
        </ImageBackground>
       </TouchableOpacity>
        )
            })}
        </View>

    );
  }
}

const styles = StyleSheet.create({
  slideInnerContainer: {
    width: slideWidth,
    height: slideHeight,
    marginHorizontal: itemHorizontalMargin,
    paddingBottom: itemHorizontalMargin,
    shadowColor: "#6b6b6b",
    shadowOffset: { width: 0, height: 1 },
    borderRadius: entryBorderRadius,
    shadowOpacity: 0.4,
    shadowRadius: 4,
    justifyContent: "flex-end"
  },
  textContainer: {
    justifyContent: "center",
    textAlign: 'center',
    paddingTop: 20 - entryBorderRadius,
    // height: 100,
    paddingBottom: 10,
    paddingHorizontal: 7,
    marginHorizontal: wp(2),
    backgroundColor: theme.scheme.crusta,
    borderRadius: entryBorderRadius
  },
  title: {
    fontSize: 12,
    fontWeight: "700",
    textAlign: 'center',
    color: theme.colors.white
  },
  subtitle: {
    marginTop: 2,
    fontSize: 15,
    color: theme.colors.white
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
});
