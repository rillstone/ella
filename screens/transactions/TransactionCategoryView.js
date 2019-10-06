import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Animated,
  Button
} from "react-native";
// import { Button, ButtonProps } from "react-native-ui-kitten";
import { Defs, LinearGradient, Stop } from "react-native-svg";
import TransitionView from '../../components/TransitionView';
import { LineChart, Grid } from "react-native-svg-charts";
import * as shape from "d3-shape";
import * as theme from "../../theme";
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
          <TransitionView style={styles.row} index={i} key={i} >
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
      require("../../assets/images/default_back.jpg")
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
  title: {
    color: "#1E2127",
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 0.5
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
  }
});
