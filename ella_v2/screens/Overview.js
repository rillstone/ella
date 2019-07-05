import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Dimensions,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
  Animated
} from "react-native";
import * as theme from "../theme";
import SlidingUpPanel from "rn-sliding-up-panel";
import Icon from "react-native-vector-icons/Ionicons";
import { Avatar } from "react-native-elements";
import AccountSlider from "../components/AccountSlider";
import OverviewChart from "../components/OverviewChart";
import Goal from "../components/Goal";
import { Transition } from "react-navigation-fluid-transitions";
import * as firebase from "firebase";
import { getInset } from 'react-native-safe-area-view';


const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
const HEADER_MAX_HEIGHT = 120 + getInset("top");
const HEADER_MIN_HEIGHT = Platform.OS === "ios" ? 50+ getInset("top") : 50
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
class Overview extends Component {
  mounted = false;
  constructor(props) {
    super();
    this.state = {
      lastname: null,
      child: "hide",
      scrollY: new Animated.Value(0),
    };
    this.props = props;
    this.childHandler = this.childHandler.bind(this);
    this.signoutPress = this.signoutPress.bind(this);
  }

  getUser() {
    var user = firebase.auth().currentUser;
    console.log(user);
    var name;

    if (user != null) {
      name = user.displayName;
      this.setState({
        firstname: name.split(" ")[0],
        lastname: name.split(" ").length > 1 ? name.split(" ")[1] : null,
        email: user.email
      });
    }
  }
  signoutPress = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  childHandler() {
    this._panel.hide();
  }

  componentWillMount() {
    this.getUser();
    this.mounted = true;
    this.startHeaderHeight = 80;
    if (Platform.OS == "android") {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
    }
  }

