import { TabBarBottom } from 'react-navigation';
import { dispatch, connect, Provider } from "../store";
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
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Animated
} from "react-native";
import * as theme from "../theme";
import Icon from "react-native-vector-icons/Ionicons";
const activeColor = theme.scheme.crusta;
const inactiveColor = "#B2B2B2";
const mapStateToProps = state => ({
  user: state.user,
  colors: state.colors
  // put the stuff here you want to access from the global store
  // then instead of calling it from "this.state.<var>" call it from "this.props.<var>"
});

class CustomTabNav extends Component {
  constructor(props) {
    super();
    this.state = {
    };
    this.props = props;
  }

  
  render() {
console.log(this.props.navigation.state);
    return (
        // <TabBarBottom
        // {...this.props}
        // style={{
        // backgroundColor: "#ffffff"
        // }}
        // />
        <View style={{height:80, backgroundColor: this.props.colors.back, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, paddingTop: 10}}>
            <TouchableOpacity style={{width:30, height: 30, marginHorizontal:10}} onPress={() => this.props.navigation.navigate('HomeStack')}>
            <Icon
        name="ios-today"
        size={30}
        color={this.props.navigation.state.index==0 ? activeColor : inactiveColor}
      />
            </TouchableOpacity>
            <TouchableOpacity style={{width:30, height: 30, marginHorizontal:10}} onPress={() => this.props.navigation.navigate('PlannerSwitchNavigator')}>
            <Icon
        name="ios-heart"
        size={30}
        color={this.props.navigation.state.index==1 ? theme.scheme.green : inactiveColor}
      />
            </TouchableOpacity>
            <TouchableOpacity style={{width:30, height: 30, marginHorizontal:10}} onPress={() => this.props.navigation.navigate('TransactionsStack')}>
            <Icon
        name="ios-card"
        size={30}
        color={this.props.navigation.state.index==2 ? theme.scheme.cerise : inactiveColor}
      />
            </TouchableOpacity>
            <TouchableOpacity style={{width:30, height: 30, marginHorizontal:10}} onPress={() => this.props.navigation.navigate('SettingsStack')}>
            <Icon
        name="ios-settings"
        size={30}
        color={this.props.navigation.state.index==3 ? '#3F4F5A' : inactiveColor}
      />
            </TouchableOpacity>


        </View>
    );  

  }
}
export default connect(mapStateToProps)(CustomTabNav);

