import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
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
 onScrollTop = ({layoutMeasurement, contentOffset, contentSize}) => {
    console.log(contentOffset.y)
    console.log(viewportHeight - 150)

    if(contentOffset.y == 103) {
        console.log('top')
        this.setState({
            scroll:true
        })
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
    const axesSvg = { fontSize: 10 };
    const xAxisHeight = 30;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.scheme.crusta }}>
        {/* <View
          style={{
            // position: "absolute",
            flex:1,
            height: viewportHeight / 3,
            backgroundColor:'blue',
            top: 20,
            width: sliderWidth
          }}
        >
    

          <Image source={ this.state.graph} style={styles.image} />
        </View> */}
        <View
          style={{
            flex: 1.3,
            height: viewportHeight / 4,
            backgroundColor: theme.scheme.crusta,
            position: "absolute"
          }}
        >
          <View style={styles.titleContain}>
            <Text style={styles.subtitle}>Total spendings</Text>
            <AnimateNumber
              style={styles.title}
              value={397.4}
              formatter={val => {
                return "$" + val.toFixed(2);
              }}
            />
            <Text style={styles.microtitle}> - $12.94 today</Text>
          </View>
        </View>

        <View style={{ flex: 4 }}>
          <Animated.ScrollView
            style={{ flex:1 }}
              bounces={false}
              onScroll={({nativeEvent}) => {
               this.onScrollTop(nativeEvent)
              }}
              scrollEventThrottle={400}
          >
            <Animatable.View
              animation={"fadeInUpBig"}
              duration={700}
              delay={1000}
              useNativeDriver
              style={{
                marginTop: viewportHeight / 4,
                height: viewportHeight - 150,
                backgroundColor: theme.colors.back,
                borderTopRightRadius: 17,
                borderTopLeftRadius: 17
              }}
            >
                <Animated.ScrollView
            style={{ flex: 1 }}
            scrollEnabled={this.state.scroll}

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
            </Animated.ScrollView>
            </Animatable.View>
          </Animated.ScrollView>
        </View>
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
  image: {
    // resizeMode: 'cover',
    flex: 1,
    height: undefined,
    width: undefined
  },
  titleContain: {
    paddingLeft: 20,
    paddingTop: 30,
    flex: 1
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
