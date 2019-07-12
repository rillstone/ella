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
  Animated
} from "react-native";
import TransitionView from "../components/TransitionView";
import * as theme from "../theme";
import Icon from "react-native-vector-icons/Ionicons";
import { getInset } from "react-native-safe-area-view";
import { NavigationActions } from "react-navigation";
import { LinearGradient } from "expo-linear-gradient";
import * as goalTypes from "../components/GoalTypes";
import * as shape from "d3-shape";
import { LineChart, Grid, AreaChart } from "react-native-svg-charts";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers
} from 'react-native-popup-menu';

import * as categoryTypes from "../components/CategoryTypes";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
const IS_IOS = Platform.OS === "ios";
function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
const backdrop = [require("../assets/images/general_back.png"), require("../assets/images/leisure_back.png"),require("../assets/images/personal_back.png"),require("../assets/images/save_back.png"),require("../assets/images/wellbeing_back.png"), require("../assets/images/goal_back.png")];
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
class OverviewChartView extends Component {
  mounted = false;
  constructor(props) {
    super();
    this.state = {
      scrollY: new Animated.Value(0),
      scrollOp: 1,
      period: "month"
    };
    this.props = props;
  }
  periodOnPress(event, buttonId) {
    console.log(this.state.period);
    this.setState({ period: buttonId });
  }

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

  render() {
    const { navigation } = this.props;
    // const { navigation } = this.props;
    const data = navigation.getParam("data", []);
    const colors = navigation.getParam("colors", [theme.scheme.wedgewood, theme.scheme.bermuda_gray]);
    const title = navigation.getParam("title", "Spending");

    console.log(this.props.title);
    return (
      <View style={styles.fill}>
        <StatusBar hidden={true} />
        <Menu ref={c => (this._menu = c)} renderer={renderers.SlideInMenu}>
        <MenuTrigger />
          <MenuOptions>
            <MenuOption text="Save" />
            <MenuOption>
              <Text style={{ color: "red" }}>Delete</Text>
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
            this._menu.open()
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
        <View
          // source={back}
          style={{
            flex: 1,
            alignItems: "center",
            alignContent: "center",
            backgroundColor: colors[0],
            flexDirection: "column"
          }}
          // imageStyle={{ resizeMode: "repeat" }}
        >
          {this.dataChange(data, title)}
          <AreaChart
              style={{
                // height: viewportWidth / 2.5 + 2

                width: viewportWidth,
                height: viewportHeight/4
              }}
              curve={shape.curveNatural}
              data={data}
              gridMax={56}
              contentInset={{ top: TOP_SAFE_AREA, bottom: 40 }}
              svg={{ fill: colors[1] }}
            />
        </View>
        <View style={styles.scrollOver}>
          <ScrollView
            borderRadius={10}
            style={{
              overflow: "hidden",
              elevation: 1,
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
                left: 30,
                alignItems: "center"
              }}
            >
             
              <View style={{ flexDirection: "column", left: 15 }}>
                <Text style={styles.title}>{title}</Text>
              
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
              

            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
export default OverviewChartView;

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
    shadowColor: "black",
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
  menu:{
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
  },
  chartInfo: {
    position: "absolute",
    zIndex: 999,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    top: TOP_SAFE_AREA
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
