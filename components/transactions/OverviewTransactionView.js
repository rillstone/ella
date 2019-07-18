import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground
} from "react-native";
import PropTypes from "prop-types";
import payments from "../../assets/payments.json";
import SlidingUpPanel from "rn-sliding-up-panel";
import * as shape from "d3-shape";
import Icon from "react-native-vector-icons/Ionicons";
import { LineChart, Grid, AreaChart } from "react-native-svg-charts";
import * as theme from "../../theme";
import { Button, Input, Avatar, Card, Divider } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import OverviewTransaction from "./OverviewTransaction";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
export default class OverviewTransactionView extends Component {
  mounted = false;
  constructor(props) {
    super();
    this.state = {
      transactions: []
    };
    this.props = props;
  }
  // static propTypes = {
  //   data: PropTypes.object.isRequired
  // };
  componentWillMount() {
    this.mounted = true;
    this.transactionState("All");
    // console.log('true')
  }

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
    var size = sortedTransactions.length > 10 ? 10 : sortedTransactions.length;
    return sortedTransactions
      .slice(0, size)
      .map(
        (tr, i) => (
          (this.sum += tr.amount),
          <OverviewTransaction
            navigation={this.props.navigation}
            data={tr}
            key={tr._id}
            index={i}
          />
        )
      );
  }

  render() {
    // const {
    //   data: { position, image, data, color, title }
    // } = this.props;

    return (
      <View>
        <ScrollView
          horizontal
          style={styles.horizontalSlider}
          contentContainerStyle={styles.horizontalSliderContent}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ width: 12 }} />
          {this.state.transactions}
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("TransactionsScreen")
            }
          >
            <View style={styles.viewMore}>
              <Icon
                name="ios-arrow-forward"
                size={26}
                color={theme.colors.gray}
              />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6f5f7"
  },
  horizontalSliderContent: {
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center"
    //  flexDirection: 'row',
  },
  horizontalSlider: {
    width: viewportWidth,
    // justifyContent:'center',
    alignContent: "center",
    alignSelf: "center",
    // flexDirection: 'column',
    height: viewportWidth / 3.2,
    backgroundColor: "transparent"
    // flex: 1,
  },
  viewMore: {
    marginHorizontal: 5,
    marginRight: 20,
    backgroundColor: "white",
    borderRadius: 360,
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
    height: viewportWidth / 7,
    width: viewportWidth / 7,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1
  },
  dragHandler: {
    alignSelf: "stretch",
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
    // alignContent: "flex-start",  justifyContent: "flex-start",alignSelf: "flex-start",
  },
  container_left: {
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    left: 0
  },
  container_center: {
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center"
  },
  container_right: {
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    alignContent: "flex-end",
    right: 0
  },
  tile: {
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: "#0000"
  },
  card: {
    borderRadius: 12,
    width: viewportWidth / 3.6,
    height: viewportWidth / 2.5,
    overflow: "hidden",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 1
  },
  chartInfo: {
    position: "absolute",
    zIndex: 999,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    top: 8
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
