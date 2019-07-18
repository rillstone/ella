import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import * as theme from "../../theme";
import PropTypes from 'prop-types';
import TransitionView from '../TransitionView';

const DATE_OPTIONS = { weekday: "short", month: "short", day: "numeric" };
export default class Transaction extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        index: PropTypes.number
    };

    render() {
        const { data: { logo, name, date,amount}, index} = this.props;

        return (
            <TransitionView style={[styles.balance2]} index={index} >
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
                source={{ uri: logo }}
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
                    fontSize: 18,
                    color: theme.colors.gray
                  }}
                >
                  {name}
                </Text>
                <Text
                  h4
                  bold
                  style={{ fontWeight: "400", justifyContent: "center",
                  color: theme.colors.gray }}
                >
                  {new Date(date)
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
                    paddingRight: 5,
                    color: theme.colors.gray
                  }}
                >
                  {amount.toString().startsWith("-")
                    ? "-" + amount.toString().replace("-", "$")
                    : "$" + amount}
                </Text>
              </View>
            </View>
            </TransitionView>
        );
    }
}
const styles = StyleSheet.create({
    balance2: {
        borderRadius: theme.sizes.radius,
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: "row",
        height: 70
      },
});