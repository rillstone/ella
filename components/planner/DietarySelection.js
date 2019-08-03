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
const icons = [
  "ios-tennisball",
  "ios-stopwatch",
  "ios-pie",
  "ios-happy",
  "ios-chatbubbles",
  "ios-basketball",
  "ios-baseball",
  "ios-aperture",
  "ios-analytics",
  "ios-appstore"
];
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
export default class DietarySelection extends Component {
  constructor(props) {
    super();
    this.state = {
      selected: false,
      value: []
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
    // const
    // const {
    //   data: { name, icon, color, index, selected, width }
    // } = this.props;

    return (
      <View
        style={{
          flexDirection: "row",
          // justifyContent: "space-between",
          marginHorizontal: 10,
          left: 0,
          alignContent: "center",
          alignItems: "center",
          alignSelf: "center",
          flexWrap: options.length > 4 ? "wrap" : "nowrap"
        }}
      >
        {options.map(item => {
          return (
            <TouchableOpacity
              key={item.key}
              style={[
                styles.card,
                {
                  width: viewportWidth / item.width,
                  backgroundColor: theme.colors.lightGray
                },
                value.indexOf(item.key) !== -1 && { backgroundColor: item.color }
              ]}
              onPress={() => {
                var index = this.state.value.indexOf(item.key);
                var array = this.state.value;
                if (index !== -1) {
                  array.splice(index,1);
                  this.setState({value:array});
                } else {
                  array.push(item.key);
                  this.setState({value:array});
                }




                // if (this.state.value === item.key) {
                //   this.setState({
                //     value: ""
                //   });
                // } else {
                //   this.setState({
                //     value: item.key
                //   });
                // }
                this.props.callBack(item.key);
              }}
            >
              <View style={styles.icon}>
                <Icon name={item.icon} color={"#FFF"} size={30} />
              </View>
              <View style={styles.dietaryText}>
                <Text style={styles.dietaryTitle}>{item.key}</Text>
              </View>
            </TouchableOpacity>
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
    // alignSelf: "center",
    // alignItems:'center',
    // justifyContent: "center",
    // alignContent: "center",

    height: viewportWidth / 5,

    // justifyContent: "center",

    // alignContent: "center",
    marginVertical: 5,
    marginHorizontal: 5,
    flexDirection: "column",
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
  icon: {
    flex: 3,
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    top: 10
    // left: 10,
  },
  iconArrow: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center"
  },
  dietaryText: {
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    flex: 1
  },
  dietaryTitle: {
    backgroundColor: "transparent",
    fontSize: 12,
    fontWeight: "700",
    color: "#fff"
  },
  dietarySubtitle: {
    backgroundColor: "transparent",
    fontSize: 15,
    fontWeight: "500",
    color: "#fff"
  }
});
