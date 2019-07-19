import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image
} from "react-native";
import * as theme from "../../theme";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/Ionicons";
import { dispatch } from "../../store";
const colors = [
  theme.scheme.crusta,
  theme.scheme.royal_blue2,
  theme.scheme.cerise,
  theme.scheme.green,
  theme.scheme.fuchsia_blue
];
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
export default class OverviewTransaction extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    index: PropTypes.number
  };

  render() {
    const {
      data: { logo, name, date, amount },
      index
    } = this.props;
    const background = colors[Math.floor(Math.random() * colors.length)];
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("TransactionView")
            dispatch("SET_ACTIVE_TRANSACTION", { transaction: this.props.data})
          }
          }
          style={styles.transactionContainer}
        >
          <View style={styles.iconContainer}>
            <Image style={styles.icon} source={{ uri: logo }} />
          </View>

          <View style={[styles.categoryTag, { backgroundColor: background }]} />
          <View style={{ flex: 1, top: 35 / 1.5, alignSelf: 'center' }}>
            <Text
              style={{
                fontWeight: "700",
                justifyContent: "center",
                fontSize: 12,
                color: theme.colors.gray
              }}
            >
              {name}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "600",
                justifyContent: "center",
                alignItems: "center",
                paddingRight: 5,
                fontSize: 11,
                color: theme.colors.gray
              }}
            >
              {amount.toString().startsWith("-")
                ? amount.toFixed(2).toString().replace("-", "$")
                : "$" + amount.toFixed(2)}
            </Text>
          </View>
        </TouchableOpacity>
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
  iconContainer: {
    zIndex: 1,
    justifyContent: "flex-start",
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.3,
    shadowRadius: 1.5,
    elevation: 1
  },
  icon: {
    width: 35,
    height: 35,
    top: viewportWidth / 21.6,
    position: "absolute",
    borderRadius: 17
  },
  categoryTag: {
    width: viewportWidth / 3.6,
    height: viewportWidth / 3.6 / 3,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignContent: "flex-start",
    alignSelf: "flex-start",
    justifyContent: "flex-start"
  },
  transactionContainer: {
    borderRadius: 12,
    marginHorizontal: 10,
    backgroundColor: "white",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    alignSelf: "center",
    flexDirection: "column",
    width: viewportWidth / 3.6,
    height: viewportWidth / 3.6,
    // overflow: "hidden",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1
  }
});
