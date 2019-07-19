import React, { Component } from "react";
import {
  Text,
  Image,
  StatusBar,
  StyleSheet,
  Dimensions,
  View,
  Animated,
  TouchableOpacity
} from "react-native";
import { connect } from "../../store";
import Icon from "react-native-vector-icons/Ionicons";
import { NavigationActions } from "react-navigation";
import * as theme from "../../theme";

import Svg, { Defs, Circle, G, ClipPath, Rect, Line } from "react-native-svg";
const DATE_OPTIONS = { weekday: "short", month: "short", day: "numeric" };
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

const mapStateToProps = state => ({
  transaction: state.activeTransaction
});
class TransactionScreen extends Component {
  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
  }
  componentDidMount() {
    Animated.timing(this.animatedValue, {
      toValue: 150,
      duration: 1000
    }).start();
  }

  render() {
    const { transaction, navigation } = this.props;
    const interpolateColor = this.animatedValue.interpolate({
      inputRange: [0, 300],
      outputRange: ["#00000000", "#00000070"]
    });
    return (
      <Animated.View
        style={[styles.container, { backgroundColor: interpolateColor }]}
      >
        <StatusBar hidden={true} />
        <TouchableOpacity
          onPress={() => {
            this.setState({ scrollOp: 0 });
            this.props.navigation.dispatch(NavigationActions.back());
          }}
          style={{
            position: "absolute",
            bottom: (viewportHeight - viewportWidth * 0.8) / 7,
            zIndex: 99999
          }}
        >
          <Icon name="ios-close-circle" size={60} color={theme.colors.white} />
        </TouchableOpacity>
        <Svg
          height={viewportWidth*0.8}
          width={viewportWidth * 0.6}
          style={{
            position: "absolute",
            shadowOffset: { width: 0, height: 0 },
            shadowColor: "black",
            shadowOpacity: 0.4,
            shadowRadius: 2,
            elevation: 1,
            borderRadius: 12
          }}
        >
          <Defs>
            <ClipPath id="clip">
              <G>
                <Rect
                  x="0"
                  y="0"
                  height={viewportWidth*0.8}
                  width={viewportWidth * 0.6}
                  r="60"
                />

                <Circle cx="0" cy={80} r="10" />
                <Circle cx={viewportWidth * 0.6} cy={80} r="10" />
              </G>
            </ClipPath>
          </Defs>

          <Rect
            x="0"
            y="0"
            height={viewportWidth*0.8}
            width={viewportWidth}
            fill={theme.colors.back}
            clipPath="url(#clip)"
          />
          <Line
            x1="20"
            y1={80}
            x2={viewportWidth * 0.6 - 20}
            y2={80}
            stroke="#cccccc"
            strokeWidth="1"
            strokeDasharray="8"
          />
          <View
            style={{
              borderTopLeftRadius: 12,
              top: -10,
              borderTopRightRadius: 12,
              height: 15,
              width: viewportWidth * 0.6 - 0.5,
              backgroundColor: theme.colors.back,
              zIndex: 999999
            }}
          />
          <View
            style={{
              borderBottomLeftRadius: 12,
              top: viewportWidth*0.8 - 16,
              borderBottomRightRadius: 12,
              height: 15,
              width: viewportWidth * 0.6 - 0.5,
              backgroundColor: theme.colors.back,
              zIndex: 999999
            }}
          />
          <View style={styles.receipt}>
            <View style={styles.receipt_top}>
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 20,
                  color: theme.colors.gray
                }}
              >
                Transaction Details
              </Text>
            </View>
            <View style={styles.receipt_bot}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 20
                }}
              >
                <View style={styles.column}>
                  <Text style={styles.title}>DATE</Text>
                  <Text style={styles.text}>
                    {new Date(transaction.date).toLocaleDateString(
                      "en-NZ",
                      DATE_OPTIONS
                    )}
                  </Text>
                </View>

                <View style={styles.columnRight}>
                  <Text style={[styles.title, { textAlign: "right" }]}>
                    TIME
                  </Text>
                  <Text style={styles.text}>
                    {new Date(transaction.date).toLocaleString("en-NZ", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true
                    })}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <View style={styles.column}>
                  <Text style={styles.title}>TO</Text>
                  <Text style={styles.text}>{transaction.name}</Text>
                </View>
                <View style={styles.columnRight}>
                  <Image
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25
                      // marginVertical: 20
                    }}
                    source={{ uri: transaction.logo }}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <View style={styles.column}>
                  <Text style={styles.title}>AMOUNT</Text>
                  <Text style={{ fontSize: 20, fontWeight: "600" }}>

                    {transaction.amount.toString().startsWith("-")
                      ? transaction.amount.toString().replace("-", "$")
                      : "$" + transaction.amount}
                  </Text>
                </View>
                <View style={styles.columnRight}>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: theme.colors.lightGray,
                      borderRadius: 5
                    }}
                  >
                    <Text
                      style={[
                        styles.title,
                        { padding: 2, textTransform: "uppercase" }
                      ]}
                    >
                      {transaction.type}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Svg>
      </Animated.View>
    );
  }
}
export default connect(mapStateToProps)(TransactionScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: '#00000040',
  },
  receipt: {
    // alignItems: "center",
    width: viewportWidth * 0.6,
    height: viewportWidth,
    // backgroundColor: "#ff000030",
    top: 0,
    zIndex: 9999,
    position: "absolute"
  },
  receipt_top: {
    // backgroundColor: "#ff000030",
    height: 80,
    width: viewportWidth * 0.6,
    alignContent: "center",
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
    justifyContent: "center"
  },
  receipt_bot: {
    // backgroundColor: "#00ff0030",
    height: viewportWidth - 80,
    width: viewportWidth * 0.6
  },
  text: {
    fontSize: 15,
    fontWeight: "600"
  },
  title: {
    fontSize: 12,
    color: theme.colors.inactive
  },
  column: {
    flexDirection: "column",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginVertical: 15
  },
  columnRight: {
    flexDirection: "column",
    alignContent: "flex-end",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    alignSelf: "flex-end",
    marginRight: 20,
    marginVertical: 15
  }
});
