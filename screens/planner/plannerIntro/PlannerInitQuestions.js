import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
  Image,
  Dimensions
} from "react-native";
import * as theme from "../../../theme";
import Icon from "react-native-vector-icons/Ionicons";
import * as plannerTypes from "../../../components/planner/PlannerTypes";
import PlannerTypeSelection from "../../../components/planner/PlannerTypeSelection";
import { Transition } from "react-navigation-fluid-transitions";
import * as Animatable from "react-native-animatable";
import { Button, Input } from "react-native-elements";
import PropTypes from "prop-types";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

class PlannerInitQuestions extends Component {
  mounted = false;
  constructor(props) {
    super();
    this.state = {
      selected: ""
    };
    this.props = props;
  }

  componentWillMount() {
    this.mounted = true;
    this.startHeaderHeight = 80;
    if (Platform.OS == "android") {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
    }
  }

  typePress = dataFromTile => {
    this.setState({
      selected: dataFromTile
    });
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.back }}>
        <StatusBar barStyle="dark-content" />
        <View style={{ flex: 0.3, justifyContent: 'center',alignContent:'center' }}>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "400",
              fontSize: 25,

              color: "#3F4F5A"
            }}
          >
            What do you want to achieve?
          </Text>
        </View>
        <View style={{ flex: 0.8 }}>
          <PlannerTypeSelection
            options={plannerTypes.plannerTypes}
            callBack={this.typePress}
          />
        </View>

        <View
              style={{
                flex: 0.3,
                // top: 40,
                justifyContent: "center",
                alignItems: "center"
              }}
            >

                <Button
                  buttonStyle={styles.button}
                  titleStyle={{ fontWeight: "bold", color: "#FFF" }}
                  icon={
                    <Icon name="ios-arrow-forward" size={30} color="white" />
                  }
                  onPress={() =>
                    this.props.navigation.navigate("MealSizeCount", {
                      navigation: this.props.navigation, type: this.state.selected
                    })
                  }
                />

            </View>

      </SafeAreaView>
    );
  }
}
export default PlannerInitQuestions;

const styles = StyleSheet.create({
  backgroundImage: {
    // position: "absolute",
    // top: 0,
    // left: 0,
    // right: 0,
    flex: 0.8,
    width: null,
    alignContent: "flex-end",
    justifyContent: "flex-end",
    height: null,
    resizeMode: "contain"

    // resizeMode: "cover"
  },
  button: {
    borderRadius: 30,
    width: 60,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    height: 60,
    backgroundColor: theme.scheme.green,
    shadowColor: theme.scheme.green,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 0
  },
});
