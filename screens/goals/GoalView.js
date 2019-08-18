import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Animated,
  Alert
} from "react-native";
import TransitionView from "../../components/TransitionView";
import * as theme from "../../theme";
import Icon from "react-native-vector-icons/Ionicons";
import { getInset } from "react-native-safe-area-view";
import { NavigationActions } from "react-navigation";
import { Button } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import * as goalTypes from "../../components/goals/GoalTypes";
import * as firebase from "firebase";
import { dispatch, connect } from "../../store";

import "firebase/firestore";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers
} from "react-native-popup-menu";

import * as categoryTypes from "../../components/goals/CategoryTypes";
import GoalProgressBar from "../../components/goals/GoalProgressBar";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
const mapStateToProps = state => ({
  user: state.user,
  colors: state.colors
});
const IS_IOS = Platform.OS === "ios";
function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
const backdrop = [
  require("../../assets/images/general_back.png"),
  require("../../assets/images/leisure_back.png"),
  require("../../assets/images/personal_back.png"),
  require("../../assets/images/save_back.png"),
  require("../../assets/images/wellbeing_back.png"),
  require("../../assets/images/goal_back.png")
];
const slideHeight = viewportHeight * 0.15;
const TOP_SAFE_AREA = Platform.OS === "ios" ? getInset("top") : 40;
const BOTTOM_SAFE_AREA = Platform.OS === "ios" ? getInset("bottom") : 40;
const slideWidth = wp(85);
const itemHorizontalMargin = wp(2);
const HEADER_MAX_HEIGHT = 400;
const HEADER_MIN_HEIGHT = Platform.OS === "ios" ? 250 : 250;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const DATE_OPTIONS = { weekday: "long", month: "long", day: "numeric" };
export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;
class GoalView extends Component {
  mounted = false;
  db = firebase.firestore();
  constructor(props) {
    super();
    this.state = {
      scrollY: new Animated.Value(0),
      scrollOp: 1,
      period: "month",
      daysRemain: 0,
      spent: 0
    };
    this.props = props;
  }
  periodOnPress(event, buttonId) {
    // console.log(this.state.period);
    this.setState({ period: buttonId });
  }

  goalProgressValue = progress => {
    if (this.mounted) {
      this.setState({ daysRemain: progress[0], spent: progress[1] });
    }
  };

