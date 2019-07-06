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
  Animated,
  Picker,
  ActionSheetIOS
} from "react-native";
import { Defs, LinearGradient, Stop } from "react-native-svg";
import TransitionView from "../components/TransitionView";
import { LineChart, Grid } from "react-native-svg-charts";
import { Input, ButtonGroup, Button, Slider } from "react-native-elements";
import * as theme from "../theme";
import Icon from "react-native-vector-icons/Ionicons";
import SelectionTile from "../components/SelectionTile";
import { getInset } from "react-native-safe-area-view";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
const IS_IOS = Platform.OS === "ios";
function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.15;
const slideWidth = wp(85);
const itemHorizontalMargin = wp(2);
const HEADER_MAX_HEIGHT = 150;
const HEADER_MIN_HEIGHT = Platform.OS === "ios" ? 120 : 120;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;
class GoalView extends Component {
  mounted = false;
  constructor(props) {
    super();
    this.state = {
      scrollY: new Animated.Value(0),
      scrollOp: 1,
      period: "month",
      selectedType: [false, false, false, false],
      selectedCat: [false, false, false, false],
      selectedHabit: [false, false],

      types: ["Spending", "Saving", "Habit", "Category"],
      selected: "",
      value: 0
    };
    this.props = props;

    tiles = [
      this.state.spending,
      this.state.saving,
      this.state.habits,
      this.state.category
    ];
  }
  periodOnPress(event, buttonId) {
    console.log(this.state.period);
    this.setState({ period: buttonId });
  }

  _renderScrollViewContent() {
    const data = Array.from({ length: 30 });
    return (
      <View style={styles.scrollViewContent}>
        {data.map((_, i) => (
          <TransitionView style={styles.row} index={i} key={i}>
            {/* <View key={i} style={styles.row}> */}
            <Text>{i}</Text>
            {/* </View> */}
          </TransitionView>
        ))}
      </View>
    );
  }
  componentWillMount() {
    this.mounted = true;
    this.startHeaderHeight = 80;
    if (Platform.OS == "android") {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
    }
  }

  // updateIndex(selectedIndex) {
  //   this.setState({ selectedIndex });
  // }

  goalTypePress = dataFromTile => {
    list = [false, false, false, false];
    list[dataFromTile] = true;
    this.setState({
      selectedType: list,
      selected: this.state.types[dataFromTile]
    });
  };
  categoryPress = dataFromTile => {
    list = [false, false, false, false];
    list[dataFromTile] = true;
    this.setState({
      selectedCat: list,

    });
  };
  habitPress = dataFromTile => {
    list = [false, false];
    list[dataFromTile] = true;
    this.setState({
      selectedHabit: list,

    });
  };
  render() {
    const headerTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: "clamp"
    });
    const inputTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, HEADER_SCROLL_DISTANCE - 20],
      extrapolate: "clamp"
    });

    const titleScale = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0.8],
      extrapolate: "clamp"
    });
    const titleTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, -8],
      extrapolate: "clamp"
    });
    return (
      <View style={styles.fill}>
        <StatusBar hidden={true} />
        <TouchableOpacity
          onPress={() => {
            this.setState({ scrollOp: 0 });
            this.props.navigation.navigate("Home");
          }}
          style={{
            position: "absolute",
            right: 25,
            top: 25,
            zIndex: 999
          }}
        >
          <Icon
            name="ios-close-circle"
            size={36}
            color={theme.colors.inactive}
          />
        </TouchableOpacity>
        {/* <Button
          onPress={() => {
            this.setState({ scrollOp: 0 });
            this.props.navigation.navigate("Home");
          }}
          title={'save'}
          containerStyle={{
            position: "absolute",
            left: 25,
            top: 25,
            zIndex: 999,
            height: 20,
            width: 30,
          }}
        /> */}
        <Animated.ScrollView
          style={styles.fill}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true }
          )}
        >
          {/* {this._renderScrollViewContent()} */}
          <View style={{ marginTop: HEADER_MAX_HEIGHT }}>
            <View
              style={{
                marginVertical: 10,
                marginHorizontal: 20,
                marginTop: 20
              }}
            >
              <Text style={styles.inputTitle}>Goal type</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 10
                }}
              >
                <SelectionTile
                  data={{
                    name: "spending",
                    icon: "ios-card",
                    color: "#538EFB",
                    index: 0,
                    width:5,
                    selected: this.state.selectedType[0]
                  }}
                  tilePressed={this.goalTypePress}
                />
                <SelectionTile
                  data={{
                    name: "saving",
                    icon: "ios-wallet",
                    color: "#FF7F99",
                    index: 1,
                    width:5,
                    selected: this.state.selectedType[1]
                  }}
                  tilePressed={this.goalTypePress}
                />
                <SelectionTile
                  data={{
                    name: "habits",
                    icon: "ios-pricetags",
                    color: "#42E695",
                    index: 2,
                    width:5,
                    selected: this.state.selectedType[2]
                  }}
                  tilePressed={this.goalTypePress}
                />
                <SelectionTile
                  data={{
                    name: "category",
                    icon: "ios-apps",
                    color: "#E6AA42",
                    index: 3,
                    width:5,
                    selected: this.state.selectedType[3]
                  }}
                  tilePressed={this.goalTypePress}
                />
              </View>
            </View>
            {this.state.selected === "Spending" || this.state.selected === "Saving" ? 
            <View
              style={{
                marginVertical: 10,
                marginHorizontal: 20,
                marginTop: 20
              }}
            >
              <Text style={styles.inputTitle}>
                {this.state.selected} amount
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 10,
                  marginVertical: 20
                }}
              >
                <Text pointerEvents={'none'} style={{position: 'absolute',left: 0, right:0,textAlign:'center',alignSelf:'center',fontWeight: '700', fontSize: 20, color:'#FFF', zIndex: 999}}>${this.state.value}</Text>
                <Slider
                  value={this.state.value}
                  maximumValue={1000}
                  minimumValue={0}
                  step={1}
                  onValueChange={value => this.setState({ value })}
                  style={{width: viewportWidth-60}}
                  trackStyle={{backgroundColor: theme.colors.lightGray, height: 70, borderRadius: 10}}
                  minimumTrackTintColor={theme.colors.gray}
                  thumbTintColor={theme.colors.gray}
                  animationType={'spring'}
                  thumbStyle={{height: 70, width: 30,borderRadius: 10}}
                />
              </View>
            </View>
            :
            this.state.selected === 'Category' ? 
            <View
              style={{
                marginVertical: 10,
                marginHorizontal: 20,
                marginTop: 20
              }}
            >
              <Text style={styles.inputTitle}>
                Spending Category
              </Text>
