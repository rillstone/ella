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
import * as theme from "../../../theme";
import Icon from "react-native-vector-icons/Ionicons";
import Carousel, { Pagination } from "react-native-snap-carousel";
import IntroSlider from "../../../components/IntroSlider";
import { Transition } from "react-navigation-fluid-transitions";
import * as Animatable from "react-native-animatable";
import { Button, Input } from "react-native-elements";
import PropTypes from "prop-types";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

class PlannerIntro extends Component {
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
          image: require("../../../assets/images/slide_1.png"),
          title: "Meal planning",
          text: "Can't think what's healthy, cheap and tasty?"
        },
        {
          id: 2,
          image: require("../../../assets/images/slide_2.png"),
          title: "Meal delivery",
          text: "Want do just handle the cooking?"
        },
        {
          id: 3,
          image: require("../../../assets/images/slide_3.png"),
          title: "Ella wants to help you live your best lifestyle",
          text: "Let us get to know you a bit more so we can get started"
        }
      ],
      activeSlide: 0,
      animationType: "fadeInDown",
      animationType2: "fadeIn",
      showLogo: false,
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
      500
    );
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
          backgroundColor: theme.scheme.green
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
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.back }}>
          <StatusBar barStyle="dark-content" />



          <Animatable.View
            animation="fadeInRight"
            duration={900}
            delay={0}
            useNativeDriver
            style={{
              flex: 1,
              flexDirection: "column",
              alignContent: "flex-end",
              justifyContent: "flex-end",
                backgroundColor: 'transparent'
            }}
          >
            <Carousel
              autoplay
              lockScrollWhileSnapping
              enableMomentum={false}
              autoplayDelay={900}
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
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "600",
                  fontSize: 24,
                  color: "#3F4F5A",

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
            <View style={{ flex: 3, marginTop: 20 }}>{this.pagination}</View>
          </Animatable.View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
              width: viewportWidth,
              marginBottom: 40,
              display: this.state.showLogo ? "none" : "flex"
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "flex-start",
                display: this.state.showStart ? "none" : "flex"
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
            <Text onPress={() => this.props.navigation.navigate("PlannerInitQuestions")}
              style={{
                display: this.state.showStart ? "flex" : "none",
                fontWeight: "600",
                fontSize: 19,
                color: theme.scheme.green
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
                display: this.state.showStart ? "none" : "flex"
              }}
            >
              <Text onPress={() => { this.refs.carousel.snapToNext(); }}
                style={{
                    fontWeight: "400",
                    fontSize: 15,
                  color: theme.scheme.ufo_green
                }}
              >
                Next
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </Transition>
    );
  }
}
export default PlannerIntro;

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
