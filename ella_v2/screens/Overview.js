import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions
} from "react-native";
import * as theme from "../theme";
import payments from "../assets/payments.json";
import Icon from "react-native-vector-icons/Ionicons";
import { Button, Input, Avatar } from "react-native-elements";
import { Transition } from "react-navigation-fluid-transitions";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
const DATE_OPTIONS = { weekday: "short", month: "short", day: "numeric" };
const Gradient = ({ index }) => (
  <Defs key={index}>
    <LinearGradient id={"gradient"} x1={"0%"} y={"0%"} x2={"0%"} y2={"100%"}>
      <Stop offset={"0%"} stopColor={"#D7D8DC"} stopOpacity={1} />
      <Stop offset={"100%"} stopColor={"#DFE0E4"} stopOpacity={0} />
    </LinearGradient>
  </Defs>
);
class Overview extends Component {
  mounted = false;
  constructor(props) {
    super();

    this.props = props;
  }

  componentWillMount() {
    this.mounted = true;
    this.startHeaderHeight = 80;
    if (Platform.OS == "android") {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
    }
  }

  componentDidMount() {}

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f5f7" }}>
        <StatusBar barStyle="dark-content" />
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={styles.titleContain}>
            <Text style={styles.title}>Hi, Charlie!</Text>
            <Text style={styles.microtitle}>kuken!</Text>
          </View>
          <Transition delay={500} shared="enter">
            <View
              style={{
                flex: 1,
                // flexDirection: "row",
                // backgroundColor: 'blue',
                paddingRight: 20,
                paddingTop: 30,
                justifyContent: "center",
                alignItems: "flex-end"
              }}
            >
              <Avatar
                rounded
                source={{
                  uri:
                    "https://scontent-lga3-1.cdninstagram.com/vp/ea10be885edfb1082ea3bd63427d465a/5D8F8A2A/t51.2885-19/s150x150/46948414_777229735969818_2250279970788081664_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&se=8"
                }}
              />
            </View>
          </Transition>
        </View>

        <View style={{ flex: 8 }} />
      </SafeAreaView>
    );
  }
}
export default Overview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6f5f7"
  },
  image: {
    // resizeMode: 'cover',
    flex: 1,
    height: undefined,
    width: undefined
  },
  titleContain: {
    paddingLeft: 20,
    paddingTop: 30,
    flex: 6
  },
  cardContainer: {
    backgroundColor: "grey",
    height: 100,
    borderRadius: 7
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
