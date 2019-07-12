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
import { ListItem } from "react-native-elements";
import * as theme from "../theme";
import payments from "../assets/payments.json";
import Icon from "react-native-vector-icons/Ionicons";
import SvgAnimatedLinearGradient from "react-native-svg-animated-linear-gradient";
import Svg, { Circle, Rect } from "react-native-svg";
const list = [
  {
    title: "Linked Accounts",
    icon: "ios-link"
  },
  {
    title: "Personal Info",
    icon: "ios-body"
  },
  {
    title: "Budget",
    icon: "ios-pricetags"
  },
  {
    title: "Authentication",
    icon: "ios-key"
  },


];
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
class Settings extends Component {
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
    title: "Settings",

    headerTitleStyle: {
      fontSize: 25,
      color: theme.colors.gray,
      fontWeight: "700"
    },
    headerStyle: {
      height: 80,
      backgroundColor: "#F7F7F7",
      borderBottomColor: "rgba(0, 0, 0, .3)"
    },
    headerTintColor: "rgba(0, 0, 0, .9)"
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
          <View>
            {list.map((item, i) => (
              <ListItem
              
                key={i}
                title={item.title}
                rightIcon={<Icon name={"ios-arrow-forward"} size={26} color={"#E1E1E1"} />}
                leftIcon={ <Icon name={item.icon} size={26} color={"#E1E1E1"} />}
              />
            ))}
          </View>
          {/* <View style={styles.titleContain}>
            <Text style={styles.title}>Settings</Text>
          </View> */}
        </View>
      </SafeAreaView>
    );
  }
}
export default Settings;

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
  title: {
    fontSize: theme.sizes.title,
    fontWeight: "800",
    color: theme.colors.gray
  }
});