<View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 10
                }}
              >
                <SelectionTile
                  data={{
                    name: "Food",
                    icon: "ios-restaurant",
                    color: "#538EFB",
                    index: 0,
                    width:5,
                    selected: this.state.selectedCat[0]
                  }}
                  tilePressed={this.categoryPress}
                />
                <SelectionTile
                  data={{
                    name: "Leisure",
                    icon: "logo-game-controller-a",
                    color: "#FF7F99",
                    index: 1,
                    width:5,
                    selected: this.state.selectedCat[1]
                  }}
                  tilePressed={this.categoryPress}
                />
                <SelectionTile
                  data={{
                    name: "Transport",
                    icon: "ios-bus",
                    color: "#42E695",
                    index: 2,
                    width:5,
                    selected: this.state.selectedCat[2]
                  }}
                  tilePressed={this.categoryPress}
                />
                <SelectionTile
                  data={{
                    name: "Bills",
                    icon: "ios-paper",
                    color: "#E6AA42",
                    index: 3,
                    width:5,
                    selected: this.state.selectedCat[3]
                  }}
                  tilePressed={this.categoryPress}
                />
              </View>
              </View>
            :
            this.state.selected === 'Habit' ? 
            <View
              style={{
                marginVertical: 10,
                marginHorizontal: 20,
                marginTop: 20
              }}
            >
              <Text style={styles.inputTitle}>
                What do you want to work on?
              </Text>
            <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 10
            }}
          >
            <SelectionTile
              data={{
                name: "Avoidable Spending",
                icon: "ios-pricetags",
                color: "#538EFB",
                index: 0,
                width:2.5,
                selected: this.state.selectedHabit[0]
              }}
              tilePressed={this.habitPress}
            />
            <SelectionTile
              data={{
                name: "Spending Habits",
                icon: "ios-card",
                color: "#FF7F99",
                index: 1,
                width:2.5,
                selected: this.state.selectedHabit[1]
              }}
              tilePressed={this.habitPress}
            />
          </View>    
          </View>
:
<View/>
            }
          </View>
        </Animated.ScrollView>
        <Animated.View
          style={[
            styles.header,
            { transform: [{ translateY: headerTranslate }] }
          ]}
        >
          <Animated.View
            style={{
              transform: [{ translateY: inputTranslate }]
            }}
          >
            <TextInput
              style={styles.input}
              autoFocus
              inputStyle={{ fontSize: 30, color: "#FFF" }}
              placeholderTextColor={theme.colors.inactive}
              keyboardType="default"
              placeholder="Goal title"
            />
          </Animated.View>
        </Animated.View>
        <Animated.View
          style={[
            styles.bar,
            {
              transform: [{ scale: titleScale }, { translateY: titleTranslate }]
            }
          ]}
        >
          {/* <Text style={styles.title2}>Title</Text> */}
        </Animated.View>
      </View>
    );
  }
}
export default GoalView;

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: theme.colors.back
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
    backgroundColor: theme.colors.back,
    overflow: "hidden",
    height: HEADER_MAX_HEIGHT,
    borderBottomWidth: 0.5,
    borderColor: "#00000020"
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
  inputTitle: {
    alignSelf: "flex-start",
    left: 10,
    color: theme.colors.gray,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 9
  },
  input: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#F6699A70",
    borderBottomWidth: 0,
    top: getInset("top") + 20,
    // paddingLeft: 10,
    // height: 100,
    borderRadius: 10,
    margin: 10,
    marginHorizontal: 30,
    fontSize: 40,
    fontWeight: "500",
    color: theme.colors.gray
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: theme.colors.inactive,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    color: "#1E2127",
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 0.5
  },

  title: {
    fontSize: theme.sizes.title,
    fontWeight: "800",
    color: theme.colors.gray
  },
  imageContainer: {
    flex: 1,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    // backgroundColor: 'blue',
    overflow: "hidden"
    // borderTopLeftRadius: 12,
    // borderBottomLeftRadius: 12
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "transparent",
    backgroundColor: theme.colors.lightGray,
    width: viewportWidth - 40,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 4,
    color: theme.colors.gray,
    paddingRight: 30 // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: theme.colors.inactive,
    borderRadius: 8,
    width: viewportWidth - 40,
    color: "black",
    paddingRight: 30 // to ensure the text is never behind the icon
  }
});
