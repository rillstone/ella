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
import Icon from "react-native-vector-icons/Ionicons";
import * as theme from "../../theme";
import { withTheme } from "react-native-elements";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

export default class TransactionGraphSelection extends Component {
  constructor(props) {
    super();
    this.state = {
      selected: false,
      value: null,
      backgroundColor: '#fed33060'
    };
    this.props = props;
  }
  // static propTypes = {
  // data: PropTypes.object.isRequired
  // };

  tilePress(index) {
    this.props.tilePressed(index);
  }
  render() {
    const { options } = this.props;
    const { value } = this.state;
    const graphHeight = (viewportWidth / 3.6)
    return (
      <View
        style={{
          marginHorizontal: 20,
          position: "absolute",
          height: viewportWidth / 3,
          borderRadius: 12,
          width: viewportWidth - 40,
          overflow: "hidden",
          alignSelf: "center",
          backgroundColor: "transparent",
          flexDirection: "row"
        }}
      >
        {options.map(item => {
          return (
            <TouchableOpacity
              key={item.day}
              style={[
                styles.section,
                value === item.day && { backgroundColor: this.state.backgroundColor }
              ]}
              onPress={() => {
                // console.log("pressed " + item.day + ' ' + item.value + ' ' + graphHeight + ' ' + item.value/3.0375652174);
                if (value==item.day) {
                  this.setState({ value: item.day, backgroundColor:  "transparent"});
                } else {
                  this.setState({ value: item.day,backgroundColor:  "#fed33060"});
                }
                this.props.callBack(item.day);
              }}
            />
          );
        })}
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
  section: {
    flex: 1,
    backgroundColor: "#fa823101",
    zIndex: 9999999
  },
  dot: {
    position: "absolute",
    height: 5,
    width: 5,
    borderRadius: 2.5,
    marginBottom: 50,
    borderColor: "transparent",
    backgroundColor: "transparent",
    borderWidth: 2,
    alignSelf: "center",
    
  },
});
