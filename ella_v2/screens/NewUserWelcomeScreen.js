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
  Dimensions
} from "react-native";
import * as theme from "../theme";
import Icon from "react-native-vector-icons/Ionicons";
import Carousel, { Pagination } from "react-native-snap-carousel";
import IntroSlider from "../components/IntroSlider";
import { Transition } from "react-navigation-fluid-transitions";
import * as Animatable from "react-native-animatable";
import { Button, Input } from "react-native-elements";
import PropTypes from "prop-types";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

class NewUserWelcomeScreen extends Component {
  mounted = false;
  constructor(props) {
    super();
    this.state = {
      activeSlide: 0,
      animationType: "slideInDown"
    };
    this.props = props;
    this.init();
  }
  init() {
    this.state = {
      slides: [
        {
          id: 1,
          image: require("../assets/images/slide_1.png"),
          title: "This is a title for 1",
          text: "this is the text under the title. Placeholder text for 1."
        },
        {
          id: 2,
          image: require("../assets/images/slide_2.png"),
          title: "This is a title for 2",
          text: "this is the text under the title. Placeholder text for 2."
        },
        {
          id: 3,
          image: require("../assets/images/slide_3.png"),
          title: "This is a title for 3",
          text: "this is the text under the title. Placeholder text for 3."
        }
      ],
      activeSlide: 0,
      animationType: "fadeInDown",
      animationType2: "fadeIn",
      showLogo: true,
      showStart: false
    };
  }

  _renderItem({ item, index }) {
    return <IntroSlider data={item} />;
  }

  componentWillMount() {
    this.mounted = true;
    this.startHeaderHeight = 80;
    if (Platform.OS == "android") {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
    }
  }
  componentDidMount() {
    setTimeout(
      () =>
        this.setState({ animationType: "fadeOut", animationType2: "fadeOut" }),
      3000
    );
    setTimeout(() => this.setState({ showLogo: false }), 3200);
  }

  get pagination() {
    const { slides, activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={slides.length}
        activeDotIndex={activeSlide}
        containerStyle={{ backgroundColor: "transparent" }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: "#F6699A"
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  render() {
    return (
      <Transition shared="back">
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
          <StatusBar barStyle="dark-content" />
          <Animatable.View
            animation={this.state.animationType}
            duration={700}
            delay={900}
            useNativeDriver
            style={{
              flex: 2,
              flexDirection: "column",
              alignContent: "flex-end",
              justifyContent: "flex-end",
              display: this.state.showLogo ? "block" : "none"
            }}
          >
            <Transition shared="logo">
              <Image
                style={[styles.backgroundImage]}
                source={require("../assets/images/ella_logo_text_pink.png")}
              />
            </Transition>
          </Animatable.View>
          <Animatable.View
            animation={this.state.animationType2}
            duration={800}
            delay={1500}
            useNativeDriver
            style={{
              flex: 1,
              flexDirection: "column",
              alignContent: "flex-start",
              justifyContent: "flex-start",
              alignItems: "center",
              display: this.state.showLogo ? "block" : "none"
            }}
          >
            {/* <Text style={{fontWeight: '900', fontSize: 40, color: '#3F4F5A'}}>Hello, there!</Text> */}
            <Text style={{ fontWeight: "900", fontSize: 40, color: "#3F4F5A" }}>
              Hello,
              <Text style={{ color: "#F6699A" }}> there!</Text>
            </Text>
          </Animatable.View>

          <Animatable.View
            animation="fadeInRight"
            duration={900}
            delay={3500}
            useNativeDriver
            style={{
              flex: 1,
              flexDirection: "column",
              alignContent: "flex-end",
              justifyContent: "flex-end"
              //   backgroundColor: 'brown'
            }}
          >
            <Carousel
              autoplay
              lockScrollWhileSnapping
              enableMomentum={false}
              autoplayDelay={2500}
              sliderWidth={viewportWidth}
              ref={'carousel'}
              containerCustomStyle={{
                flexGrow: 0
              }}
              //   sliderHeight={viewportWidth-120}
              itemWidth={viewportWidth - 60}
              autoplayInterval={2500}
              data={this.state.slides}
              renderItem={this._renderItem.bind(this)}
              onSnapToItem={index => {
                this.setState({ activeSlide: index });
                index == this.state.slides.length - 1
                  ? this.setState({ showStart: true })
                  : this.setState({ showStart: false });
              }}
            />
            <View
              style={{
                marginHorizontal: 30,
                flex: 1,
                flexDirection: "column",
                // alignContent: "flex-start",
                // justifyContent: "flex-start",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "900",
                  fontSize: 30,
                  color: "#3F4F5A"
                }}
              >
                {this.state.slides[this.state.activeSlide].title}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "400",
                  fontSize: 20,
                  color: "#3F4F5A"
                }}
              >
                {this.state.slides[this.state.activeSlide].text}
              </Text>
            </View>
            <View style={{ flex: 3 }}>{this.pagination}</View>
          </Animatable.View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
              width: viewportWidth,
              marginBottom: 20,
              display: this.state.showLogo ? "none" : "block"
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "flex-start",
                display: this.state.showStart ? "none" : "block"
              }}
            >
              <Text onPress={() => { this.refs.carousel.snapToItem(2); }}
                style={{
                    fontWeight: "400",
                    fontSize: 15,
                  color: "#C1C1C2"
                }}
              >
                Skip
              </Text>
            </View>
            <Text onPress={() => this.props.navigation.navigate("SignIn")}
              style={{
                display: this.state.showStart ? "flex" : "none",
                fontWeight: "600",
                fontSize: 19,
                color: "#F6699A"
              }}
            >
              Get started
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "flex-end",
                display: this.state.showStart ? "none" : "block"
              }}
            >
              <Text onPress={() => { this.refs.carousel.snapToNext(); }}
                style={{
                    fontWeight: "400",
                    fontSize: 15,
                  color: "#F6699A"
                }}
              >
                Next
              </Text>
            </View>
          </View>

          {/* <Animatable.View
            animation="fadeIn"
            duration={900}
            delay={900}
            useNativeDriver
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
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
                  titleStyle={{ fontWeight: "bold", color: "#FFF" }}
                  icon={
                    <Icon name="ios-arrow-forward" size={30} color="white" />
                  }
                  onPress={() => this.props.navigation.navigate("SignIn")}
                />
              </Transition>
            </View>
            <Button
          buttonStyle={styles.button}
          titleStyle={{fontWeight: 'bold', color: '#FFF'}}
            title="SIGN UP"
            onPress={() => this.props.navigation.navigate("SignUp")}
          />
          </Animatable.View> */}
        </SafeAreaView>
      </Transition>
    );
  }
}
export default NewUserWelcomeScreen;

const styles = StyleSheet.create({

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
    borderRadius: 30,
    width: 60,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
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
  }
});
