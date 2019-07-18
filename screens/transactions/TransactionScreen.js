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
import Receipt from "./Receipt";
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

        {/* <Receipt
          style={{
            position: "absolute",
            shadowOffset: { width: 0, height: 0 },
            shadowColor: "black",
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 1
          }}
        /> */}
        <TouchableOpacity
            onPress={() => {
              this.setState({ scrollOp: 0 });
              this.props.navigation.dispatch(NavigationActions.back());
            }}
            style={{
              position: "absolute",
              bottom: 50,
              zIndex: 99999
            }}
          >
            <Icon
              name="ios-close-circle"
              size={60}
              color={theme.colors.white}
            />
          </TouchableOpacity>
        <Svg
          height={viewportWidth * 1.2}
          width={viewportWidth * 0.6}
          style={{
            position: "absolute",
            shadowOffset: { width: 0, height: 0 },
            shadowColor: "black",
            shadowOpacity: 0.4,
            shadowRadius: 2,
            elevation: 1,
            borderRadius: 12,
          }}
        >
          <Defs>
            <ClipPath id="clip">
              <G>
                <Rect
                  x="0"
                  y="0"
                  height={viewportWidth * 1.2}
                  width={viewportWidth * 0.6}
                  r="60"
                />

                <Circle cx="0" cy={viewportWidth * 1.2 -80} r="10" />
                <Circle
                  cx={viewportWidth * 0.6}
                  cy={viewportWidth * 1.2 -80}
                  r="10"
                />
              </G>
            </ClipPath>
          </Defs>

          <Rect
            x="0"
            y="0"
            height={viewportWidth * 1.2}
            width={viewportWidth}
            fill="white"
            clipPath="url(#clip)"
          />
          <Line
            x1="10"
            y1={viewportWidth * 1.2 -80}
            x2={viewportWidth * 0.6 - 10}
            y2={viewportWidth * 1.2 -80}
            stroke="#cccccc"
            strokeWidth="1"
            strokeDasharray="3"
          />
          
          <View style={styles.receipt}>
              <View style={styles.receipt_top}></View>
              <View style={styles.receipt_bot}></View>
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                marginVertical: 20
              }}
              source={{ uri: transaction.logo }}
            />
            <View style={styles.column}>
              <Text style={styles.title}>TO</Text>
              <Text style={styles.text}>{transaction.name}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.title}>AMOUNT</Text>
              <Text style={styles.text}>${transaction.amount}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.title}>INFO</Text>
              <Text style={styles.text}>{transaction.type}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.title}>DATE</Text>
              <Text style={styles.text}>
                {new Date(transaction.date).toLocaleDateString(
                  "en-NZ",
                  DATE_OPTIONS
                )}
              </Text>
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

    alignItems: "center",
    width: viewportWidth * 0.6,
    height: viewportWidth * 1.2,
    // backgroundColor: "#ff000030",
    top: 0,
    zIndex: 9999,
    position: "absolute"
  },
  receipt_top:{

  },
  receipt_bot:{},
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
    marginLeft: 30,
    marginVertical: 8
  }
});
