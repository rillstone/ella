import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
  TouchableOpacity,
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
import { NavigationActions } from "react-navigation";
import { getInset } from "react-native-safe-area-view";

import PropTypes from "prop-types";
import { dispatch, connect } from "../../../store";
const mapStateToProps = state => ({
  user: state.user,
  colors: state.colors
});
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
const TOP_SAFE_AREA = Platform.OS === "ios" ? getInset("top") : 40;
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
    if (this.state.selected === dataFromTile) {
      this.setState({
        selected: ""
      });
    } else {
      this.setState({
        selected: dataFromTile
      });
    }
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: this.props.colors.back }}>
        <StatusBar barStyle="dark-content" />
        <TouchableOpacity
          onPress={() => {
            this.setState({ scrollOp: 0 });
            this.props.navigation.dispatch(NavigationActions.back());
          }}
          style={{
            position: "absolute",
            left: 25,
            top: TOP_SAFE_AREA,
            zIndex: 999,
            opacity: 0.5
          }}
        >
          <Icon
            name="ios-arrow-dropleft-circle"
            size={36}
            color={theme.scheme.green}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 0.3,
            justifyContent: "center",
            alignContent: "center"
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "400",
              fontSize: 25,

              color: this.props.colors.gray
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
            titleStyle={{ fontWeight: "bold", color: this.props.colors.white }}
            disabled={this.state.selected === ""}
            icon={<Icon name="ios-arrow-forward" size={30} color="white" />}
            onPress={() =>
              {
                var type = this.state.selected.toString();
              this.props.navigation.navigate("MealSizeCount", {
                navigation: this.props.navigation,
                type: type
              })
            }
            }
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps)(PlannerInitQuestions);
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
  }
});
