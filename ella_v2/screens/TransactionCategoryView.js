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
import { Button, ButtonProps } from "react-native-ui-kitten";
import { Defs, LinearGradient, Stop } from "react-native-svg";
import { LineChart, Grid } from "react-native-svg-charts";
import * as shape from "d3-shape";
import * as theme from "../theme";
import Icon from "react-native-vector-icons/Ionicons";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
const IS_IOS = Platform.OS === "ios";
function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.15;
const slideWidth = wp(85);
const itemHorizontalMargin = wp(2);
const HEADER_MAX_HEIGHT = 400;
const HEADER_MIN_HEIGHT = Platform.OS === "ios" ? 250 : 250;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;
class TransactionCategoryView extends Component {
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

  _renderScrollViewContent() {
    const data = Array.from({ length: 30 });
    return (
      <View style={styles.scrollViewContent}>
        {data.map((_, i) => (
          <View key={i} style={styles.row}>
            <Text>{i}</Text>
          </View>
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
    const data2 = [1, 1, 1, 1, 1, 1];
    const Gradient = () => (
      <Defs key={"gradient"}>
        <LinearGradient id={"gradient"} x1={"0"} y={"0%"} x2={"100%"} y2={"0%"}>
          <Stop offset={"0%"} stopColor={"#FCE38A"} />
          <Stop offset={"100%"} stopColor={"#F38181"} />
        </LinearGradient>
      </Defs>
    );

    const { navigation } = this.props;
    const chartPeriod = "Month";
    const data = navigation.getParam(
      "data",
      require("../assets/images/default_back.jpg")
    );
    const chartColor = navigation.getParam("chartColor", "#FFF");
    const lineData = navigation.getParam("lineD", data2);
    const textColor = navigation.getParam("fontColor", chartColor);
    const headerTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: "clamp"
    });
    const chartTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, HEADER_SCROLL_DISTANCE * 0.6],
      extrapolate: "clamp"
    });

    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: "clamp"
    });
    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: "clamp"
    });

    const titleScale = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0.8],
      extrapolate: "clamp"
    });
    const titleTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, -8],
      extrapolate: "clamp"
    });
    return (
      <View style={styles.fill}>
        <StatusBar hidden={true} />
        <TouchableOpacity
          onPress={() => {
            this.setState({ scrollOp: 0 });
            this.props.navigation.navigate("TransactionsScreen");
          }}
          style={{
            position: "absolute",
            right: 25,
            top: 25,
            zIndex: 999
          }}
        >
          <Icon name="ios-close-circle" size={36} color="#FFF" />
        </TouchableOpacity>
        <Animated.ScrollView
          style={styles.fill}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true }
          )}
        >
          {this._renderScrollViewContent()}
        </Animated.ScrollView>
        <Animated.View
          style={[
            styles.header,
            { transform: [{ translateY: headerTranslate }] }
          ]}
        >
          <Animated.Image
            style={[
              styles.backgroundImage,
              {
                opacity: this.state.scrollOp,
                transform: [{ translateY: imageTranslate }]
              }
            ]}
            source={data}
          />
          <Animated.View
            style={[{ transform: [{ translateY: chartTranslate }] }]}
          >
            <LineChart
              style={{ height: 200, top: 100 }}
              data={
                this.state.period === "week"
                  ? lineData.slice(Math.max(lineData.length - 7, 1))
                  : lineData
              }
              showGrid={"false"}
              curve={shape.curveNatural}
              contentInset={{ top: 20, bottom: 20 }}
              animate
              svg={{
                strokeWidth: 3,
                stroke: "#FFF",
                onPress: (a, b, c) => console.log(a, b, c)
              }}
            >
              <Gradient />
            </LineChart>
            <Animated.View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                top: HEADER_MAX_HEIGHT / 3
              }}
            >
              <Button
                appearance={
                  this.state.period === "month" ? "filled" : "outline"
                }
                size={"small"}
                textStyle={
                  this.state.period === "month"
                    ? { color: textColor }
                    : { color: "#FFF" }
                }
                onPress={event => this.periodOnPress(event, "month")}
                style={
                  this.state.period === "month"
                    ? styles.toggleFill
                    : styles.toggleEmpty
                }
              >
                Month
              </Button>
              <Button
                appearance={this.state.period == "week" ? "filled" : "outline"}
                size={"small"}
                textStyle={
                  this.state.period === "week"
                    ? { color: textColor }
                    : { color: "#FFF" }
                }
                onPress={event => this.periodOnPress(event, "week")}
                style={
                  this.state.period === "week"
                    ? styles.toggleFill
                    : styles.toggleEmpty
                }
              >
                Week
              </Button>
            </Animated.View>
          </Animated.View>
        </Animated.View>
        <Animated.View
          style={[
            styles.bar,
            {
              transform: [{ scale: titleScale }, { translateY: titleTranslate }]
            }
          ]}
        >
          {/* <Text style={styles.title2}>Title</Text> */}
        </Animated.View>
      </View>
    );
  }
}
export default TransactionCategoryView;

