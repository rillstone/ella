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
  Animated,
  TouchableOpacity
} from "react-native";
import * as theme from "../../theme";
import payments from "../../assets/payments.json";
import Icon from "react-native-vector-icons/Ionicons";
import Transaction from "../../components/transactions/Transaction";
import TransactionCategorySelect from "../../components/transactions/TransactionCategorySelect";
import { sliderWidth, itemWidth } from "../../styles/SliderEntry.style";
import { LineChart } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { ScrollView } from "react-native-gesture-handler";
import AnimateNumber from "react-native-countup";
import { getInset } from "react-native-safe-area-view";
import { Paragraph } from "rn-placeholder";
import { dispatch } from "../../store";

import * as Animatable from "react-native-animatable";
import { Defs, LinearGradient, Stop } from "react-native-svg";
import { Button } from "react-native-elements";
import TimeAgo from "react-native-timeago";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
const IS_IOS = Platform.OS === "ios";
const DATE_OPTIONS = { weekday: "short", month: "short", day: "numeric" };
const TOP_SAFE_AREA = Platform.OS === "ios" ? getInset("top") : 40;
const HEADER_MAX_HEIGHT = 150;
const HEADER_MIN_HEIGHT = Platform.OS === "ios" ? 120 : 120;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
class TransactionsScreen extends Component {
  mounted = false;
  startHeaderHeight;
  constructor(props) {
    super();
    this.state = {
      errors: [],
      transactions: [],
      loading: false,
      data: [],
      sum: 0,
      scroll: false,
      scrollY: new Animated.Value(0),
      category: "All"
    };
    this.props = props;
    this.onScrollTop = this.onScrollTop.bind(this);

    this.sum = 0;
    this.transactionList = [];
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
      this.setState({
        scroll: true
      });
    }
  };
  componentDidMount() {
    this.transactionState(this.state.category);
    setTimeout(() => this.setState({ loading: true }), 1000);
  }

  categoryPress = selected => {
    this.setState({ category: selected });
    this.transactionState(selected);
  };

  transactionState(transaction_cat) {
    if (this.mounted) {
      this.setState({
        transactions: this.transactionData(transaction_cat)
      });
    }
  }

  transactionData(transaction_cat) {
    let sortedTransactions = payments[transaction_cat].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    let currentDate = sortedTransactions[0] ? sortedTransactions[0].date : null;
    this.sum = 0;
    this.transactionList = [];
    return sortedTransactions.map((tr, i) => {
      this.sum += tr.amount <= 0 ? Math.abs(tr.amount) : 0;
      tr.amount <= 0 ? this.transactionList.push(Math.abs(tr.amount)) : null;
      var x =
        i == 0 || tr.date != currentDate ? (
          <View key={tr._id}>
            <Text
              style={{
                fontSize: 17,
                color: theme.colors.gray,
                fontWeight: "800"
              }}
            >
              {new Date(tr.date)
                .toLocaleDateString("en-NZ", DATE_OPTIONS)
                .toString()}
            </Text>
            <TouchableOpacity
              key={i}
              onPress={() => {
                this.props.navigation.navigate("TransactionView2");
                dispatch("SET_ACTIVE_TRANSACTION", { transaction: tr });
              }}
            >
              <Transaction data={tr} key={tr._id} index={i} />
            </TouchableOpacity>
          </View>
        ) : (
          <View key={tr._id}>
            <TouchableOpacity
              key={i}
              onPress={() => {
                this.props.navigation.navigate("TransactionView2");
                dispatch("SET_ACTIVE_TRANSACTION", { transaction: tr });
              }}
            >
              <Transaction data={tr} key={tr._id} index={i} />
            </TouchableOpacity>
          </View>
        );
      currentDate = tr.date;
      return x;
    });
  }

  render() {
    const headerTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE * 2],
      outputRange: [0, -(HEADER_SCROLL_DISTANCE * 3)],
      extrapolate: "clamp"
    });
    const inputTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE * 5],
      outputRange: [0, -(HEADER_SCROLL_DISTANCE * 6 + 5)],
      extrapolate: "clamp"
    });

    const opacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 8, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: "clamp"
    });
    const scale = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: "clamp"
    });
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.back }}>
        <Animated.ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          style={{
            top: TOP_SAFE_AREA + 10,
            position: "absolute",
            zIndex: 9999,
            width: viewportWidth,
            transform: [{ translateY: headerTranslate }]
          }}
        >
          <View style={{ width: 10 }} />
          <TransactionCategorySelect
            data={{ name: "All", selected: this.state.category }}
            buttonPress={this.categoryPress}
          />
          <TransactionCategorySelect
            data={{ name: "Leisure", selected: this.state.category }}
            buttonPress={this.categoryPress}
          />
          <TransactionCategorySelect
            data={{ name: "Transport", selected: this.state.category }}
            buttonPress={this.categoryPress}
          />
          <TransactionCategorySelect
            data={{ name: "Food", selected: this.state.category }}
            buttonPress={this.categoryPress}
          />
          <TransactionCategorySelect
            data={{ name: "Bills", selected: this.state.category }}
            buttonPress={this.categoryPress}
          />
          <TransactionCategorySelect
            data={{ name: "Clothing", selected: this.state.category }}
            buttonPress={this.categoryPress}
          />
          <View style={{ width: 10 }} />
        </Animated.ScrollView>
        <ImageBackground
          imageStyle={{ resizeMode: "stretch" }}
          source={require("../../assets/images/tran_screen_back_small.png")}
          style={[styles.header]}
        >
          <Animated.View
            style={{ flex: 1, transform: [{ translateY: inputTranslate }] }}
          >
            <View style={{ flex: 1 }}>
              <Animated.View
                style={[styles.titleContain, { opacity: opacity }]}
              >
                <AnimateNumber
                  style={styles.title}
                  value={this.sum}
                  formatter={val => {
                    return "$" + val.toFixed(2);
                  }}
                />
                <Text style={styles.subtitle}>Total spendings</Text>
              </Animated.View>
              <View style={styles.inOut}>
                <View style={styles.inOutColumn}>
                  <View style={styles.inOutRow}>
                    <Icon
                      name={"md-arrow-dropup-circle"}
                      color={theme.scheme.green}
                      size={14}
                    />
                    <Text
                      style={[styles.inOutSum, { color: theme.scheme.green }]}
                    >
                      $350.64
                    </Text>
                  </View>
                </View>
                <View style={styles.inOutColumn}>
                  <View style={styles.inOutRow}>
                    <Icon
                      name={"md-arrow-dropdown-circle"}
                      color={theme.scheme.cerise}
                      size={14}
                    />
                    <Text
                      style={[styles.inOutSum, { color: theme.scheme.cerise }]}
                    >
                      $350.64
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </Animated.View>
        </ImageBackground>

        <Animated.ScrollView
          style={[styles.fill]}
          stickyHeaderIndices={[1]}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true }
          )}
        >
          <View style={{ paddingTop: TOP_SAFE_AREA }} />
          <View
            style={{
              borderTopLeftRadius: 12,
              backgroundColor: theme.colors.back,
              borderTopRightRadius: 12,
              overflow: "visible",
              marginTop: HEADER_SCROLL_DISTANCE * 5
            }}
          >
            <Paragraph
              style={{ left: 40, top: 20 }}
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
                  marginHorizontal: 20,
                  marginTop: 20,
                  height: viewportWidth / 3,
                  borderRadius: 12,
                  width: viewportWidth - 40,
                  alignSelf: "center",
                  backgroundColor: theme.scheme.crusta,
                  shadowColor: theme.scheme.crusta,
                  shadowOffset: {
                    width: 0,
                    height: 0
                  },
                  shadowOpacity: 0.7,
                  shadowRadius: 4,
                  elevation: 1
                }}
              >
                <LineChart
                  style={{ height: viewportWidth / 3.6 }}
                  data={this.transactionList}
                  curve={shape.curveNatural}
                  animate
                  contentInset={{ top: 20, bottom: 20 }}
                  svg={{
                    strokeWidth: 2,
                    stroke: "white"
                  }}
                />
              </View>
            </Paragraph>
          </View>
          <View
            style={{ width: viewportWidth, backgroundColor: theme.colors.back }}
          >
            <View
              style={{
                marginVertical: 10,
                marginHorizontal: 20
              }}
            >
              <Paragraph
                style={{ left: 20, top: 0, marginTop: 20 }}
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
    bottom: 0,
    backgroundColor: "transparent",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: "hidden",
    height: viewportHeight
    // marginTop: HEADER_MAX_HEIGHT
  },

  titleContain: {
    alignContent: "center",
    alignSelf: "center",
    marginTop: TOP_SAFE_AREA + 50,

    flex: 1,
    textAlign: "center",
    alignItems: "center"
  },
  inOut: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    top: 5,
    backgroundColor: "white",
    borderRadius: 10,
    opacity: 0.8,
    flex: 0.4,
    marginBottom: TOP_SAFE_AREA
  },
  inOutColumn: {
    flexDirection: "column",
    marginHorizontal: 10,
    alignItems: "center",
    height: undefined,
    padding: 4
  },
  inOutHeader: { fontSize: 14, fontWeight: "700", color: theme.colors.gray },
  inOutSum: { fontSize: 14, fontWeight: "700" },
  inOutRow: { flexDirection: "row", alignItems: "center" },

  title: {
    fontSize: theme.sizes.title,
    fontWeight: "800",
    color: theme.colors.back
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "300",
    color: theme.colors.white,
    opacity: 0.7
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
    height: viewportHeight / 4
    // borderBottomWidth: 0.5,
    // borderColor: "#00000020"
  }
});
