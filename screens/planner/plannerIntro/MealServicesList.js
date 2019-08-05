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
import * as myFoodBagPlans from "../../../components/planner/MyFoodBagPlans";
import * as helloFreshPlans from "../../../components/planner/HelloFreshPlans";
import * as mealServices from "../../../components/planner/MealServices";
import { getInset } from "react-native-safe-area-view";
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
class MealServicesList extends Component {
  mounted = false;
  constructor(props) {
    super();
    this.state = {
      value: 1,
      loaded: false,
      // selected: "",
      selected: []
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
  typePress = dataFromTile => {
    this.checkSelected(dataFromTile);
  };
  _onLoad = () => {
    this.setState(() => ({ loaded: true }));
  };
  checkSelected(data) {
    var index = this.state.selected.indexOf(data);
    var array = this.state.selected;
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ selected: array });
    } else {
      array.push(data);
      this.setState({ selected: array });
    }
  }

  onValueChanged = value => this.setState({ value });
  render() {
    const { navigation } = this.props;
    // const { navigation } = this.props;
    const type = navigation.getParam("type", "other");
    const count = navigation.getParam("count", 2);
    const dietary = navigation.getParam("dietary", []);

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
        <View
          style={{
            flex: 1,
            alignItems: "center",
            alignContent: "center",
            flexDirection: "column",
            backgroundColor: theme.scheme.green,
            paddingBottom: viewportHeight * 0.75
          }}
        >
          <View
            style={{
              flex: 0.3,
              justifyContent: "center",
              alignContent: "center",
              marginHorizontal: 30,
              top: 60
            }}
          >
            <Text
              style={{
                textAlign: "center",

                fontWeight: "400",
                fontSize: 25,

                color: "#FFF"
              }}
            >
              Select a meal service provider
            </Text>
          </View>
        </View>
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
            <View
              style={{
                flexDirection: "row",
                //   justifyContent: "space-between",
                marginHorizontal: 10,
                left: 0,
                top: 30,
                alignContent: "center",
                alignItems: "center",
                alignSelf: "center",
                flexWrap: "nowrap"
              }}
            >
              {mealServices.mealServices.map(item => {
                return (
                  <TouchableOpacity
                    key={item.key}
                    style={[
                      styles.card,
                      {
                        width: viewportWidth / 2.5,

                        height: viewportWidth / 2.5,
                        backgroundColor: theme.colors.white
                      }
                    ]}
                    onPress={() =>
                      navigation.navigate("MealServicePlans", {
                        data:
                          item.key === "My Food Bag"
                            ? myFoodBagPlans
                            : helloFreshPlans,
                        type: type,
                        count: count,
                        dietary: dietary,
                        service: item.key
                      })
                    }
                  >
                    <View style={styles.icon}>
                      <Image
                        source={item.image}
                        resizeMode={"center"}
                        style={{
                          width: viewportWidth / 2.6,
                          height: viewportWidth / 2.6,
                          backgroundColor: this.state.loaded
                            ? "transparent"
                            : theme.colors.lightGray
                        }}
                        onLoad={this._onLoad}
                      />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </Animatable.View>
      </View>
    );
  }
}
export default MealServicesList;

const styles = StyleSheet.create({
  fill: {
    flex: 1
  },
  scrollOver: {
    width: viewportWidth,
    height: viewportHeight * 0.75,
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
  card: {
    borderRadius: 12,
    // alignSelf: "center",
    // alignItems:'center',
    // justifyContent: "center",
    // alignContent: "center",

    // height: viewportWidth / 5,
    width: viewportWidth / 2.5,

    height: viewportWidth / 2.5,
    // justifyContent: "center",

    // alignContent: "center",
    marginVertical: 5,
    marginHorizontal: 15,
    flexDirection: "column",
    // overflow: "hidden",
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "#6b6b6b",
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 1
  },
  icon: {
    flex: 3,
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    // backgroundColor: 'blue',
    width: viewportWidth / 2.5,

    height: viewportWidth / 2.5
    // overflow:"hidden",
    // top: 10
    // left: 10,
  },
  button: {
    borderRadius: 30,
    width: 60,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    height: 60,
    backgroundColor: theme.scheme.royal_blue,
    shadowColor: theme.scheme.royal_blue,
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
  carouselItem: {
    paddingTop: 20
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
