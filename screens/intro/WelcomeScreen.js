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
  KeyboardAvoidingView,
  TouchableHighlight,
  Alert
} from "react-native";
import * as theme from "../../theme";
import Icon from "react-native-vector-icons/Ionicons";
import { Transition } from "react-navigation-fluid-transitions";
import * as Animatable from "react-native-animatable";
import { Button, Input } from "react-native-elements";
import PropTypes from "prop-types";
import Modalize from "react-native-modalize";
import SignIn from '../../components/auth/SignIn';
import SignUp from '../../components/auth/SignUp';
import ForgottenPassword from '../../components/auth/ForgottenPassword';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

class WelcomeScreen extends Component {
  modal = React.createRef();
  mounted = false;
  constructor(props) {
    super();
    this.state = {
      email: "",
      password: "",
      loading: false,
      forgotten: false,
      modalVisible: false,
      create: false,
    };
    this.props = props;
  }
  renderContent = () => {
    return ( 
      this.state.create? <SignUp navigation={this.props.navigation}/> : this.state.forgotten? <ForgottenPassword callback={this.resetEmailSent} navigation={this.props.navigation}/>: <SignIn callback={this.forgottenPassword} navigation={this.props.navigation}/>  
    );
  }
  componentWillMount() {
    this.mounted = true;
    this.startHeaderHeight = 80;
    if (Platform.OS == "android") {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
    }
  }

  onClosed = () => {
    const { onClosed } = this.props;
    this.setState({
      forgotten: false,
      create:false
    });
    if (onClosed) {
      onClosed();
    }
  };

  openModal = () => {
    if (this.modal.current) {
      this.modal.current.open();
    }
  };

  closeModal = () => {
    if (this.modal.current) {
      this.modal.current.close();
    }
  };
  resetEmailSent = () => {
    this.closeModal();
    this.setModalVisible();
    this.setState({
      forgotten: false,
    });
  };

  setModalVisible() {
    Alert.alert(
  'Password Reset',
  'An email has been set to reset your password',
  [
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ],
  {cancelable: false},
);
  }
  forgottenPassword = () => {
    this.setState({
      forgotten: true,
    });
  };

  render() {
    return (
      <Transition shared="back">
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.back }}>
          <StatusBar barStyle="dark-content" />

          <Modalize
            ref={this.modal}
            onClosed={this.onClosed}
            adjustToContentHeight
            modalStyle={{borderRadius:12, backgroundColor: theme.colors.back,}}
          >
            {this.renderContent()}
          </Modalize>
          <Animatable.View
            animation="fadeIn"
            duration={900}
            delay={700}
            useNativeDriver
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
                source={require("../../assets/images/ella_logo_text_pink.png")}
              />
            </Transition>
          </Animatable.View>
          <Animatable.View
            animation="fadeIn"
            duration={900}
            delay={900}
            useNativeDriver
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              overflow: 'visible',
            }}
          >
            <View
              style={{
                flex: 0.8,
                top: 0,
                justifyContent: "center",
                overflow: 'visible',
                alignItems: "center",
                flexDirection: 'column',
              }}
            >
              <Transition delay={500} shared="enter">
                <Button
                  buttonStyle={styles.button}
                  containerStyle={{overflow: 'visible', padding: 10}}
                  // raised
                  title={'Sign In'}
                  titleStyle={{ fontWeight: "bold", color: "#FFF" }}
                  // icon={
                  //   <Icon
                  //     name="ios-arrow-forward"
                  //     size={35}
                  //     color="white"
                  //     style={{ left: 2, top: 2 }}
                  //   />
                  // }
                  // onPress={() => this.props.navigation.navigate("SignIn")}
                  onPress={() => this.openModal()}
                />
              </Transition>
              <Transition delay={500} shared="enter" >
                <Button
                  buttonStyle={[styles.button,{backgroundColor: theme.colors.inactive, shadowColor: theme.scheme.wedgewood}]}
                  containerStyle={{overflow: 'visible', padding: 10}}
                  // raised
                  title={'Create an Account'}
                  titleStyle={{ fontWeight: "bold", color: "#FFF" }}
                  // icon={
                  //   <Icon
                  //     name="ios-arrow-forward"
                  //     size={35}
                  //     color="white"
                  //     style={{ left: 2, top: 2 }}
                  //   />
                  // }
                  // onPress={() => this.props.navigation.navigate("SignIn")}
                  onPress={() => {
                    this.setState({create: true});

                      this.openModal();
                    
                  }
                }
                />
              </Transition>
            </View>
            {/* <Button
          buttonStyle={styles.button}
          titleStyle={{fontWeight: 'bold', color: '#FFF'}}
            title="SIGN UP"
            onPress={() => this.props.navigation.navigate("SignUp")}
          /> */}
          </Animatable.View>
        </SafeAreaView>
      </Transition>
    );
  }
}
export default WelcomeScreen;

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
  input: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fc5c6570",
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
    flex: 0.8,
    width: null,
    alignContent: "flex-end",
    justifyContent: "flex-end",
    height: null,
    resizeMode: "contain"

    // resizeMode: "cover"
  },
  button: {
    borderRadius: 12,
    width: viewportWidth*0.6,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginVertical:,
    // alignSelf: "center",
    height: 60,
    backgroundColor: "#E34455",
    shadowColor: "#E34455",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 1
  },
  // borderRadius: 10,
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
    shadowColor: "#6b6b6b",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 0
  }
});
