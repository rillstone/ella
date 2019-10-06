import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Animated
} from "react-native";
import TransitionView from "../../components/TransitionView";
import * as theme from "../../theme";
import Icon from "react-native-vector-icons/Ionicons";
import SelectionTile from "../../components/goals/SelectionTile";
import GoalSlider from "../../components/goals/GoalSlider";
import { getInset } from "react-native-safe-area-view";
import * as goalTypes from "../../components/goals/GoalTypes";
import * as categoryTypes from "../../components/goals/CategoryTypes";
import * as periodTypes from "../../components/goals/PeriodTypes";
import { Button } from "react-native-elements";

import { NavigationActions } from 'react-navigation'
import * as firebase from "firebase";

import "firebase/firestore";
import { dispatch, connect } from "../../store";
const mapStateToProps = state => ({
  user: state.user,
  colors: state.colors,
});

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
const IS_IOS = Platform.OS === "ios";
const HEADER_MAX_HEIGHT = 150;
const HEADER_MIN_HEIGHT = Platform.OS === "ios" ? 120 : 120;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class NewGoal extends Component {
  mounted = false;
  db = firebase.firestore();
  constructor(props) {
    super();
    this.state = {
      scrollY: new Animated.Value(0),
      scrollOp: 1,
      selected: "",
      selectedCat: "",
      value: 0,
      selectedPeriod: "",
      title: "",
      saving: false,
    };
    this.props = props;
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

  saveGoal() {
    var date = new Date();
    var id= Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    this.setState({ saving: true });
    var user = firebase.auth().currentUser;
    console.log(user.uid);
    this.db
      .collection("users")
      .doc(user.uid)
      .collection("goals")
      .doc(id)
      .set({
        name: this.state.title,
        id: id,
        type: this.state.selected,
        category:
          this.state.selected === "category" ? this.state.selectedCat : null,
        value: this.state.value,
        period: this.state.selectedPeriod,
        date: Date.parse(date)
      })
      .then(doc => {
        this.setState({ saving: false });
        this.props.navigation.dispatch(NavigationActions.back())
      });
  }

  goalTypePress = dataFromTile => {
    this.setState({
      selected: dataFromTile,
      selectedCat: "",
      value: 0,
      selectedPeriod: ""
    });
  };
  categoryPress = dataFromTile => {
    this.setState({
      selectedCat: dataFromTile
    });
  };
  periodPress = dataFromTile => {
    this.setState({
      selectedPeriod: dataFromTile
    });
  };
  sliderValue = dataFromSlider => {
    this.setState({
      value: dataFromSlider
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
      <View style={[styles.fill,{backgroundColor: this.props.colors.back }]}>
        <StatusBar hidden={true} />
        <ActivityIndicator
          animating={this.state.saving}
          color="#bc2b78"
          size='large'
          style={styles.activityIndicator}
        />
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
            color={this.props.colors.inactive}
          />
        </TouchableOpacity>

        <Animated.ScrollView
          style={styles.fill}
          ref={ref => (this.scrollView = ref)}
          // ref="scrollView"
          onContentSizeChange={(width, height) =>
            this.scrollView.getNode().scrollTo({ y: height })
          }
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
              <Text style={[styles.inputTitle,{color: this.props.colors.gray }]}>Goal type</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignContent: "center",
                  alignItems: "center",
                  // justifyContent: "center",
                  alignSelf: "center",
                  marginHorizontal: 10
                }}
              >
                <SelectionTile
                  options={goalTypes.goalInfo}
                  callBack={this.goalTypePress}
                />
              </View>
            </View>
            {this.state.selected === "general" ? (
              <View
                style={{
                  marginVertical: 10,
                  marginHorizontal: 20,
                  marginTop: 20
                }}
              >
                <Text style={[styles.inputTitle,{color: this.props.colors.gray }]}>Save ${this.state.value}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    marginHorizontal: 10,
                    marginVertical: 20
                  }}
                >
                  <GoalSlider
                    onSlide={this.sliderValue}
                    color={goalTypes.goalColors[this.state.selected]}
                  />
                </View>
              </View>
            ) : this.state.selected === "category" ? (
              <View
                style={{
                  marginVertical: 10,
                  marginHorizontal: 20,
                  marginTop: 20
                }}
              >
                <Text style={[styles.inputTitle,{color: this.props.colors.gray }]}>Spending Category</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignContent: "center",
                    alignItems: "center",
                    width: viewportWidth - 20,
                    // justifyContent: "center",
                    alignSelf: "center",
                    marginHorizontal: 10
                  }}
                >
                  <SelectionTile
                    options={categoryTypes.categoryInfo}
                    callBack={this.categoryPress}
                  />
                </View>
              </View>
            ) : (
              <View />
            )}
            {this.state.selectedCat != "" &&
            this.state.selected != "general" ? (
              <View
                style={{
                  marginVertical: 10,
                  marginHorizontal: 20,
                  marginTop: 20
                }}
              >
                <Text style={[styles.inputTitle,{color: this.props.colors.gray }]}>
                  Spend ${this.state.value} max on {this.state.selectedCat}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    // justifyContent: "space-between",
                    marginHorizontal: 10,
                    marginVertical: 20
                  }}
                >
                  <GoalSlider
                    onSlide={this.sliderValue}
                    color={categoryTypes.categoryColors[this.state.selectedCat]}
                  />
                </View>
              </View>
            ) : (
              <View />
            )}
            {this.state.value > 0 ? (
              <View
                style={{
                  marginVertical: 10,
                  marginHorizontal: 20,
                  marginTop: 20
                }}
              >
                <Text style={[styles.inputTitle,{color: this.props.colors.gray }]}>Within</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignContent: "center",
                    alignItems: "center",
                    width: viewportWidth - 20,
                    // justifyContent: "center",
                    alignSelf: "center",
                    marginHorizontal: 10
                  }}
                >
                  <SelectionTile
                    options={periodTypes.period}
                    callBack={this.periodPress}
                  />
                </View>
              </View>
            ) : (
              <View />
            )}
            {this.state.selectedPeriod != "" && this.state.value > 0 ? (
              <View
                style={{
                  marginVertical: 10,
                  marginHorizontal: 20,
                  marginTop: 20
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    // justifyContent: "space-between",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    width: viewportWidth - 30,
                    // justifyContent: "center",
                    alignSelf: "center",
                    marginHorizontal: 10
                  }}
                >
                  <Button
                    title={"Save"}
                    disabled={this.state.title === ""}
                    containerStyle={{}}
                    buttonStyle={[
                      styles.saveButton,
                      {
                        backgroundColor:
                          this.state.selected==='category'? categoryTypes.categoryColors[this.state.selectedCat] : '#FAA3c6'
                      }
                    ]}
                    onPress={() => this.saveGoal()}
                  />
                  <Text
                    style={[
                      styles.warnText,
                      { display: this.state.title != "" ? "none" : "flex" }
                    ]}
                  >
                    enter goal title
                  </Text>
                </View>
              </View>
            ) : (
              <View />
            )}
          </View>
        </Animated.ScrollView>
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: this.props.colors.back, transform: [{ translateY: headerTranslate }] }
          ]}
        >
          <Animated.View
            style={{
              transform: [{ translateY: inputTranslate }]
            }}
          >
            <TextInput
              style={[styles.input,{color: this.props.colors.gray }]}
              autoFocus
              inputStyle={{ fontSize: 30, color: this.props.colors.white }}
              placeholderTextColor={this.props.colors.inactive}
              keyboardType="default"
              placeholder="Goal title"
              onChangeText={text => {
                this.setState({ title: text });
              }}
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
export default connect(mapStateToProps)(NewGoal);

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  toggleFill: {
    height: 5,
    backgroundColor: "#FFF",
    margin: 4,
    borderColor: "#FFF"
  },
  warnText: {
    color: theme.colors.warn,
    fontSize: 12,
    fontWeight: "600"
  },
  saveButton: {
    width: viewportWidth - 55,
    borderRadius: 10
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
  activityIndicator: {
    position: "absolute",
    // justifyContent: "center",
    top: viewportHeight/2.5,
    // alignItems: "center",
    // alignContent: "center",
    alignSelf: "center",

    height: 80,
    zIndex: 10000
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
