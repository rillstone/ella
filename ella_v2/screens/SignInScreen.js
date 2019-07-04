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
import * as theme from "../theme";
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/Ionicons";
import { Button, Input } from "react-native-elements";
import { Transition } from "react-navigation-fluid-transitions";
import PropTypes from "prop-types";
import * as firebase from 'firebase';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
class SignInScreen extends Component {
  mounted = false;
  constructor(props) {
    super();
    this.state = { 
      email: "",
      password: "",
      loading: false,
    };
    this.props = props;
  }

  loginPress() {
    Keyboard.dismiss();
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => { this._signInAsync();}, (error) => { Alert.alert(error.message); });
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'App');
    this.props.navigation.navigate('App');
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
      <Transition shared="back">
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
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
                flex: 1,
                flexDirection: "column",
                alignContent: "center",
                justifyContent: "flex-start"
              }}
            >
              <Animatable.View
                animation="slideInUp"
                duration={700}
                delay={300}
                useNativeDriver
              >
                <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  placeholderTextColor={"#FFF"}
                  keyboardType="email-address"
                  placeholder="username"
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
              </Animatable.View>
              <Animatable.View
                style={{
                  alignContent: "center",
                  justifyContent: "center",
                  alignItems: "center"
                }}
                animation="fadeIn"
                duration={900}
                delay={800}
                useNativeDriver
              >
                <Text style={styles.new_user}>
                  New user?{" "}
                  <Text
                    onPress={() => this.props.navigation.navigate("SignUp")}
                    style={{ color: "#F6699A" }}
                  >
                    Sign up
                  </Text>
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
                <Transition delay={500} shared="enter">
                  <Button
                    buttonStyle={styles.button}
                    // raised
                    loading={this.state.loading}

                    titleStyle={{ fontWeight: "bold", color: "#FFF" }}
                    icon={
                      <Icon name="ios-arrow-forward" size={30} color="white" />
                    }
                    onPress={() => { this.loginPress(); this.setState({loading:true}) }}
                  />
                </Transition>
              </View>
            </KeyboardAvoidingView>
          </DismissKeyboard>
        </SafeAreaView>
      </Transition>
    );
  }
}
export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6f5f7"
  },
  titleContain: {
    paddingLeft: 20,
    paddingTop: 20,
    flex: 1
  },
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
    // borderWidth: .5,
    // borderColor: '#000',
    paddingLeft: 10,
    height: 40,
    borderRadius: 10,
    margin: 10,
    marginHorizontal: 30
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
  },
  title: {
    fontSize: theme.sizes.title,
    fontWeight: "800",
    color: theme.colors.gray
  },
  subtitle: {
    fontSize: theme.sizes.subtitle,
    fontWeight: "700",
    color: theme.colors.gray
  },
  subtitle_two: {
    fontSize: theme.sizes.subtitle_two,
    fontWeight: "600",
    color: theme.colors.gray
  },
  microtitle: {
    fontSize: theme.sizes.microsub,
    fontWeight: "600",
    color: theme.colors.warn
  },
  slider: {
    marginTop: 15,
    overflow: "visible" // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10 // for custom animation
  },
  paginationContainer: {
    paddingVertical: 8
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8
  },
  balanceCont2: {
    // position: 'absolute',

    // flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: 20,
    right: 20,
    bottom: 0
    // backgroundColor: 'yellow',
    // flex: 5
    // height: 90,
  },
  balance2: {
    // flexDirection: 'column',
    // position: 'relative',
    borderRadius: theme.sizes.radius,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    // bottom: 0,
    // left: 0,
    // top: 15,

    height: 70
    // marginBottom: 10
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 0
  }
});
