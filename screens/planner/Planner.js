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
import SliderEntryUpcoming, {
  sliderWidthSmall,
  itemWidthSmall
} from "./SliderEntryUpcoming";
import { getInset } from "react-native-safe-area-view";
import { Defs, LinearGradient, Stop } from "react-native-svg";
import { Paragraph, Box } from "rn-placeholder";
import mfb from "../../assets/mfb.json";
import moment from "moment";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
const TOP_SAFE_AREA = Platform.OS === "ios" ? getInset("top") : 40;

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
    setTimeout(() => this.setState({ loading: true }), 1000);
  }

  render() {
    const thisWeek = mfb.deliveryDays[0];
    // console.log(mfb.deliveryDays[0].orders[0].recipes);
    const weekCarousels = (
      <View
        key={thisWeek.date}
        style={[styles.carouselItem, { marginTop: viewportHeight / 4 - 20 }]}
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
        <ImageBackground
          resizeMode="stretch"
          source={require("../../assets/images/tran_screen_back_green.png")}
          style={styles.header}
        >
          <View style={styles.titleContain}>
            <Text style={styles.title}>Planner</Text>
            <Text style={styles.subtitle}>Meal suggestions</Text>
          </View>
        </ImageBackground>
        <ScrollView
          style={styles.carousel}
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <Paragraph
            style={{ left: 40, top: viewportHeight / 4 }}
            animation="fade"
            lineNumber={3}
            textSize={16}
            color="#DAD7D7"
            width="80%"
            lastLineWidth="70%"
            firstLineWidth="50%"
            isReady={this.state.loading}
          >
            {weekCarousels}
          </Paragraph>

          <Paragraph
            style={{ left: 40, top: viewportHeight / 4 + 40 }}
            animation="fade"
            lineNumber={3}
            textSize={16}
            color="#DAD7D7"
            width="80%"
            lastLineWidth="70%"
            firstLineWidth="50%"
            isReady={this.state.loading}
          >
            {upcomingCarousels}
          </Paragraph>
        </ScrollView>
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
    zIndex: 9999,
    alignItems: "center",
    justifyContent: "flex-start",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    overflow: "visible",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    height: viewportHeight / 4
    // borderBottomWidth: 0.5,
    // borderColor: "#00000020"
  },
  outContainer: {
    flex: 1,
    backgroundColor: theme.colors.back
  },
  carousel: {
    flex: 1
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
