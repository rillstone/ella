import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Dimensions
} from "react-native";
import * as theme from "../../theme";
import Carousel from "react-native-snap-carousel";
import SliderEntry, { sliderWidth, itemWidth } from "./SliderEntry";
import { Defs, LinearGradient, Stop } from "react-native-svg";
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
    this.init();
    this.sum = 0;
  }

  init() {
    this.state = {
      categories: [
        {
          id: "WpIAc9by5iU",
          title: "Burmese Chicken Curry",
          subtitle: "$25.78   Serves: 4   Time: 35-40min",
          image: require("../../assets/images/mfb/1.jpg"),
        },
        {
          id: "sNPnbI1arSE",
          title: "Lamb and Pumpkin Pie",
          subtitle: "$25.78   Serves: 4   Time: 35-40min",
          image: require("../../assets/images/mfb/2.jpg"),
        },
        {
          id: "VOgFZfRVaww",
          title: "Winter Chicken Caesar",
          subtitle: "$25.78   Serves: 4   Time: 35-40min",
          image: require("../../assets/images/mfb/3.jpg"),
        },
        {
          id: "VOgYYfRVaww",
          title: "Citrus Salmon",
          subtitle: "$25.78   Serves: 4   Time: 35-40min",
          image: require("../../assets/images/mfb/4.jpg"),
        },
      ],
      spendings: 0,
      data: [],
      colors: [theme.scheme.cerise + '90', theme.scheme.carnation + '90'],
      keys: ["current", "average"]
    };
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
    this.setState({
      data: this.state.categories[0].data
    });
  }

  componentDidMount() {
    setTimeout(() => this.setState({ loading: true }), 1000);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          imageStyle={{ resizeMode: "stretch" }}
          source={require("../../assets/images/tran_screen_back_green.png")}
          style={styles.header}
        >
          <View style={styles.titleContain}>
            <Text style={styles.title}>Planner</Text>
            <Text style={styles.subtitle}>Meal suggestions</Text>
          </View>
          <View style={styles.carousel}>
            <Carousel
              ref={c => {
                this._carousel = c;
              }}
              data={this.state.categories}
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
              firstItem={1}
              loop={true}
              onSnapToItem={index => {
                this.setState({
                  graph: this.state.categories[index].graph,
                  data: this.state.categories[index].data,
                  keys: this.state.categories[index].keys,
                  colors: this.state.categories[index].colors
                });
              }}
            />
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
export default Planner;

const styles = StyleSheet.create({
  header: {
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    overflow: "visible",
    height: viewportHeight / 2,
    width: viewportWidth,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.back,
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
});
