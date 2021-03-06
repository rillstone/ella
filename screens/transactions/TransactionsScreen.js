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
import TransactionGraphSection from "../../components/transactions/TransactionGraphSection";
import { sliderWidth, itemWidth } from "../../styles/SliderEntry.style";
import { LineChart, XAxis } from "react-native-svg-charts";
import * as shape from "d3-shape";
import * as scale from "d3-scale";
import { ScrollView } from "react-native-gesture-handler";
import AnimateNumber from "react-native-countup";
import { getInset } from "react-native-safe-area-view";
import { LinearGradient } from "expo-linear-gradient";
import { dispatch, connect } from "../../store";
import { Paragraph } from "rn-placeholder";
import sort from "fast-sort";
import _ from "lodash";
import TransactionModal from "../../components/transactions/TransactionModal";

import * as Animatable from "react-native-animatable";
import { Defs, Stop, Circle, G, Text as SvgText } from "react-native-svg";
import { Button } from "react-native-elements";
import TimeAgo from "react-native-timeago";
import moment from "moment";
const axesSvg = {
  fontSize: 10,
  fill: "white",
  onPress: () => console.log("yes")
};
const xAxisHeight = 30;
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
const mapStateToProps = state => ({
  user: state.user,
  colors: state.colors
});
const IS_IOS = Platform.OS === "ios";
const DATE_OPTIONS = { weekday: "short", month: "short", day: "numeric" };
const TOP_SAFE_AREA = Platform.OS === "ios" ? getInset("top") : 50;
const HEADER_MAX_HEIGHT = 150;
const HEADER_MIN_HEIGHT = Platform.OS === "ios" ? 120 : 120;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const safetyZone = HEADER_MAX_HEIGHT;

