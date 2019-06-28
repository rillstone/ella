import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions
} from "react-native";
import * as theme from "../theme";
import payments from "../assets/payments.json";
import Icon from "react-native-vector-icons/Ionicons";
import Carousel from "react-native-snap-carousel";
import SliderEntry from "../components/SliderEntry";
import { sliderWidth, itemWidth } from "../styles/SliderEntry.style";
import { ScrollView } from "react-native-gesture-handler";
import AnimateNumber from "react-native-countup";
import { Paragraph } from "rn-placeholder";
import { StackedAreaChart, YAxis, Grid } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { Defs, LinearGradient, Stop } from "react-native-svg";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
const DATE_OPTIONS = { weekday: "short", month: "short", day: "numeric" };
const Gradient = ({ index }) => (
  <Defs key={index}>
    <LinearGradient id={"gradient"} x1={"0%"} y={"0%"} x2={"0%"} y2={"100%"}>
      <Stop offset={"0%"} stopColor={"#D7D8DC"} stopOpacity={1} />
      <Stop offset={"100%"} stopColor={"#DFE0E4"} stopOpacity={0} />
    </LinearGradient>
  </Defs>
);
class Overview extends Component {
  mounted = false;
  constructor(props) {
    super();
    this.state = {
      errors: [],
      transactions: [],
      loading: false,
      data: [],
      colors: ["url(#gradient)", "#CBCCCF"],
      keys: ["current", "average"]
    };
    this.props = props;

    this._carousel = {};
    this.init();
    this.sum = 0;
    this.transactionState("Leisure");
  }

  init() {
    this.state = {
      categories: [
        {
          id: "WpIAc9by5iU",
          title: "Transport",
          subtitle: "~$25.99 per month",
          image: require("../assets/images/transport_icon.jpg"),
          graph: require("../assets/images/graph6.png"),
          back: require("../assets/images/transport_back.jpg"),
          color: "#F64ea2",
          textColor: "#F38181",
          data: [
            {
              month: new Date(2015, 0, 1),
              current: 3840,
              average: 1920
            },
            {
              month: new Date(2015, 1, 1),
              current: 1600,
              average: 1440
            },
            {
              month: new Date(2015, 2, 1),
              current: 640,
              average: 960
            },
            {
              month: new Date(2015, 3, 1),
              current: 3320,
              average: 480
            },
            {
              month: new Date(2015, 4, 1),
              current: 100,
              average: 4830
            },
            {
              month: new Date(2015, 5, 1),
              current: 2320,
              average: 680
            }
          ],
          colors: ["url(#gradient)", "#CBCCCF"],
          keys: ["current", "average"],
          lineData: [38, 20, 16, 10, 6, 15, 33, 10, 1, 10, 15, 23]
        },
        {
          id: "sNPnbI1arSE",
          title: "Leisure",
          subtitle: "~$32.49 per month",
          image: require("../assets/images/game_icon.jpg"),
          graph: require("../assets/images/graph5.png"),
          back: require("../assets/images/entertainment_back.jpg"),
          color: "#FCE38A",
          textColor: "#FF7676",
          data: [
            {
              month: new Date(2015, 0, 1),
              current: 500,
              average: 400
            },
            {
              month: new Date(2015, 1, 1),
              current: 600,
              average: 1000
            },
            {
              month: new Date(2015, 2, 1),
              current: 1000,
              average: 2000
            },
            {
              month: new Date(2015, 3, 1),
              current: 1500,
              average: 1200
            },
            {
              month: new Date(2015, 4, 1),
              current: 2000,
              average: 2300
            },
            {
              month: new Date(2015, 5, 1),
              current: 800,
              average: 100
            }
          ],
          colors: ["url(#gradient)", "#CBCCCF"],
          keys: ["current", "average"],
          lineData: [5, 5, 6, 8, 10, 13, 15, 18, 20, 10, 8, 7]
        },
        {
          id: "VOgFZfRVaww",
          title: "Food",
          subtitle: "~$10.39 per month",
          image: require("../assets/images/food_icon.jpg"),
          graph: require("../assets/images/graph4.png"),
          back: require("../assets/images/food_back.jpg"),
          color: "#A8F7FF",
          textColor: "#6078ea",
          data: [
            {
              month: new Date(2015, 0, 1),
              current: 640,
              average: 920
            },
            {
              month: new Date(2015, 1, 1),
              current: 800,
              average: 140
            },
            {
              month: new Date(2015, 2, 1),
              current: 640,
              average: 960
            },
            {
              month: new Date(2015, 3, 1),
              current: 920,
              average: 480
            },
            {
              month: new Date(2015, 4, 1),
              current: 100,
              average: 830
            },
            {
              month: new Date(2015, 5, 1),
              current: 320,
              average: 680
            }
          ],
          colors: ["url(#gradient)", "#CBCCCF"],
          keys: ["current", "average"],
          lineData: [6, 7, 8, 7, 6, 8, 9, 5, 1, 2, 2, 3]
        },
        {
          id: "VOgXXfRVaww",
          title: "Bills",
          subtitle: "~$100.39 per month",
          image: require("../assets/images/bill_icon.jpg"),
          graph: require("../assets/images/graph6.png"),
          back: require("../assets/images/bill_back.jpg"),
          color: "#184e68",
          textColor: "#3bb2b8",
          data: [
            {
              month: new Date(2015, 0, 1),
              current: 500,
              average: 400
            },
            {
              month: new Date(2015, 1, 1),
              current: 600,
              average: 1000
            },
            {
              month: new Date(2015, 2, 1),
              current: 1000,
              average: 2000
            },
            {
              month: new Date(2015, 3, 1),
              current: 1500,
              average: 1200
            },
            {
              month: new Date(2015, 4, 1),
              current: 2000,
              average: 2300
            },
            {
              month: new Date(2015, 5, 1),
              current: 800,
              average: 100
            }
          ],
          colors: ["url(#gradient)", "#CBCCCF"],
          keys: ["current", "average"],
          lineData: [5, 6, 7, 8, 9, 10, 14, 15, 17, 20, 10, 8]
        },
        {
          id: "VOgYYfRVaww",
          title: "Clothing",
          subtitle: "~$25.39 per month",
          image: require("../assets/images/clothes_icon.jpg"),
          graph: require("../assets/images/graph4.png"),
          back: require("../assets/images/clothes_back.jpg"),
          color: "#17ead9",
          textColor: "#6094ea",
          data: [
            {
              month: new Date(2015, 0, 1),
              current: 140,
              average: 120
            },
            {
              month: new Date(2015, 1, 1),
              current: 600,
              average: 140
            },
            {
              month: new Date(2015, 2, 1),
              current: 640,
              average: 260
            },
            {
              month: new Date(2015, 3, 1),
              current: 320,
              average: 50
            },
            {
              month: new Date(2015, 4, 1),
              current: 1000,
              average: 330
            },
            {
              month: new Date(2015, 5, 1),
              current: 220,
              average: 680
            }
          ],
          colors: ["url(#gradient)", "#CBCCCF"],
          keys: ["current", "average"],
          lineData: [1, 4, 6, 6, 5, 3, 4, 6, 10, 5, 3, 2]
        }
      ],
      transactions: [],
      spendings: 0,
      data: [],
      colors: ["url(#gradient)", "#CBCCCF"],
      keys: ["current", "average"]
    };

    // console.log("ThumbnailCarousel Props: ", this.props)
  }

