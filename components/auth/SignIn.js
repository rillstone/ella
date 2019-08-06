import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
  AsyncStorage,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from "react-native";
import * as theme from "../../theme";
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/Ionicons";
import { Button, Input } from "react-native-elements";

import { Transition } from "react-navigation-fluid-transitions";
import PropTypes from "prop-types";
import * as firebase from "firebase";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
class SignIn extends Component {
  mounted = false;
  constructor(props) {
    super();
    this.state = {
      email: "",
      password: "",
      loading: false
    };
    this.props = props;
  navigation  = this.props;
  }

  loginPress() {
    Keyboard.dismiss();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        () => {
          this._signInAsync();
        },
        error => {
          Alert.alert(error.message);
        }
      );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem("userToken", "App");

      this.props.navigation.navigate("App");

  };
  componentWillMount() {
    this.mounted = true;
    this.startHeaderHeight = 80;
    if (Platform.OS == "android") {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.colors.back,
          borderTopLeftRadius: 13,
          borderTopRightRadius: 13
        }}
      >
        <View
          style={{
            height: viewportHeight * 0.7,
            padding: 20,
            paddingTop: 50,
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "flex-start"
          }}
        >
          <Text
            style={{
              fontSize: 40,
              fontWeight: "400",
              color: theme.colors.gray,
              left: 15,
              bottom: 10
            }}
          >
            Sign In
          </Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            placeholderTextColor={"#778ca270"}
            keyboardType="email-address"
            placeholder="username"
            textContentType="emailAddress"
            onChangeText={text => {
              this.setState({ email: text });
            }}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor={"#778ca270"}
            placeholder="password"
            secureTextEntry
            textContentType="password"
            onChangeText={text => {
              this.setState({ password: text });
            }}
          />

          <Animatable.View
            style={{
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              top: 5
            }}
            animation="fadeIn"
            duration={900}
            delay={800}
            useNativeDriver
          >
            <Text
              onPress={() => this.props.callback()}
              style={{ color: "#fc5c65" }}
            >
              Forgotten password?
            </Text>
          </Animatable.View>

          <View
            style={{
              flex: 0.8,
              top: 40,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Button
              buttonStyle={styles.button}
              // raised
              loading={this.state.loading}
              titleStyle={{ fontWeight: "bold", color: "#FFF" }}
              icon={
                <Icon
                  name="ios-arrow-forward"
                  size={35}
                  color="white"
                  style={{ left: 2, top: 2 }}
                />
              }
              onPress={() => {
                this.loginPress();
                this.setState({ loading: true });
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
export default SignIn;

const styles = StyleSheet.create({
  new_user: {
    color: "#C9C9CE",
    fontSize: 14
  },
  button: {
    borderRadius: 30,
    width: 60,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    backgroundColor: "#E34455",
    shadowColor: "#E34455",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 0
  },
  input: {
    flexDirection: "row",
    color: theme.colors.gray,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#778ca280",
    borderBottomWidth: 1,
    // borderWidth: .5,
    borderColor: "#778ca280",
    // paddingLeft: 10,
    height: 50,
    // borderRadius: 10,
    margin: 10,
    marginHorizontal: 15
  },
  backgroundImage: {
    // position: "absolute",
    // top: 0,
    // left: 0,
    // right: 0,
    bottom: 80,
    flex: 0.8,
    width: null,
    alignContent: "flex-end",
    justifyContent: "flex-end",
    height: null,
    resizeMode: "contain"
  }
});
