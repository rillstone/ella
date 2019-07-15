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
  Alert,
  TouchableOpacity
} from "react-native";
import * as theme from "../theme";
import Icon from "react-native-vector-icons/Ionicons";
import { Button, Input } from "react-native-elements";
import { Transition } from "react-navigation-fluid-transitions";
import * as firebase from "firebase";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
class SignUpScreen extends Component {
  mounted = false;
  constructor(props) {
    super();
    this.state = {
      email: "",
      password: "",
      passwordConfirm: "",
      firstName: "",
      lastName: "",
      loading: false
    };
    this.props = props;
  }

  signUpPress() {
    if (this.state.password !== this.state.passwordConfirm) {
      Alert.alert("Passwords do not match");
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        authData => {
          this._signInAsync();
          var user = firebase.auth().currentUser;
          user
            .updateProfile({
              displayName: this.state.firstName + " " + this.state.lastName
            })
            .then(function() {
              // Update successful.
            })
            .catch(function(error) {
              // An error happened.
            });
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
  backPress = async () => {
    console.log("pressed");
    // await AsyncStorage.clear();
    this.props.navigation.navigate("SignIn");
  };
  componentWillMount() {
    this.mounted = true;
    this.startHeaderHeight = 80;
    if (Platform.OS == "android") {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
    }
  }

  render() {
    return (
      // <Transition shared="back">
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TouchableOpacity
          onPress={() => this.backPress()}
          style={{
            position: "absolute",
            zIndex: 9999,
            top: 60,
            left: 20,
            width: 30
          }}
        >
          <Icon name="ios-arrow-back" size={40} color={"#F6699A"} />
        </TouchableOpacity>
        <DismissKeyboard>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignContent: "flex-end",
              justifyContent: "flex-end"
            }}
          >
            <Transition shared="logo">
              <Image
                style={[styles.backgroundImage]}
                source={require("../assets/images/ella_logo_text_pink.png")}
              />
            </Transition>
          </View>
        </DismissKeyboard>
        <DismissKeyboard>
          <KeyboardAvoidingView
            behavior="padding"
            enabled
            style={{
              flex: 2,
              flexDirection: "column",
              alignContent: "center",
              justifyContent: "flex-start"
            }}
          >
            {/* <Animatable.View
                animation="slideInUp"
                duration={700}
                delay={300}
                useNativeDriver
              > */}
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCompleteType="name"
              placeholderTextColor={"#FFF"}
              autoCompleteType="email"
              keyboardType="default"
              placeholder="first name"
              textContentType="givenName"
              onChangeText={text => {
                this.setState({ firstName: text });
              }}
            />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              placeholderTextColor={"#FFF"}
              keyboardType="default"
              autoCompleteType="name"
              placeholder="last name"
              textContentType="familyName"
              onChangeText={text => {
                this.setState({ lastName: text });
              }}
            />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              placeholderTextColor={"#FFF"}
              keyboardType="email-address"
              autoCompleteType="email"
              placeholder="email"
              textContentType="emailAddress"
              onChangeText={text => {
                this.setState({ email: text });
              }}
            />
            <TextInput
              style={styles.input}
              placeholderTextColor={"#FFF"}
              placeholder="password"
              secureTextEntry
              textContentType="password"
              onChangeText={text => {
                this.setState({ password: text });
              }}
            />
            <TextInput
              style={styles.input}
              placeholderTextColor={"#FFF"}
              placeholder="repeat password"
              secureTextEntry
              textContentType="password"
              onChangeText={text => {
                this.setState({ passwordConfirm: text });
              }}
            />
            {/* </Animatable.View> */}

            <View
              style={{
                flex: 0.8,
                top: 40,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Transition delay={500} shared="enter">
                <Button
                  buttonStyle={styles.button}
                  // raised
                  loading={this.state.loading}
                  titleStyle={{ fontWeight: "bold", color: theme.colors.back }}
                  icon={
                    <Icon name="ios-arrow-forward" size={30} color="white" />
                  }
                  onPress={() => {
                    this.signUpPress();
                    this.setState({ loading: true });
                  }}
                />
              </Transition>
            </View>
          </KeyboardAvoidingView>
        </DismissKeyboard>
      </SafeAreaView>
      // </Transition>
    );
  }
}
export default SignUpScreen;

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    width: 60,

    justifyContent: "center",
    alignItems: "center",
    height: 60,
    backgroundColor: "#F6699A",
    shadowColor: "#F6699A",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 0
  },
  input: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6699A70",
    borderBottomWidth: 0,

    paddingLeft: 10,
    height: 40,
    borderRadius: 10,
    margin: 10,
    marginHorizontal: 30
  },
  backgroundImage: {
    bottom: 80,
    flex: 0.8,
    width: null,
    alignContent: "flex-end",
    justifyContent: "flex-end",
    height: null,
    resizeMode: "contain"
  }
});
