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
   Animated, ScrollView,
   Switch
} from "react-native";

import { Button, Avatar, Divider } from "react-native-elements";
import * as theme from "../theme";
import { getInset } from "react-native-safe-area-view";
import { dispatch, connect, Provider } from "../store";
import payments from "../assets/payments.json";
import Icon from "react-native-vector-icons/Ionicons";
import SvgAnimatedLinearGradient from "react-native-svg-animated-linear-gradient";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

const mapStateToProps = state => ({
  user: state.user,
  // put the stuff here you want to access from the global store
  // then instead of calling it from "this.state.<var>" call it from "this.props.<var>"

});
const TOP_SAFE_AREA = Platform.OS === "ios" ? getInset("top") : 40;
const HEADER_MIN_HEIGHT = 100;
const HEADER_MAX_HEIGHT = 200;
const list = [
  {
    title: "Linked Accounts",
    icon: "account-balance-wallet",
    color: theme.scheme.royal_blue,
    toggle: false
  },
  {
    title: "Budget",
    icon: "attach-money",
    color: theme.scheme.fuchsia_blue,
    toggle: false
  },
  {
    title: "Authentication",
    icon: "lock",
    color: theme.scheme.green,
    toggle: false
  }, 
  {
    title: "Dark Mode",
    icon: "invert-colors",
    color: theme.scheme.dark_grey,
    toggle: true
  },  
  {
    title: "About",
    icon: "info",
    color: theme.scheme.cerise,
    toggle: false
  },  
  {
    title: "Contact",
    icon: "mail",
    color: theme.scheme.supernova,
    toggle: false
  },  
  {
    title: "Sign Out",
    icon: "exit-to-app",
    color: theme.scheme.crusta,
    toggle: false
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




  componentWillMount() {
    this.mounted = true;
    this.startHeaderHeight = 80;
    if (Platform.OS == "android") {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
    }
    for (var i = 1; i <= 75; i++) {
      this.array.push(i);
    }
    console.log(this.props.user.photoURL);
  }

  render() {
    const renderMenu = 
      list&& list.map(item => (
  
        <TouchableOpacity
            key={item.title}
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
                icon={{  name:item.icon, color: 'white'}}
                size="medium"
                avatarStyle={{backgroundColor: item.color}}
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
              {item.toggle? 
              <Switch />
              :
              <Icon name="ios-arrow-forward" size={26} color={"#E1E1E1"} />
              }
            </View>
          </TouchableOpacity>
    ));
    
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
            marginLeft: 30,
            marginTop: 0
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
              size="large"
              title={"CR"}
              source={this.props.user.photoURL ? {uri:this.props.user.photoURL} : null}
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
          <View style={{ flex: 5, flexDirection: "column", marginLeft: 25 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "500",
                color: theme.colors.gray,
                paddingBottom: 10,
              }}
            >
              {/* {this.state.firstname + ' ' + this.state.lastname} */}
              {/* {'Charlie' + " " + 'Rillstone'} */}
              {this.props.user.displayName}
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "400",
                color: "#5B7282"
              }}
            >
              {/* {this.state.email} */}
              {/* {'charlierillstone@gmail.com'} */}
              {this.props.user.email}
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
            {renderMenu}

        
          </ScrollView>
  
          <Animated.View style={[styles.animatedHeaderContainer, { height: headerHeight, backgroundColor: theme.scheme.wedgewood }]}>
            <Animated.Text style={[styles.headerText, {fontSize: fontSize}]}>Settings</Animated.Text>
          </Animated.View>
  
        </SafeAreaView>
    );
  }
}
export default connect(mapStateToProps)(Settings);

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
