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
   Animated, ScrollView
} from "react-native";

import { Button, Avatar, Divider } from "react-native-elements";
import * as theme from "../theme";
import { getInset } from "react-native-safe-area-view";
import payments from "../assets/payments.json";
import Icon from "react-native-vector-icons/Ionicons";
import SvgAnimatedLinearGradient from "react-native-svg-animated-linear-gradient";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
const TOP_SAFE_AREA = Platform.OS === "ios" ? getInset("top") : 40;
const HEADER_MIN_HEIGHT = 100;
const HEADER_MAX_HEIGHT = 200;
const list = [
  {
    title: "Linked Accounts",
    icon: "ios-link"
  },
  {
    title: "Personal Info",
    icon: "ios-body"
  },
  {
    title: "Budget",
    icon: "ios-pricetags"
  },
  {
    title: "Authentication",
    icon: "ios-key"
  },


];
class Settings extends Component {
  mounted = false;
  constructor(props) {
    super();
    this.state = {
      errors: [],
      transactions: []
    };
    this.scrollYAnimatedValue = new Animated.Value(0);

    this.array = [];
    this.props = props;
  }

  renderMenu = () => {
    return (
      <TouchableOpacity
          style={{
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 20,
            marginRight: 20,
            paddingBottom: 20,
            // marginTop: 40
          }}
          onPress={() => {
            this.props.action();
            this.props.signOut();
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
              icon={{  name:'exit-to-app', color: 'white'}}
              size="medium"
              avatarStyle={{backgroundColor: theme.scheme.crusta}}
            />

          </View>
          <View style={{ flex: 5, flexDirection: "column", marginLeft: 10 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: theme.colors.gray
              }}
            >
              {/* {this.state.firstname + ' ' + this.state.lastname} */}
              Sign Out
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
            <Icon name="ios-arrow-forward" size={26} color={"#E1E1E1"} />
          </View>
        </TouchableOpacity>
    )
  }


  componentWillMount() {
    this.mounted = true;
    this.startHeaderHeight = 80;
    if (Platform.OS == "android") {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
    }
    for (var i = 1; i <= 75; i++) {
      this.array.push(i);
    }
  }

  render() {
    const headerHeight = this.scrollYAnimatedValue.interpolate(
      {
        inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp'
      });
      const fontSize = this.scrollYAnimatedValue.interpolate(
        {
          inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
          outputRange: [40, 30],
          extrapolate: 'clamp'
        });

    // const headerBackgroundColor = this.scrollYAnimatedValue.interpolate(
    //   {
    //     inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
    //     outputRange: ['#e91e63', '#1DA1F2'],
    //     extrapolate: 'clamp'
    //   });
    return (
  

        <SafeAreaView style={styles.container} >
          <ScrollView
            contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } } }]
            )}>
             <TouchableOpacity
          style={{
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            margin: 20,
            marginTop: 10
          }}
          onPress={() => {

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
              avatarStyle={{ backgroundColor: theme.scheme.cadet_blue }}
              size="medium"
              title={"CR"}
              // source={{ uri: image === "" ? null : image }}
            />
            {/* <Avatar
                  rounded
                  avatarStyle={{backgroundColor: theme.scheme.cadet_blue}}
                  size="medium"
                  title={
                    icon
                  }
                //   source={{
                    
                //       uri: icon
                // }}
                /> */}
          </View>
          <View style={{ flex: 5, flexDirection: "column", marginLeft: 10 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: theme.colors.gray
              }}
            >
              {/* {this.state.firstname + ' ' + this.state.lastname} */}
              {'Charlie' + " " + 'Rillstone'}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: "#5B7282"
              }}
            >
              {/* {this.state.email} */}
              {'charlierillstone@gmail.com'}
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
            <Icon name="ios-arrow-forward" size={26} color={"#E1E1E1"} />
          </View>
        </TouchableOpacity>
            {this.renderMenu()}
            {this.renderMenu()}
            {this.renderMenu()}
            {this.renderMenu()}
            {this.renderMenu()}
            {this.renderMenu()}
            {this.renderMenu()}
            {this.renderMenu()}
            {this.renderMenu()}
        
          </ScrollView>
  
          <Animated.View style={[styles.animatedHeaderContainer, { height: headerHeight, backgroundColor: theme.scheme.wedgewood }]}>
            <Animated.Text style={[styles.headerText, {fontSize: fontSize}]}>Settings</Animated.Text>
          </Animated.View>
  
        </SafeAreaView>
    );
  }
}
export default Settings;

const styles = StyleSheet.create({

    container: {
      flex: 1,
      justifyContent: "center",
      top: 0,
      backgroundColor: theme.colors.back,

    },
    animatedHeaderContainer: {
      position: 'absolute',
      top:  0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'flex-start',

    },
    headerText: {
      color: 'white',
      // fontSize: theme.sizes.title,
      fontWeight: "800",
      textAlign:'left',
      left:20
    },
    item: {
      backgroundColor: '#ff9e80',
      margin: 8,
      height: 45,
      justifyContent: 'center',
      alignItems: 'center'
    },
    itemText: {
      color: 'black',
      fontSize: 16
    }
});
