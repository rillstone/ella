import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Platform,
  StatusBar,
  Image,
  Dimensions
} from "react-native";
import * as theme from "../theme";
import SvgAnimatedLinearGradient from "react-native-svg-animated-linear-gradient";
import Svg, { Circle, Rect } from "react-native-svg";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

class Planner extends Component {
  mounted = false;
  constructor(props) {
    super();
    this.state = {
      errors: [],
      transactions: []
    };
    this.props = props;
  }
  componentWillMount() {
    this.mounted = true;
    this.startHeaderHeight = 80;
    if (Platform.OS == "android") {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.back }}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scroll}
        >
          <Text style={styles.title}>Tonight's meal:</Text>
          <View style={styles.mainCard}>
            <Image
              style={{
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                width: viewportWidth * 0.9,
                height: 200,
              }}
              source={require("../assets/images/mfb/1.jpg")}
              resizeMode="cover"
            />
            <Text style={styles.caption}>Burmese Chicken Curry with Brown Rice</Text>
          </View>
          <Text style={styles.title}>Upcoming meals:</Text>
          <View style={styles.subCard}>
            <Image
              style={styles.subImage}
              source={require("../assets/images/mfb/2.jpg")}
              resizeMode="cover"
            />
            <Text style={styles.caption}>Lamb and Pumpkin Pie with Cheesy Topping</Text>
          </View>
          <View style={styles.subCard}>
            <Image
              style={styles.subImage}
              source={require("../assets/images/mfb/3.jpg")}
              resizeMode="cover"
            />
            <Text style={styles.caption}>Winter Chicken Caesar with Cauliflower and Cheesy Parsnip Croutons</Text>
          </View>
          <View style={styles.subCard}>
            <Image
              style={styles.subImage}
              source={require("../assets/images/mfb/4.jpg")}
              resizeMode="cover"
            />
            <Text style={styles.caption}>Citrus Salmon with Roasted Greens and Horseradish Yoghurt</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
export default Planner;

const styles = StyleSheet.create({
  scroll: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  container: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: theme.colors.back,
  },
  titleContain: {
    paddingLeft: 20,
    paddingTop: 20,
    flex: 1
  },
  cardContainer: {
    backgroundColor: "grey",
    height: 100,
    borderRadius: 7
  },
  title: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: "800",
    color: theme.colors.gray
  },
  mainCard: {
    width: viewportWidth * 0.9,
    height: 240,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.lightGray,
  },
  subCard: {
    width: viewportWidth * 0.9,
    height: 150,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.lightGray,
  },
  subImage:{
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: viewportWidth * 0.9,
    height: 100,
  },
  caption: {
    fontSize: theme.sizes.subtitle_two,
    paddingLeft: 10,
    paddingRight: 10,
  }
});
