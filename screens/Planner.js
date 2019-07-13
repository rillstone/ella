import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
  Image
} from "react-native";
import * as theme from "../theme";
import SvgAnimatedLinearGradient from "react-native-svg-animated-linear-gradient";
import Svg, { Circle, Rect } from "react-native-svg";

const MyLoader = () => (
  <SvgAnimatedLinearGradient height={100}>
    <Circle cx="20" cy="90" r="30" transform="rotate(-49.5, 32.5, 32.5)" />
    <Rect
      x="70"
      y="67"
      rx="0"
      ry="0"
      width="197"
      height="19"
      transform="rotate(-49.5, 32.5, 32.5)"
    />
    <Rect
      x="70"
      y="99"
      rx="0"
      ry="0"
      width="134"
      height="17"
      transform="rotate(-49.5, 32.5, 32.5)"
    />
  </SvgAnimatedLinearGradient>
);
const DATE_OPTIONS = { weekday: "short", month: "short", day: "numeric" };
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
  static navigationOptions = ({ navigation }) => ({
    title: 'Planner',
    
     headerTitleStyle : {textAlign: 'center',alignSelf:'center', fontSize: 25, color: theme.colors.gray, fontWeight: '700'},
     headerStyle: {
       height: 80,
      backgroundColor: '#F7F7F7',
      borderBottomColor: 'rgba(0, 0, 0, .3)',
    },
    headerTintColor: 'rgba(0, 0, 0, .9)',
    });
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
        <View style={{ flex: 1.2 }}>
          {/* <View style={styles.titleContain}>
            <Text style={styles.title}>Planner</Text>
          </View> */}
        </View>
      </SafeAreaView>
    );
  }
}
export default Planner;

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
  cardContainer: {
    backgroundColor: "grey",
    height: 100,
    borderRadius: 7
  },
  title: {
    fontSize: theme.sizes.title,
    fontWeight: "800",
    color: theme.colors.gray
  }
});