  componentDidMount() {}
  _draggedValue = new Animated.Value(180);
  render() {
    const data = [50, 10, 40, 30, 20, 85, 91, 35, 53];
    const headerTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: "clamp"
    });
    const titleOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE/2 , HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1,0],
      extrapolate: "clamp"
    });
    const smallTitleOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE/2 , HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0,1],
      extrapolate: "clamp"
    });
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.back }}>
        <SlidingUpPanel
          onDragStart={() => console.log("start")}
          onDragEnd={() => console.log("end")}
          containerStyle={{
            zIndex: 9999,
            backgroundColor: "#fff",
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            overflow: "hidden"
          }}
          allowDragging
          height={viewportHeight - 140}
          backdropOpacity={0.4}
          draggableRange={{ top: viewportHeight - 140, bottom: 0 }}
          ref={c => (this._panel = c)}
        >
          {dragHandler => (
            <AccountSlider
              data={{
                dragHandler: dragHandler,
                firstName: "charlie",
                lastName: "Rillstone",
                email: "charlierillstone@gmail.com",
                icon:
                  "https://scontent-lga3-1.cdninstagram.com/vp/ea10be885edfb1082ea3bd63427d465a/5D8F8A2A/t51.2885-19/s150x150/46948414_777229735969818_2250279970788081664_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&se=8"
              }}
              action={this.childHandler}
              signOut={this.signoutPress}
            />
          )}
        </SlidingUpPanel>
                  <View
            style={[
              styles.avatar,
              {
              // flex: 0.8,
              // marginRight: 20,
              // paddingTop: 30,
              borderRadius:36,
              zIndex: 9998,
              right: 20,
              backgroundColor: 'transparent',
              top: getInset('top') + 25,
              // justifyContent: "center",
              // alignItems: "center",
              position: 'absolute'
              }
            ]}
          >
            <Avatar
              rounded
              size="medium"
              onPress={() => this._panel.show()}
              
              // title={
              //   this.state.lastname && this.state.firstname
              //     ? this.state.firstname[0] + this.state.lastname[0]
              //     : "XX"
              // }
              source={{
                uri:
                  "https://scontent-lga3-1.cdninstagram.com/vp/ea10be885edfb1082ea3bd63427d465a/5D8F8A2A/t51.2885-19/s150x150/46948414_777229735969818_2250279970788081664_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&se=8"
              }}
            />
          </View>
        <StatusBar barStyle="dark-content" />
        <Animated.View style={[
            styles.header,
            { transform: [{ translateY: headerTranslate }] }
          ]}>
          <Animated.View style={[styles.titleContain, { opacity: titleOpacity}]}>
            <Text style={styles.title}>
              {/* Hi, {this.state.firstname} */}
              Hi, Charlie!
            </Text>
            <Text style={styles.microtitle}>kuken!</Text>
          </Animated.View>
          {/* <Animated.View style={{opacity:smallTitleOpacity, alignItems: 'center', marginTop: 0 }}>
          <Text style={styles.microtitle}>Overview</Text>
          </Animated.View> */}
          {/* <Transition appear='scale' delay={500} shared="enter"> */}

          {/* </Transition> */}
        </Animated.View>

        <View style={{ flex: 1}}>
          <Animated.ScrollView style={{backgroundColor:'transparent', }}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true }
          )}>
            <View
              style={{
                marginTop: HEADER_MAX_HEIGHT - getInset('top'),
                marginLeft: 20,
                alignContent: "center",
                justifyContent: "center",
                
                // flex: 1
              }}
            >
              <Text
                style={{ fontWeight: "700", fontSize: 30, color: "#3F4F5A" }}
              >
                You're saving
                <Text style={{ color: "#F6699A" }}> $24.89 </Text>
              </Text>
              <Text
                style={{ fontWeight: "300", fontSize: 28, color: "#3F4F5A" }}
              >
                per week on average{" "}
              </Text>
            </View>

            <View
              style={{
                marginTop: 20,
                flexDirection: "row",
                marginHorizontal: 15,
                
              }}
            >
              <OverviewChart
                data={{
                  position: "left",
                  image: require("../assets/images/bill_back.jpg"),
                  data: [50, 52, 51, 51, 48, 53, 47],
                  color: "#7EF2E2",
                  title: "Weekly Spending"
                }}
              />
              <OverviewChart
                data={{
                  position: "center",
                  image: require("../assets/images/entertainment_back.jpg"),
                  data: [51, 52, 45, 51, 52, 53, 54],
                  color: "#FFB6BA",
                  title: "Avoidable Spending"
                }}
              />
              <OverviewChart
                data={{
                  position: "right",
                  image: require("../assets/images/food_back.jpg"),
                  data: [51, 48, 49, 50, 51, 53, 50, 53],
                  color: "#A8E8FF",
                  title: "Avg Saving"
                }}
              />
            </View>
            <View style={styles.goals}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 10
                }}
              >
                <View style={{}}>
                  <Text style={styles.title}>Goals</Text>
                </View>
                <View
                  style={{
                    alignSelf: "center",
                    right: 10
                  }}
                >
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Goal',{navigation: this.props.navigation})}>
                    <Icon
                      name={"ios-add"}
                      color={theme.colors.gray}
                      size={35}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <Goal
                data={{
                  title: "Reduce weekly spending",
                  subtitle: "1 week ago"
                }}
              />
              <Goal
                data={{ title: "0 avoidable purchases", subtitle: "yesterday" }}
              />
              <Goal
                data={{
                  title: "Get food spending down",
                  subtitle: "3 hours ago"
                }}
              />
              <Goal
                data={{
                  title: "Use public transport more",
                  subtitle: "1 hour ago"
                }}
              />
                            <Goal
                data={{
                  title: "Use public transport more",
                  subtitle: "1 hour ago"
                }}
              />
                            <Goal
                data={{
                  title: "Use public transport more",
                  subtitle: "1 hour ago"
                }}
              />
              <Goal
                data={{ title: "Limit 1 leisure p/w", subtitle: "right now" }}
              />
            </View>
          </Animated.ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
export default Overview;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6f5f7"
  },
  titleContain: {
    paddingLeft: 20,
    backgroundColor: "transparent",
    paddingTop: 30,
    // flex: 6
  },
  title: {
    fontSize: theme.sizes.title,
    backgroundColor: "transparent",
    fontWeight: "800",
    color: theme.colors.gray
  },

  microtitle: {
    fontSize: theme.sizes.microsub,
    fontWeight: "600",
    backgroundColor: "transparent",
    color: "#F6699A"
  },
  goals: {
    marginTop: 20,
    flexDirection: "column",
    marginHorizontal: 20
  },
  header: {
    position: "absolute",
    top: getInset("top"),
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    overflow: "hidden",
    height: HEADER_MAX_HEIGHT
  },
  avatar:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 1
  
  },
});
