import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  ScrollView,
  Switch
} from "react-native";

import { Button, Avatar, Divider } from "react-native-elements";
import * as theme from "../../theme";
import { getInset } from "react-native-safe-area-view";
import { dispatch, connect, Provider } from "../../store";
import { NavigationActions } from "react-navigation";
import payments from "../../assets/payments.json";
import Icon from "react-native-vector-icons/Ionicons";
import SvgAnimatedLinearGradient from "react-native-svg-animated-linear-gradient";
import AccountModal from "../../components/account/AccountModal";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

const mapStateToProps = state => ({
  user: state.user,
  colors: state.colors
  // put the stuff here you want to access from the global store
  // then instead of calling it from "this.state.<var>" call it from "this.props.<var>"
});
const TOP_SAFE_AREA = Platform.OS === "ios" ? getInset("top") : 40;
const HEADER_MIN_HEIGHT = 100;
const HEADER_MAX_HEIGHT = 150;
const list = [
    {
        title: "Change Password",
        icon: "account-balance-wallet",
        color: theme.scheme.royal_blue,
        toggle: false
      },
      {
        title: "Enable 2FA",
        color: theme.scheme.fuchsia_blue,
        icon: "restaurant",
        toggle: false
      },
      {
        title: "Delete Account",
        icon: "restaurant",
        color: theme.scheme.green,
        toggle: false
      },
];
class AuthenticationScreen extends Component {
  mounted = false;
  modal2 = React.createRef();
  constructor(props) {
    super();
    this.state = {
      errors: [],
      transactions: [],
      switch1Value: false
    };
    this.scrollYAnimatedValue = new Animated.Value(0);

    this.array = [];
    this.props = props;
  }

  toggleSwitch1 = value => {
    this.setState({ switch1Value: value });

    if (value) {
      dispatch("SET_COLORS", "dark");
      console.log("dark");
    } else {
      dispatch("SET_COLORS", "light");
    }
  };

  componentWillMount() {
    this.mounted = true;
    this.startHeaderHeight = 80;
    if (Platform.OS == "android") {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
    }
    if (Platform.OS == "ios") {
      this.props.navigation.N;
    }
    for (var i = 1; i <= 75; i++) {
      this.array.push(i);
    }
    console.log(this.props.user.photoURL);
  }

  render() {
    const headerHeight = this.scrollYAnimatedValue.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: "clamp"
    });
    const fontSize = this.scrollYAnimatedValue.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [40, 30],
      extrapolate: "clamp"
    });
    const renderMenu =
      list &&
      list.map(item => (
        <TouchableOpacity
          key={item.title}
          style={{
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 20,
            marginRight: 20,
            paddingBottom: 20
            // marginTop: 40
          }}
          onPress={() => {
            // this.props.action();
            // this.props.signOut();
          }}
        >
          <View
            style={{
              flex: 1,
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Avatar
              rounded
              icon={{ name: item.icon, color: "white" }}
              size="medium"
              avatarStyle={{ backgroundColor: item.color }}
            />
          </View>
          <View style={{ flex: 5, flexDirection: "column", marginLeft: 10 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: this.props.colors.gray
              }}
            >
              {/* {this.state.firstname + ' ' + this.state.lastname} */}
              {item.title}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignContent: "flex-end",
              justifyContent: "flex-end",
              alignItems: "flex-end"
            }}
          >
            {item.toggle ? (
              <Switch
                onValueChange={this.toggleSwitch1}
                value={this.state.switch1Value}
              />
            ) : (
              <Icon name="ios-arrow-forward" size={26} color={"#E1E1E1"} />
            )}
          </View>
        </TouchableOpacity>
      ));

    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: this.props.colors.back }]}
      >
        <AccountModal
          onRef={ref => (this.modal2 = ref)}
          navigation={this.props.navigation}
        />
        <ScrollView
          contentContainerStyle={{
            paddingTop: Platform.OS == "ios" ? HEADER_MAX_HEIGHT : 10
          }}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } } }
          ])}
        >
          {renderMenu}
        </ScrollView>
        {Platform.OS == "ios" ? (
          <Animated.View
            style={[
              styles.animatedHeaderContainer,
              { height: headerHeight, backgroundColor: theme.scheme.green }
            ]}
          >
            <Animated.View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ scrollOp: 0 });
                  this.props.navigation.dispatch(NavigationActions.back());
                }}
                style={{
                //   position: "absolute",
                  marginLeft: 25,
                //   top: TOP_SAFE_AREA,
                //   zIndex: 999,

                }}
              >
                <Icon
                  name="md-arrow-back"
                  size={36}
                  color={'#fff'}
                />
              </TouchableOpacity>
              <Animated.Text
                style={[styles.headerText, { fontSize: fontSize, marginLeft: 10, }]}
              >
                Authentication
              </Animated.Text>
            </Animated.View>
          </Animated.View>
        ) : null}
      </SafeAreaView>
    );
  }
}
export default connect(mapStateToProps)(AuthenticationScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    top: 0
  },
  animatedHeaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  headerText: {
    color: "white",
    // fontSize: theme.sizes.title,
    fontWeight: "800",
    textAlign: "left",
    left: 20
  },
  item: {
    backgroundColor: "#ff9e80",
    margin: 8,
    height: 45,
    justifyContent: "center",
    alignItems: "center"
  },
  itemText: {
    color: "black",
    fontSize: 16
  }
});
