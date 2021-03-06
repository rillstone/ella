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
import * as theme from "../../theme";
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
            height: viewportHeight * 0.9,
            padding: 20,
            paddingTop: 50,
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
                        <Text
            style={{
              fontSize: 40,
              fontWeight: "400",
              color: theme.colors.gray,
              left: 15,
              bottom: 10
            }}
          >
            Sign Up
          </Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCompleteType="name"
            placeholderTextColor={"#778ca270"}
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
            placeholderTextColor={"#778ca270"}
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
            placeholderTextColor={"#778ca270"}
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
            placeholderTextColor={"#778ca270"}
            placeholder="password"
            secureTextEntry
            textContentType="password"
            onChangeText={text => {
              this.setState({ password: text });
            }}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor={"#778ca270"}
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
            <Button
              buttonStyle={styles.button}
              // raised
              loading={this.state.loading}
              titleStyle={{ fontWeight: "bold", color: theme.colors.back }}
              icon={<Icon name="ios-arrow-forward" size={30} color="white" />}
              onPress={() => {
                this.signUpPress();
                this.setState({ loading: true });
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
export default SignUpScreen;

const styles = StyleSheet.create({
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
    bottom: 80,
    flex: 0.8,
    width: null,
    alignContent: "flex-end",
    justifyContent: "flex-end",
    height: null,
    resizeMode: "contain"
  }
});