  _renderScrollViewContent() {
    const data = Array.from({ length: 30 });
    return (
      <View style={styles.scrollViewContent}>
        {data.map((_, i) => (
          <TransitionView style={styles.row} index={i} key={i}>
            {/* <View key={i} style={styles.row}> */}
            <Text>{i}</Text>
            {/* </View> */}
          </TransitionView>
        ))}
      </View>
    );
  }
  componentWillMount() {
    this.mounted = true;
    this.startHeaderHeight = 80;
    if (Platform.OS == "android") {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
    }
  }
  handleDelete(id) {
    Alert.alert(
      "Goal Delete",
      "Are you sure you want to delete this goal?",
      [
        {
          text: "Delete",
          onPress: () => {
            console.log("delete");
            this.db
              .collection("users")
              .doc(this.props.user.uid)
              .collection("goals")
              .doc(id)
              .delete()
              .then(() => {
                this._menu.close();
                this.props.navigation.dispatch(NavigationActions.back());
              })
              .catch(e => console.log("failed to delete " + e));
          }
        },
        {
          text: "Cancel",
          onPress: () => {
            console.log("Cancel Pressed");
            this._menu.close();
          },
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  }

  render() {
    const { navigation } = this.props;
    // const { navigation } = this.props;
    const back = backdrop[Math.floor(Math.random() * backdrop.length)];
    const title = navigation.getParam("title", "Goal");
    const id = navigation.getParam("id", "");
    const date = navigation.getParam("date", "");
    const type = navigation.getParam("type", "");
    const category = navigation.getParam("category", "Goal");
    const value = navigation.getParam("value", "0");
    const period = navigation.getParam("period", "");
    const day = new Date(date);
    console.log(this.props.title);
    return (
      <View style={styles.fill}>
        <StatusBar hidden={true} />
        <Menu ref={c => (this._menu = c)} renderer={renderers.SlideInMenu}>
          <MenuTrigger />
          <MenuOptions
            style={{ height: viewportHeight / 8 }}
            optionsContainerStyle={{
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              // overflow: "hidden",
              backgroundColor: theme.colors.white,
              shadowColor: "black",
              shadowOpacity: 0.2,
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: 5,
              elevation: 1
            }}
          >
            <MenuOption>
              <View
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  justifyContent: "center",
                  top: viewportHeight / 35,
                  // paddingBottom: 20,
                  alignItems: "center",
                  alignSelf: "center"
                }}
              >
                <Button
                  titleStyle={{ fontWeight: "600", fontSize: 12 }}
                  buttonStyle={{
                    borderRadius: 12,
                    width: viewportWidth - 40,
                    height: viewportHeight / 16,
                    backgroundColor:
                      category != null
                        ? categoryTypes.categoryColors[category]
                        : "#FAA3c6"
                  }}
                  title="delete"
                  onPress={() => this.handleDelete(id)}
                />
              </View>
            </MenuOption>
          </MenuOptions>
        </Menu>

        <TouchableOpacity
          onPress={() => {
            this.setState({ scrollOp: 0 });
            this.props.navigation.dispatch(NavigationActions.back());
          }}
          style={{
            position: "absolute",
            right: 25,
            top: 25,
            zIndex: 999
          }}
        >
          <Icon name="ios-close-circle" size={36} color={theme.colors.white} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this._menu.open();
          }}
          style={{
            position: "absolute",
            left: 25,
            top: 25,
            zIndex: 999
          }}
        >
          <Icon name="ios-more" size={36} color={theme.colors.white} />
        </TouchableOpacity>

        {/* <LinearGradient  style={{flex: 1, alignItems:'center', alignContent: 'center',flexDirection:'column'}} colors={["#F6699A", "#FF7DAA"]} start={[0.3,0]} end={[0.8,0]} > */}

        {/* <Text style={styles.title}>{title}</Text> */}
        {/* </LinearGradient> */}
        <ImageBackground
          source={back}
          style={{
            flex: 1,
            alignItems: "center",
            alignContent: "center",
            flexDirection: "column"
          }}
          imageStyle={{ resizeMode: "repeat" }}
        />
        <View style={styles.scrollOver}>
          <ScrollView
            borderRadius={10}
            style={{
              overflow: "hidden",
              position: "relative",
              borderRadius: 10,
              backgroundColor: "transparent"
            }}
          >
            {/* {this._renderScrollViewContent()} */}
            <View
              style={{
                flexDirection: "row",
                marginTop: 30,
                marginLeft: 30,
                // flex: 1,
                alignItems: "center"
              }}
            >
              <Icon
                name={"ios-square"}
                size={30}
                color={
                  category != null
                    ? categoryTypes.categoryColors[category]
                    : "#FAA3c6"
                }
              />
              <View
                style={{ flexDirection: "column", marginLeft: 15, flex: 1 }}
              >
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.date}>
                  {" "}
                  {new Date(date)
                    .toLocaleDateString("en-NZ", DATE_OPTIONS)
                    .toString()}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 30,
                left: 30,
                alignItems: "center"
              }}
            >
              <Icon
                name={
                  category != null
                    ? categoryTypes.categoryIcons[category]
                    : "ios-rocket"
                }
                size={30}
                color={theme.colors.inactive}
              />
              <Text style={[styles.date, { left: 15, top: 5 }]}>
                {category != null
                  ? category.charAt(0).toUpperCase() +
                    category.slice(1) +
                    " goal"
                  : "General goal"}
              </Text>
            </View>
            {category != null ? (
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 30,
                  // marginLeft: 30,
                  // flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <GoalProgressBar
                  onSlide={this.sliderValue}
                  data={{
                    category: category,
                    value: value,
                    period: period,
                    date: date
                  }}
                  color={
                    category != null
                      ? categoryTypes.categoryColors[category]
                      : "#FAA3c6"
                  }
                  goalProgress={this.goalProgressValue}
                />
              </View>
            ) : null}
          </ScrollView>
        </View>
      </View>
    );
  }
}
export default connect(mapStateToProps)(GoalView);

const styles = StyleSheet.create({
  fill: {
    flex: 1
  },
  scrollOver: {
    width: viewportWidth,
    height: viewportHeight / 1.3,
    bottom: 0,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    shadowColor: "#6b6b6b",
    shadowOffset: {
      width: 0,
      height: -1
    },
    position: "absolute",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 1,
    // overflow: 'hidden',
    zIndex: 10000,
    backgroundColor: "white"
  },
  toggleFill: {
    height: 5,
    backgroundColor: "#FFF",
    margin: 4,
    borderColor: "#FFF"
  },
  toggleEmpty: {
    height: 5,
    backgroundColor: "transparent",
    margin: 4,
    borderColor: "#FFF"
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    overflow: "hidden",
    height: HEADER_MAX_HEIGHT
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: "cover"
  },
  bar: {
    backgroundColor: "transparent",
    marginTop: Platform.OS === "ios" ? 40 : 38,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
  },
  title2: {
    color: "white",
    fontSize: 18
  },
  scrollViewContent: {
    // marginTop: HEADER_MAX_HEIGHT
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: "#D3D3D3",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    color: theme.colors.gray,
    flexShrink: 1,
    flexWrap: "wrap",
    fontSize: 30,
    fontWeight: "500",
    alignContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    textAlign: "left",
    letterSpacing: 0.5,
    // textAlignVertical: 'center',
    left: 0
  },
  date: {
    color: theme.colors.gray,
    fontSize: 18,
    fontWeight: "400",
    alignContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    textAlign: "left",
    letterSpacing: 0.5,
    // textAlignVertical: 'center',
    left: 1
  },
  menu: {
    bottom: BOTTOM_SAFE_AREA
  },

  // title: {
  //   fontSize: theme.sizes.title,
  //   fontWeight: "800",
  //   color: theme.colors.gray
  // },
  imageContainer: {
    flex: 1,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    // backgroundColor: 'blue',
    overflow: "hidden"
    // borderTopLeftRadius: 12,
    // borderBottomLeftRadius: 12
  }
});