class TransactionsScreen extends Component {
  transactionModal = React.createRef();
  mounted = false;
  startHeaderHeight;
  constructor(props) {
    super();
    this.state = {
      errors: [],
      transactions: [],
      loading: false,
      loaded: false,
      data: [],
      graphSection: null,
      toolTipColor: "transparent",
      pressed: [0, 0, 0, 0, 0, 0, 0],
      toolTip: 0,
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
    this.dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  }

  sortTransactions() {
    var transactions = {};
    var weekTransactions = {};
    var weekTotals = {};
    var minusWeek = moment()
      .startOf("day")
      .subtract(1, "week");
    var yesterdayEnd = moment()
      .endOf("day")
      .subtract(1, "day");
    Object.keys(payments).map(tr => {
      transactions[tr] = sort(payments[tr]).desc(t => moment(t.date));
    });

    Object.keys(transactions).map(tr => {
      weekTransactions[tr] = _.filter(transactions[tr], function(t) {
        return moment(t.date).isBetween(minusWeek, yesterdayEnd);
      });
    });
    Object.keys(weekTransactions).map(tr => {
      weekTotals[tr] = [
        { value: 0, day: "Sun" },
        { value: 0, day: "Mon" },
        { value: 0, day: "Tue" },
        { value: 0, day: "Wed" },
        { value: 0, day: "Thu" },
        { value: 0, day: "Fri" },
        { value: 0, day: "Sat" }
      ];
      weekTransactions[tr].map(t => {
        weekTotals[tr][moment(t.date).day()].value += Math.abs(t.amount);
      });
    });

    this.setState({
      transactions1: transactions,
      weekTransactions: weekTransactions,
      weekTotals: weekTotals
    });
  }
  componentWillMount() {
    this.sortTransactions();
    this.mounted = true;
    this.startHeaderHeight = 80;
    if (Platform.OS == "android") {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
    }
  }
  _onLoad = () => {
    this.setState(() => ({ loaded: true }));
  };
  onScrollTop = ({ layoutMeasurement, contentOffset, contentSize }) => {};
  componentDidMount() {
    this.transactionState(this.state.category);
    this.setState({ loading: true });
  }

  categoryPress = selected => {
    if (this.mounted) {
      this.setState({ category: selected });
      this.transactionState(selected);
    }
  };

  transactionState(transaction_cat) {
    if (this.mounted) {
      this.setState({
        transactions: this.getTransactions(transaction_cat)
      });
    }
  }

  getTransactions(category) {
    let selectedTransactions = this.state.graphSection
      ? this.state.weekTransactions[category].filter(
          t =>
            moment(t.date).day() ===
            this.dayOfWeek.indexOf(this.state.graphSection)
        )
      : this.state.transactions1[category];

    let currentDate = selectedTransactions[0]
      ? selectedTransactions[0].date
      : null;
    this.sum = 0;

    return selectedTransactions.map((tr, i) => {
      this.sum += tr.amount <= 0 ? Math.abs(tr.amount) : 0;

      var x =
        i == 0 || tr.date != currentDate ? (
          <View key={tr._id}>
            <Text
              style={{
                fontSize: 17,
                color: this.props.colors.gray,
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
                this.transactionModal.openModal();
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
                this.transactionModal.openModal();
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

  graphSectionPress = dataFromSection => {
    this.setState(
      {
        graphSection:
          this.state.graphSection === dataFromSection ? null : dataFromSection,
        toolTip:
          this.state.toolTip === this.dayOfWeek.indexOf(dataFromSection)
            ? 0
            : this.dayOfWeek.indexOf(dataFromSection),
        toolTipColor:
          this.state.graphSection === dataFromSection ? "transparent" : "white"
      },
      () => {
        this.transactionState(this.state.category);
      }
    );
  };

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

    const Tooltip = ({ x, y }) => (
      <G x={x(this.state.toolTip) - 75 / 2}>
        <G x={75 / 2}>
          <Circle
            cy={y(
              this.state.weekTotals[this.state.category][this.state.toolTip]
                .value
            )}
            r={3}
            stroke={this.state.toolTipColor}
            strokeWidth={2}
            fill={"transparent"}
          />
          <SvgText
            strokeWidth={2}
            fill={
              this.state.toolTipColor !== "transparent"
                ? "black"
                : "transparent"
            }
            stroke={"transparent"}
            fontSize="13"
            fontWeight="500"
            x={
              this.state.toolTip == 0
                ? x(this.state.toolTip) + 30
                : this.state.toolTip == 6
                ? 75 / 2 - 60
                : 75 / 2
            }
            y={
              y(
                this.state.weekTotals[this.state.category][this.state.toolTip]
                  .value
              ) < 25
                ? y(
                    this.state.weekTotals[this.state.category][
                      this.state.toolTip
                    ].value
                  ) + 20
                : y(
                    this.state.weekTotals[this.state.category][
                      this.state.toolTip
                    ].value
                  ) - 15
            }
            textAnchor="middle"
          >
            {"$" +
              this.state.weekTotals[this.state.category][
                this.state.toolTip
              ].value.toFixed(2)}
          </SvgText>
        </G>
      </G>
    );

    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: this.props.colors.back }}
      >
        <TransactionModal
          onRef={ref => (this.transactionModal = ref)}
          navigation={this.props.navigation}
        />
        <Animated.ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          style={{
            top: Platform.OS == "android" ? TOP_SAFE_AREA : TOP_SAFE_AREA + 10,
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
          // source={require("../../assets/images/tran_screen_back_small.png")}
          source={
            this.state.loaded
              ? require("../../assets/images/tran_screen_back_small.png")
              : require("../../assets/images/tran_screen_back_grey.png")
          }
          style={[styles.header]}
          onLoad={this._onLoad}
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
                {/* <Text style={styles.subtitle}>
                  {this.state.category} spending
                </Text> */}
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
          <Paragraph
            style={{
              top: safetyZone,
              paddingTop: 20,
              backgroundColor: this.props.colors.back,
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12
            }}
            animation="fade"
            lineNumber={3}
            textSize={16}
            color="#DAD7D7"
            width="80%"
            lastLineWidth="70%"
            firstLineWidth="50%"
            isReady={this.state.loading}
          >
            <View style={styles.chartContainer}>
              <LineChart
                style={{ height: viewportWidth / 3.6 }}
                data={this.state.weekTotals[this.state.category]}
                yAccessor={({ item }) => item.value}
                // xAccessor={({ item }) => item.day}
                xScale={scale.scaleTime}
                curve={shape.curveNatural}
                animate
                numberOfTicks={7}
                contentInset={{ top: 20, bottom: 20 }}
                svg={{
                  strokeWidth: 2,
                  stroke: "white"
                }}
              >
                <Tooltip style={{ zIndex: 999999 }} />
              </LineChart>
              <XAxis
                style={{ marginHorizontal: -10, height: xAxisHeight }}
                data={this.state.weekTotals[this.state.category]}
                // xAccessor={({ item }) => item}
                formatLabel={value => this.dayOfWeek[value]}
                contentInset={{ left: 30, right: 30 }}
                svg={{
                  fontSize: 10,
                  fill: "white",
                  onPress: () => console.log("touched: ")
                }}
                scale={scale.scaleTime}
                numberOfTicks={7}
              />
              <TransactionGraphSection
                options={this.state.weekTotals[this.state.category]}
                callBack={this.graphSectionPress}
              />
            </View>
          </Paragraph>
          <View
            style={{
              width: viewportWidth,
              backgroundColor: this.props.colors.back
            }}
          >
            <View
              style={{
                marginTop: xAxisHeight + safetyZone,
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
export default connect(mapStateToProps)(TransactionsScreen);

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
    marginTop:
      Platform.OS == "android" ? TOP_SAFE_AREA + 30 : TOP_SAFE_AREA + 50,

    flex: 1,
    textAlign: "center",
    alignItems: "center"
  },
  chartContainer: {
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
    marginBottom: Platform.OS == "android" ? TOP_SAFE_AREA - 30 : TOP_SAFE_AREA
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
