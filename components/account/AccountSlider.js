import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import PropTypes from "prop-types";
import * as theme from "../../theme";
import { Button, Avatar, Divider } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
export default class AccountSlider extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  constructor(props) {
    super();

    this.props = props;

   
  }
  
  
  render() {
    const {
      data: {dragHandler, firstName, lastName, email, icon,image},
    } = this.props;
    return (
          <View style={styles.container}>
            <View style={styles.dragHandler} {...dragHandler}>
              <View
                style={{
                  backgroundColor: "#F5F5F5",
                  width: viewportWidth,
                  height: 64,
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  shadowColor: "#6b6b6b",
                  shadowOffset: {
                    width: 0,
                    height: -1
                  },
                  shadowOpacity: 0.4,
                  shadowRadius: 2,
                  elevation: 0
                }}
              >
                <View style={{ flex: 1, alignSelf: "flex-start" }} />
                <View
                  style={{
                    flex: 2,
                    alignSelf: "center",
                    alignContent: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "600",
                      fontSize: 20,
                      color: theme.colors.gray,
                      textAlign: "center"
                    }}
                  >
                    Account
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignSelf: "center",
                    alignContent: "center",
                    justifyContent: "center"
                  }}
                >
                  <Button
                    title="done"
                    type="clear"
                    onPress={() => {
                      this.props.action()
                    }}
                    titleStyle={{ fontWeight: "600", fontSize: 20 }}
                    style={{ alignSelf: "center" }}
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
                margin: 20,
                marginTop: 40
              }}
              onPress={() => {this.props.editProfile()}}
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
              title={icon}
              source={{uri: image===""? null : image}}
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
              <View
                style={{ flex: 5, flexDirection: "column", marginLeft: 10 }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    color: theme.colors.gray
                  }}
                >
                  {/* {this.state.firstname + ' ' + this.state.lastname} */}
                  {firstName + ' ' + lastName}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "400",
                    color: "#5B7282"
                  }}
                >
                  {/* {this.state.email} */}
                  {email}
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
            <Divider
              style={{
                height: 1,
                width: viewportWidth - 50,
                backgroundColor: "#F5F5F5"
              }}
            />
            <View
              style={{
                flex: 2,
                alignContent: "flex-end",
                justifyContent: "flex-end",
                alignItems: "flex-end"
              }}
            >
              <Button
                type="clear"
                onPress={() => {
                  this.props.action();
                  this.props.signOut();
                }}
                title="Sign Out"
              />
              {/* <Text onPress={() => {this.panel.hide(); this.signoutPress();}}>Sign Out</Text> */}
            </View>
            <View style={{ flex: 0.1 }} />
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
  dragHandler: {
    alignSelf: "stretch",
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
    // alignContent: "flex-start",  justifyContent: "flex-start",alignSelf: "flex-start",
  }
});
