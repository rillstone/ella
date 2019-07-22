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
  ScrollView
} from "react-native";
import * as theme from "../../theme";
import Carousel from "react-native-snap-carousel";
import SliderEntry, { sliderWidth, itemWidth } from "./SliderEntry";
import { Defs, LinearGradient, Stop } from "react-native-svg";
import mfb from "../../assets/mfb.json";
import moment from "moment";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
const Gradient = ({ index }) => (
  <Defs key={index}>
    <LinearGradient id={"gradient"} x1={"0%"} y={"0%"} x2={"0%"} y2={"100%"}>
      <Stop offset={"0%"} stopColor={"#D7D8DC"} stopOpacity={1} />
      <Stop offset={"100%"} stopColor={"#DFE0E4"} stopOpacity={0} />
    </LinearGradient>
  </Defs>
);
class Planner extends Component {
  mounted = false;
  constructor(props) {
    super();
    this.state = {
      errors: [],
      loading: false,
      data: [],
      colors: ["url(#gradient)", "#CBCCCF"],
      keys: ["current", "average"]
    };
    this.props = props;

    this._carousel = {};
    this.sum = 0;
  }

  _renderItem({ item, index }) {
    return <SliderEntry navigation={this.props.navigation} data={item} />;
  }

  componentWillMount() {
    this.mounted = true;
    this.startHeaderHeight = 80;
    if (Platform.OS == "android") {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
    }
  }

  componentDidMount() {
    setTimeout(() => this.setState({ loading: true }), 1000);
  }

  render() {
    // console.log(mfb.deliveryDays[0].orders[0].recipes);
    const weekCarousels = mfb.deliveryDays && mfb.deliveryDays.map((week) => (
      <React.Fragment key={week.date}>
        {console.log()}
        <Text style={styles.subtitle_two}>
          Meals for the week beginning {moment(week.date.substring(1), ' YYYY-MM-DD').format('Do MMMM')}:
        </Text>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          key={week.date}
          data={week.orders[0].recipes}
          renderItem={this._renderItem.bind(this)}
          inactiveSlideShift={0}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          enableSnap
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={{ paddingVertical: 10 }}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          layout={"default"}
          firstItem={0}
        />
      </React.Fragment>
    ));
    return (
      <SafeAreaView style={styles.outContainer}>
        <ImageBackground
          imageStyle={{ height: "40%" }}
          resizeMode="stretch"
          source={require("../../assets/images/tran_screen_back_green.png")}
          style={styles.container}
        >
          <View style={styles.titleContain}>
            <Text style={styles.title}>Planner</Text>
            <Text style={styles.subtitle}>Meal suggestions</Text>
          </View>
          <ScrollView
            style={styles.carousel}
            contentContainerStyle={styles.scroll}
          >
            {weekCarousels}
          </ScrollView>
        </ImageBackground>
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
    backgroundColor: "transparent",
    overflow: "visible",
    height: viewportHeight,
    width: viewportWidth,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  outContainer: {
    flex: 1,
    backgroundColor: theme.colors.back,
  },
  carousel: {
    paddingTop: 30,
  },
  titleContain: {
    paddingTop: 30,
    alignItems: "flex-start",
    width: viewportWidth * 0.9,
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
    fontSize: 24,
    color: theme.colors.gray,
    paddingHorizontal: viewportWidth * 0.05
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
  scroll: {
    alignItems: "center",
    justifyContent: "flex-start"
  }
});
