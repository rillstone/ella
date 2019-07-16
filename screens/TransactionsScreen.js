import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Platform,
  StatusBar,
  Dimensions,
  Animated
} from "react-native";
import * as theme from "../theme";
import payments from "../assets/payments.json";

import Transaction from "../components/Transaction";
import { sliderWidth, itemWidth } from "../styles/SliderEntry.style";
import { ScrollView } from "react-native-gesture-handler";
import AnimateNumber from "react-native-countup";
import { Paragraph } from "rn-placeholder";
import { StackedAreaChart } from "react-native-svg-charts";
import * as shape from "d3-shape";
import * as Animatable from "react-native-animatable";
import { Defs, LinearGradient, Stop } from "react-native-svg";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
const IS_IOS = Platform.OS === "ios";
const HEADER_MAX_HEIGHT = 150;
const HEADER_MIN_HEIGHT = Platform.OS === "ios" ? 120 : 120;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
class TransactionsScreen extends Component {
  mounted = false;
  constructor(props) {
    super();
    this.state = {
      errors: [],
      transactions: [],
      loading: false,
      data: [],
      scroll: false,
      scrollY: new Animated.Value(0)
    };
    this.props = props;
    this.onScrollTop = this.onScrollTop.bind(this);

    this.sum = 0;
    this.transactionState("Leisure");
  }

  componentWillMount() {
    this.mounted = true;
    this.startHeaderHeight = 80;
    if (Platform.OS == "android") {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
    }
  }
  onScrollTop = ({ layoutMeasurement, contentOffset, contentSize }) => {
    console.log(contentOffset.y);
    console.log(viewportHeight - 150);

    if (contentOffset.y == 103) {
      console.log("top");
      this.setState({
        scroll: true
      });
    }
  };
  componentDidMount() {
    this.transactionState("Leisure");
    setTimeout(() => this.setState({ loading: true }), 1000);
  }

  transactionState(transaction_cat) {
    if (this.mounted) {
      this.setState({
        transactions: this.transactionData(transaction_cat)
      });
    }
  }

  transactionData(transaction_cat) {
    return payments[transaction_cat].map(
      (tr, i) => (
        (this.sum += tr.amount),
        <Transaction data={tr} key={tr._id} index={i} />
      )
    );
  }

  render() {
    const headerTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE * 5],
      outputRange: [0, -HEADER_SCROLL_DISTANCE * 2],
      extrapolate: "clamp"
    });
    const inputTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, HEADER_SCROLL_DISTANCE - 20],
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
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.back }}>
        <StatusBar barStyle="light-content" />

        <ImageBackground
          imageStyle={{ resizeMode: "stretch" }}
          source={require("../assets/images/tran_screen_back.png")}
          style={[styles.header]}
        >
          <Animated.View
            style={{
              transform: [{ translateY: inputTranslate }]
            }}
          >
            {/* <View style={styles.titleContain}>
              <Text style={styles.subtitle}>Total spendings</Text>
              <AnimateNumber
                style={styles.title}
                value={397.4}
                formatter={val => {
                  return "$" + val.toFixed(2);
                }}
              />
              <Text style={styles.microtitle}> - $12.94 today</Text>
            </View> */}
          </Animated.View>
        </ImageBackground>
        <View style={{ flex: 0.2 }} />
        <Animated.ScrollView
          style={[styles.fill]}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true }
          )}
        >
          {/* {this._renderScrollViewContent()} */}
          <View
            style={{
              borderTopLeftRadius: 12,
              backgroundColor: theme.colors.back,
              borderTopRightRadius: 12,
              overflow: "hidden",
              marginTop: HEADER_SCROLL_DISTANCE * 5
            }}
          >
            <View
              style={{
                marginVertical: 10,
                marginHorizontal: 20,
                marginTop: 20
              }}
            >
              <Paragraph
                style={{ left: 20, top: 20 }}
                animation="fade"
                lineNumber={3}
                textSize={16}
                color="#DAD7D7"
                width="80%"
                lastLineWidth="70%"
                firstLineWidth="50%"
                isReady={this.state.loading}
              >
                <View
                  style={{
                    marginHorizontal:20,
                    marginVertical: 20,
                    height: viewportWidth/1.5,
                    borderRadius: 12,
                    width: viewportWidth - 40,
                    alignSelf:"center",
                    backgroundColor: theme.colors.back,
                    shadowColor: "black",
                    shadowOffset: {
                      width: 0,
                      height: -1
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                    elevation: 1
                  }}
                />
                <Text style={{fontSize: theme.sizes.subtitle, color: theme.colors.gray, fontWeight: '800'}}>Today</Text>
                {this.state.transactions}
              </Paragraph>
              <Paragraph
                style={{ left: 20, top: 45 }}
                animation="fade"
                lineNumber={3}
                textSize={16}
                color="#DAD7D7"
                width="80%"
                lastLineWidth="90%"
                firstLineWidth="10%"
                isReady={this.state.loading}
              >
                {null}
              </Paragraph>
              <Paragraph
                style={{ left: 20, top: 70 }}
                animation="fade"
                lineNumber={3}
                textSize={16}
                color="#DAD7D7"
                width="80%"
                lastLineWidth="50%"
                firstLineWidth="30%"
                isReady={this.state.loading}
              >
                {null}
              </Paragraph>
            </View>
          </View>
        </Animated.ScrollView>
      </SafeAreaView>
    );
  }
}
export default TransactionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6f5f7"
  },
  fill: {
    flex: 1,
    // top:0,
    // top: HEADER_SCROLL_DISTANCE * 5,
    bottom: 0,
    backgroundColor: "transparent",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: "hidden",
    height: viewportHeight
    // marginTop: HEADER_MAX_HEIGHT
  },
  margin: {
    flex: 0.3,
    backgroundColor: "blue"
    // marginTop: HEADER_MAX_HEIGHT
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
  image: {
    // resizeMode: 'cover',
    flex: 1,
    height: undefined,
    width: undefined
  },
  titleContain: {
    alignContent: "center",
    alignSelf: "center",
    top: 20
  },
  cardContainer: {
    backgroundColor: "grey",
    height: 100,
    borderRadius: 7
  },
  title: {
    fontSize: theme.sizes.title,
    fontWeight: "800",
    color: theme.colors.back
  },
  subtitle: {
    fontSize: theme.sizes.subtitle,
    fontWeight: "700",
    color: theme.colors.back
  },
  subtitle_two: {
    fontSize: theme.sizes.subtitle_two,
    fontWeight: "600",
    color: theme.colors.gray
  },
  microtitle: {
    fontSize: theme.sizes.microsub,
    fontWeight: "600",
    color: theme.scheme.sunglow
  },
  slider: {
    marginTop: 15,
    overflow: "visible" // for custom animations
  },
  header: {
    position: "absolute",
    // flex:0.5,
    // alignSelf: 'center',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    overflow: "visible",
    height: viewportHeight / 3
    // borderBottomWidth: 0.5,
    // borderColor: "#00000020"
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
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 0
  }
});
