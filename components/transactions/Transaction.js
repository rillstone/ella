import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import * as theme from "../../theme";
import { dispatch, connect } from "../../store";
import PropTypes from 'prop-types';
import TransitionView from '../TransitionView';
import ProgressiveImage from '../ProgressiveImage';
const mapStateToProps = state => ({
  user: state.user,
  colors: state.colors
});
const DATE_OPTIONS = { weekday: "short", month: "short", day: "numeric" };
class Transaction extends Component {
  constructor(props) {
    super();
    this.state = {
      loaded: false
    };
  }
    static propTypes = {
        data: PropTypes.object.isRequired,
        index: PropTypes.number
    };
    _onLoad = () => {
      this.setState(() => ({ loaded: true }));

    };
    render() {
        const { data: { logo, name, date,amount}, index} = this.props;

        return (
            <TransitionView style={[styles.balance2]} index={index} >
            <View style={{ flex: 1.3 }}>
            <Image
          source={{ uri: logo }}
          style={{ width: 50,
            height: 50,
            alignSelf: "flex-start",
            justifyContent: "center",
            position: "absolute",
            borderRadius: 25 ,
            backgroundColor: this.state.loaded
            ? "transparent"
            : theme.colors.lightGray
          }}
          resizeMode="cover"
          onLoad={this._onLoad}
        />
              {/* <Image
                style={{
                  width: 50,
                  height: 50,
                  alignSelf: "flex-start",
                  justifyContent: "center",
                  position: "absolute",
                  borderRadius: 25
                }}
                source={{ uri: logo }}
              /> */}
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
                    color: this.props.colors.gray
                  }}
                >
                  {name}
                </Text>
                <Text
                  h4
                  bold
                  style={{ fontWeight: "400", justifyContent: "center",
                  color: this.props.colors.gray }}
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
                    color: this.props.colors.gray
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

export default connect(mapStateToProps)(Transaction);
const styles = StyleSheet.create({
    balance2: {
        borderRadius: theme.sizes.radius,
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: "row",
        height: 70
      },
});