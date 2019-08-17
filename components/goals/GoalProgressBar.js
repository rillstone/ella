import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import moment from "moment";
import * as theme from "../../theme";
import payments from "../../assets/payments.json";
import { Slider } from "react-native-elements";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
export default class GoalProgressBar extends Component {
  constructor(props) {
    super();
    this.state = {
      value: 0
    };
    this.props = props;
  }

  getPercent(limit, category, period, date) {
    var categoryCap = category.charAt(0).toUpperCase() + category.slice(1);
    var max =
      period === "one week"
        ? 7
        : period === "two weeks"
        ? 14
        : period === "one month"
        ? 31
        : 7;

    var startDate = moment(new Date(date));
    console.log(startDate);
    var endDate = moment(new Date(date))
      .add(max, "days")
      .format();
    console.log(endDate);
    var sum = 0;
    payments[categoryCap].map((tr, i) => {
      if (
        moment(tr.date).isSameOrAfter(startDate) &&
        moment(tr.date).isSameOrBefore(endDate)
      ) {
        sum += tr.amount <= 0 ? Math.abs(tr.amount) : 0;
      }
    });
    return sum;
  }

  getDaysRemaining(period, date) {
    var days =
      period === "one week"
        ? 7
        : period === "two weeks"
        ? 14
        : period === "one month"
        ? 31
        : 7;
    var now = moment();
    var then = moment(date);
    var complete = moment(then.add(days, "days").format());
    var diff = now.diff(complete, "days");
    return diff;
  }
  render() {
    const run = false;
    const {
      data: { category, value, period, date },
      color
    } = this.props;
    const daysRemain = this.getDaysRemaining(period, date);
    const sum = this.getPercent(value, category, period, date);
    const progress = sum >= value ? 100 : (sum / value) * 100;
    const max =
      period === "one week"
        ? 7
        : period === "two weeks"
        ? 14
        : period === "one month"
        ? 31
        : 7;

    const daysGone = max + (daysRemain > 0 ? 0 : daysRemain);
    // this.props.goalProgress([max-daysGone, sum])

    return (
      <View>
        <View>
          <View pointerEvents={"none"} style={{ zIndex: 999 }}>
            <Text style={styles.amountStyle}>{progress.toFixed(0)}%</Text>
          </View>
          <Slider
            value={progress}
            maximumValue={100}
            minimumValue={0}
            step={1}
            disabled
            //   onValueChange={value => { this.setState({ value }); this.props.onSlide(value); }}
            style={styles.sliderStyle}
            trackStyle={styles.trackStyle}
            minimumTrackTintColor={color}
            maximumTrackTintColor={theme.colors.lightGray}
            thumbTintColor={color}
            animationType={"spring"}
            thumbStyle={styles.thumbStyle}
          />
          <Slider
            value={daysGone}
            maximumValue={max}
            minimumValue={0}
            step={1}
            disabled
            //   onValueChange={value => { this.setState({ value }); this.props.onSlide(value); }}
            style={styles.sliderStyle2}
            trackStyle={styles.trackStyle2}
            minimumTrackTintColor={theme.colors.gray}
            maximumTrackTintColor={theme.colors.lightGray}
            thumbTintColor={theme.colors.gray}
            animationType={"spring"}
            thumbStyle={styles.thumbStyle2}
          />
        </View>
        <View>
          {/* <Text>
            ${sum.toFixed(2)} of ${value.toFixed(2)} spent
          </Text>
          <Text>{max-daysGone} days to go!</Text> */}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  sliderStyle: {
    width: viewportWidth - 50,
    left: 0
  },
  sliderStyle2: {
    width: viewportWidth - 50,
    left: 0,
    height: 20,
    top: 10
  },
  trackStyle: {
    backgroundColor: theme.colors.lightGray,
    height: 70,
    // borderRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  trackStyle2: {
    backgroundColor: theme.colors.lightGray,
    height: 20,
    // borderRadius: 5
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  thumbStyle: {
    height: 70,
    width: 30,
    // borderRadius: 10,
    // borderTopLeftRadius: 10,
    borderTopLeftRadius: 10,

    borderBottomLeftRadius: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 0
  },
  thumbStyle2: {
    height: 20,
    width: 30,
    top: 20,
    // borderRadius: 10
    // borderBottomLeftRadius: 10,

    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 10
  },
  amountStyle: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    alignSelf: "center",
    top: 10,

    fontWeight: "700",

    fontSize: 20,
    color: "#FFF",
    zIndex: 999
  }
});