const styles = StyleSheet.create({
  fill: {
    flex: 1
  },
  content: {
    flex: 1
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
    marginTop: HEADER_MAX_HEIGHT
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: "#D3D3D3",
    alignItems: "center",
    justifyContent: "center"
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6f5f7"
  },
  titleContain: {
    paddingLeft: 20,
    paddingTop: 20,
    flex: 1
  },
  slideInnerContainer: {
    width: viewportWidth,
    height: 200,
    // paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 18,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 1
  },
  image: {
    // resizeMode: 'cover',
    flex: 1,
    height: undefined,
    width: undefined,
    // borderRadius: IS_IOS ? 12 : 0,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12
  },
  title: {
    color: "#1E2127",
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 0.5
  },
  subtitle: {
    marginTop: 2,
    color: "#1E2127",
    fontSize: 16,
    fontWeight: "500"
  },

  cardContainer: {
    backgroundColor: "grey",
    height: 100,
    borderRadius: 7
  },
  textContainer: {
    justifyContent: "center",
    flex: 2,
    paddingTop: 20 - 12,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: "white"
    // borderTopRightRadius: 12,
    // borderBottomRightRadius: 12
  },
  title: {
    fontSize: theme.sizes.title,
    fontWeight: "800",
    color: theme.colors.gray
  },
  imageContainer: {
    flex: 1,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    // backgroundColor: 'blue',
    overflow: "hidden"
    // borderTopLeftRadius: 12,
    // borderBottomLeftRadius: 12
  },
  subtitle: {
    fontSize: theme.sizes.subtitle,
    fontWeight: "700",
    color: theme.colors.gray
  },
  subtitle_two: {
    fontSize: theme.sizes.subtitle_two,
    fontWeight: "600",
    color: theme.colors.gray
  },
  microtitle: {
    fontSize: theme.sizes.microsub,
    fontWeight: "600",
    color: theme.colors.warn
  },
  slider: {
    marginTop: 15,
    overflow: "visible" // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10 // for custom animation
  },
  paginationContainer: {
    paddingVertical: 8
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8
  },
  balanceCont2: {
    // position: 'absolute',

    // flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: 20,
    right: 20,
    bottom: 0
    // backgroundColor: 'yellow',
    // flex: 5
    // height: 90,
  },
  balance2: {
    // flexDirection: 'column',
    // position: 'relative',
    borderRadius: theme.sizes.radius,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    // bottom: 0,
    // left: 0,
    // top: 15,

    height: 70
    // marginBottom: 10
  },
  shadow: {
    position: "absolute",
    top: 0,
    left: itemHorizontalMargin,
    right: itemHorizontalMargin,
    bottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    borderRadius: 12
  }
});