  _renderItem({ item, index }) {
    return <SliderEntry navigation={this.props.navigation} data={item} />;
  }

  componentWillMount() {
    this.mounted = true;
    this.startHeaderHeight = 80;
    if (Platform.OS == "android") {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
    }
  }

  componentDidMount() {
    this.transactionState("Leisure");
    setTimeout(() => this.setState({ loading: true }), 2000);
  }

  transactionState(transaction_cat) {
    if (this.mounted) {
      this.setState({
        transactions: this.transactionData(transaction_cat),
        data: this.state.categories[1].data
      });
    }
  }

  transactionData(transaction_cat) {
    return payments[transaction_cat].map(
      tr => (
        (this.sum += tr.amount),
        (
          <View style={[styles.balance2]} key={tr._id}>
            <View style={{ flex: 1.3 }}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  alignSelf: "flex-start",
                  justifyContent: "center",
                  position: "absolute",
                  borderRadius: 25
                }}
                source={{ uri: tr.logo }}
              />
            </View>
            <View style={{ flex: 5, flexDirection: "row" }}>
              <View
                style={{
                  flex: 4,
                  flexDirection: "column",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    justifyContent: "center",
                    fontSize: 18
                  }}
                >
                  {tr.name}
                </Text>
                <Text
                  h4
                  bold
                  style={{ fontWeight: "400", justifyContent: "center" }}
                >
                  {new Date(tr.date)
                    .toLocaleDateString("en-NZ", DATE_OPTIONS)
                    .toString()}
                </Text>
              </View>
              <View style={{ flex: 1.5, justifyContent: "center" }}>
                <Text
                  style={{
                    textAlign: "right",
                    fontWeight: "600",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingRight: 5
                  }}
                >
                  {tr.amount.toString().startsWith("-")
                    ? "-" + tr.amount.toString().replace("-", "$")
                    : "$" + tr.amount}
                </Text>
              </View>
            </View>
          </View>
        )
      )
    );
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f5f7" }}>
        <View
          style={{
            position: "absolute",
            height: 250,
            top: 20,
            width: sliderWidth
          }}
        >
          <StackedAreaChart
            style={{ flex: 1, width: viewportWidth }}
            contentInset={{ top: 10, bottom: 10 }}
            data={this.state.data}
            keys={this.state.keys}
            width={viewportWidth}
            colors={this.state.colors}
            curve={shape.curveNatural}
            animate
          >
            <Gradient />
          </StackedAreaChart>
          {/* <Image source={ this.state.graph} style={styles.image} /> */}
        </View>
        <View style={{ flex: 1.3 }}>
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
        <View style={{ flex: 1.3 }}>
          <Carousel
            ref={c => {
              this._carousel = c;
            }}
            data={this.state.categories}
            renderItem={this._renderItem.bind(this)}
            inactiveSlideShift={0}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            containerCustomStyle={styles.slider}
            contentContainerCustomStyle={styles.sliderContentContainer}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            layout={"default"}
            firstItem={1}
            loop={true}
            onSnapToItem={index => {
              this.transactionState(this.state.categories[index].title);
              this.setState({
                graph: this.state.categories[index].graph,
                data: this.state.categories[index].data,
                keys: this.state.categories[index].keys,
                colors: this.state.categories[index].colors
              });
            }}
          />
        </View>
        <View style={{ flex: 4 }}>
          <ScrollView style={{ flex: 1 }}>
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
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
export default Overview;

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
    color: theme.colors.gray
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
