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
import RNListSlider from "react-native-list-slider";
import * as theme from "../../../theme";
import Icon from "react-native-vector-icons/Ionicons";
import * as Animatable from "react-native-animatable";
import { getInset } from "react-native-safe-area-view";
import Carousel from "react-native-snap-carousel";
import MealServicePlanSliderEntry, {
  sliderWidth,
  itemWidth
} from "../../../components/planner/MealServicePlanSliderEntry";
import * as ntw from "number-to-words";
import { NavigationActions } from "react-navigation";
import { Button, Input } from "react-native-elements";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
const IS_IOS = Platform.OS === "ios";
function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
const TOP_SAFE_AREA = Platform.OS === "ios" ? getInset("top") : 40;
const BOTTOM_SAFE_AREA = Platform.OS === "ios" ? getInset("bottom") : 40;
const HEADER_MAX_HEIGHT = 400;
const nouns = {
  1: "Single",
  2: "Double",
  3: "Triple",
  4: "Family"
};
class MealSizeCount extends Component {
  mounted = false;
  constructor(props) {
    super();
    this.state = { value: 1 };
    this.props = props;
    this._carousel = {};
  }

  _renderItem({ item, index }) {
    return (
      <MealServicePlanSliderEntry
        navigation={this.props.navigation}
        data={item}
      />
    );
  }

  componentWillMount() {
    this.mounted = true;
    this.startHeaderHeight = 80;
    if (Platform.OS == "android") {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
    }
  }
  onValueChanged = value => this.setState({ value });
  render() {
    const { navigation } = this.props;
    // const { navigation } = this.props;
    const data = navigation.getParam("data", {});

    return (
      <View style={styles.fill}>
        <StatusBar hidden={true} />

        <TouchableOpacity
          onPress={() => {
            this.setState({ scrollOp: 0 });
            this.props.navigation.dispatch(NavigationActions.back());
          }}
          style={{
            position: "absolute",
            left: 25,
            top: 25,
            zIndex: 999,
            opacity: 0.5
          }}
        >
          <Icon
            name="ios-arrow-dropleft-circle"
            size={36}
            color={theme.colors.white}
          />
        </TouchableOpacity>
        <ImageBackground
          source={data.images.background}
          style={{
            flex: 1,
            alignItems: "center",
            alignContent: "center",
            flexDirection: "column",
            paddingBottom: viewportHeight / 2,
          }}
          imageStyle={{ resizeMode: "cover" }}
        >
            <View style={styles.overlay} />
          <View
            style={{
              flex: 0.3,
              justifyContent: "center",
              alignContent: "center",
              marginHorizontal: 30,
              top: viewportHeight / 5
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "800",
                fontSize: 50,
                color: "#FFF"

              }}
            >
              Plans
            </Text>
          </View>
          {/* <View
          style={{
            flex: 1,
            alignItems: "center",
            alignContent: "center",
            flexDirection: "column",
            backgroundColor: theme.scheme.crusta,
            paddingBottom: viewportHeight / 3
          }}
        > */}

          {/* </View> */}
        </ImageBackground>
        <Animatable.View
          animation={"fadeInUpBig"}
          duration={600}
          delay={50}
          useNativeDriver
          style={styles.scrollOver}
        >
          <View
            style={{
              overflow: "hidden",
              elevation: 1,
              //   position: "relative",
              flex: 1,
              borderRadius: 10,
              backgroundColor: "transparent"
            }}
          >
            <View style={{ flex: 1, top: 20 }}>
              <Carousel
                ref={c => {
                  this._carousel = c;
                }}
                data={data.plans}
                renderItem={this._renderItem.bind(this)}
                removeClippedSubviews={false}
                inactiveSlideShift={0}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
                enableSnap
                activeSlideAlignment={"start"}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={{
                  paddingVertical: 10,
                  paddingLeft: 15
                }}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                layout={"default"}
                firstItem={0}
              />
            </View>
          </View>
        </Animatable.View>
      </View>
    );
  }
}
export default MealSizeCount;

const styles = StyleSheet.create({
  fill: {
    flex: 1
  },
  scrollOver: {
    width: viewportWidth,
    height: viewportHeight / 2,
    bottom: 0,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    shadowColor: "#6b6b6b",
    shadowOffset: {
      width: 0,
      height: -1
    },
    position: "absolute",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 1,
    // overflow: 'hidden',
    zIndex: 10000,
    backgroundColor: "white"
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  slider: {
    // marginTop: 15,
    overflow: "visible" // for custom animations
  },
  button: {
    borderRadius: 30,
    width: 60,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    height: 60,
    backgroundColor: theme.scheme.crusta,
    shadowColor: theme.scheme.crusta,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 0
  },
  toggleFill: {
    height: 5,
    backgroundColor: "#FFF",
    margin: 4,
    borderColor: "#FFF"
  },
  toggleEmpty: {
    height: 5,
    backgroundColor: "transparent",
    margin: 4,
    borderColor: "#FFF"
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    overflow: "hidden",
    height: HEADER_MAX_HEIGHT
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: "cover"
  },
  bar: {
    backgroundColor: "transparent",
    marginTop: Platform.OS === "ios" ? 40 : 38,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
  },
  title2: {
    color: "white",
    fontSize: 18
  },
  scrollViewContent: {
    // marginTop: HEADER_MAX_HEIGHT
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: "#D3D3D3",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    color: theme.colors.gray,
    fontSize: 30,
    fontWeight: "500",
    alignContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    textAlign: "left",
    letterSpacing: 0.5,
    // textAlignVertical: 'center',
    left: 0
  },
  date: {
    color: theme.colors.gray,
    fontSize: 18,
    fontWeight: "400",
    alignContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    textAlign: "left",
    letterSpacing: 0.5,
    // textAlignVertical: 'center',
    left: 1
  },
  menu: {
    bottom: BOTTOM_SAFE_AREA
  },

  // title: {
  //   fontSize: theme.sizes.title,
  //   fontWeight: "800",
  //   color: theme.colors.gray
  // },
  imageContainer: {
    flex: 1,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    // backgroundColor: 'blue',
    overflow: "hidden"
    // borderTopLeftRadius: 12,
    // borderBottomLeftRadius: 12
  }
});
