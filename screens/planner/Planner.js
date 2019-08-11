import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Dimensions,
  ScrollView,
  Animated
} from "react-native";
import * as theme from "../../theme";
import Carousel from "react-native-snap-carousel";
import SliderEntry, { sliderWidth, itemWidth } from "./SliderEntry";

import { LinearGradient } from 'expo-linear-gradient';
import SliderEntryUpcoming, {
  sliderWidthSmall,
  itemWidthSmall
} from "./SliderEntryUpcoming";
import { getInset } from "react-native-safe-area-view";
import { Defs, Stop } from "react-native-svg";
import { Paragraph, Box } from "rn-placeholder";
import mfb from "../../assets/mfb.json";
import moment from "moment";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
const IS_IOS = Platform.OS === "ios";
const TOP_SAFE_AREA = Platform.OS === "ios" ? getInset("top") : 40;
const HEADER_MAX_HEIGHT = 150;
const HEADER_MIN_HEIGHT = Platform.OS === "ios" ? 120 : 120;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const safetyZone = HEADER_MAX_HEIGHT;
class Planner extends Component {
  mounted = false;
  constructor(props) {
    super();
    this.state = {
      errors: [],
      loading: false,
      loaded: false,
      scrollY: new Animated.Value(0),
      data: [],
      colors: ["url(#gradient)", "#CBCCCF"],
      keys: ["current", "average"]
    };
    this.props = props;

    this._carousel = {};
    this._carouselSmall = {};
    this.sum = 0;
  }

  _renderItem({ item, index }) {
    return <SliderEntry navigation={this.props.navigation} data={item} />;
  }

  _renderUpcomingItem({ item, index }) {
    return (
      <SliderEntryUpcoming navigation={this.props.navigation} data={item} />
    );
  }

  componentWillMount() {
    this.mounted = true;
    this.startHeaderHeight = 80;
    if (Platform.OS == "android") {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
    }
  }

  componentDidMount() {
    setTimeout(() => this.setState({ loading: true }), 0);
  }
  _onLoad = () => {
    this.setState(() => ({ loaded: true }));

  };

  render() {
    const thisWeek = mfb.deliveryDays[0];
    const headerTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE * 2],
      outputRange: [0, -(HEADER_SCROLL_DISTANCE * 3)],
      extrapolate: "clamp"
    });
    const inputTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE * 5],
      outputRange: [0, -(HEADER_SCROLL_DISTANCE * 6 + 5)],
      extrapolate: "clamp"
    });
    // console.log(mfb.deliveryDays[0].orders[0].recipes);
    const weekCarousels = (
      <View
        key={thisWeek.date}
        style={[styles.carouselItem, {  }]}
      >
        {console.log()}
        <Text style={styles.subtitle_two}>This Week</Text>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          key={thisWeek.date}
          data={thisWeek.orders[0].recipes}
          renderItem={this._renderItem.bind(this)}
          inactiveSlideShift={0}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          enableSnap
          activeSlideAlignment={"start"}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={{ paddingVertical: 10, paddingLeft: 15 }}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          layout={"default"}
          firstItem={0}
        />
      </View>
    );
    const upComingMeals = mfb.deliveryDays.slice(1);
    const upcomingCarousels =
      upComingMeals &&
      upComingMeals.map(week => (
        <View key={week.date} style={styles.carouselItem}>
          {console.log()}
          <Text style={styles.subtitle_two}>
            {moment(week.date.substring(1), " YYYY-MM-DD").format("Do MMMM")}
          </Text>
          <Carousel
            ref={cSmall => {
              this._carouselSmall = cSmall;
            }}
            key={week.date}
            data={week.orders[0].recipes}
            renderItem={this._renderUpcomingItem.bind(this)}
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
            itemWidth={itemWidthSmall}
            layout={"default"}
            firstItem={0}
          />
        </View>
      ));
    return (
      <SafeAreaView style={styles.outContainer}>
        {/* <LinearGradient
          colors={[theme.scheme.green, theme.scheme.sunglow]}
          start={[0.2,0.3]}
          end={[1,1]}
          style={{ position: 'absolute', height: viewportHeight, width: viewportWidth, zIndex: 0}}>

          </LinearGradient> */}
        <ImageBackground
          resizeMode="stretch"
          source={this.state.loaded? require("../../assets/images/tran_screen_back_green.png") : require("../../assets/images/plan_screen_back_grey.png")}
          style={[styles.header]}
          onLoad={this._onLoad}
        >
          <Animated.View style={[styles.titleContain, {transform: [{ translateY: inputTranslate }]}]}>
            <Text style={styles.title}>Planner</Text>
            <Text style={styles.subtitle}>Meal suggestions</Text>
          </Animated.View>
        </ImageBackground>
        <Animated.ScrollView
          style={styles.carousel}
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true }
          )}
        >
          <View     style={{   backgroundColor: theme.colors.back,    borderTopLeftRadius: 12,
              borderTopRightRadius: 12, top: viewportHeight / 4 - TOP_SAFE_AREA,}}>


            {weekCarousels}
         
            {upcomingCarousels}
            <View style={{paddingBottom:100}} />
          </View>
        </Animated.ScrollView>
      </SafeAreaView>
    );
  }
}
export default Planner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    zIndex: 9999,
    backgroundColor: "transparent",
    overflow: "visible",
    height: "25%",
    width: viewportWidth,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  header: {
    position: "absolute",
    // flex:0.5,
    // alignSelf: 'center',
    zIndex: 0,
    alignItems: "center",
    justifyContent: "flex-start",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    overflow: "visible",
    shadowColor: "#6b6b6b",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    height: viewportHeight / 4
    // borderBottomWidth: 0.5,
    // borderColor: "#00000020"
  },
  fill: {
    flex: 1,
    // top:0,
    bottom: 0,
    backgroundColor: "transparent",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: "hidden",
    height: viewportHeight
    // marginTop: HEADER_MAX_HEIGHT
  },
  outContainer: {
    flex: 1,
    backgroundColor: theme.colors.back
  },
  carousel: {
    flex: 1,
    bottom: 0,

    // top: viewportHeight / 5.5,
    backgroundColor: 'transparent',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: "hidden",
    height: viewportHeight
  },
  carouselItem: {
    paddingTop: 20
  },
  titleContain: {
    marginTop: TOP_SAFE_AREA + 40,
    alignItems: "flex-start",
    width: viewportWidth * 0.9
  },
  title: {
    fontSize: theme.sizes.title,
    fontWeight: "800",
    color: theme.colors.white
  },
  subtitle: {
    fontSize: theme.sizes.subtitle,
    fontWeight: "700",
    color: theme.colors.white
  },
  subtitle_two: {
    fontSize: 24,
    color: theme.colors.gray,
    paddingHorizontal: viewportWidth * 0.05,
    fontWeight: "800"
  },
  microtitle: {
    fontSize: theme.sizes.microsub,
    fontWeight: "600",
    color: theme.colors.warn
  },
  slider: {
    // marginTop: 15,
    overflow: "visible" // for custom animations
  },
  scroll: {
    justifyContent: "flex-start"
  }
});
