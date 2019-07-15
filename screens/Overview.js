import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Dimensions,
  AsyncStorage,
  TouchableOpacity,
  Animated,
  RefreshControl
} from "react-native";
import * as theme from "../theme";
import SlidingUpPanel from "rn-sliding-up-panel";
import Icon from "react-native-vector-icons/Ionicons";
import { Avatar } from "react-native-elements";
import AccountSlider from "../components/AccountSlider";
import OverviewChart from "../components/OverviewChart";
import OverviewTransactionView from "../components/OverviewTransactionView";
import Goal from "../components/Goal";
import * as firebase from "firebase";
import "firebase/firestore";
import { getInset } from "react-native-safe-area-view";
import AccountEdit from "../components/AccountEdit";
import { dispatch, connect } from '../store';

const mapStateToProps = state => ({
  user: state.user,
});

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
const TOP_SAFE_AREA = Platform.OS === "ios" ? getInset("top") : 40;
const HEADER_MAX_HEIGHT = 120 + TOP_SAFE_AREA;
const HEADER_MIN_HEIGHT =
  Platform.OS === "ios" ? 50 + getInset("top") : 50 + TOP_SAFE_AREA;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
class Overview extends Component {
  mounted = false;
  db = firebase.firestore();
  constructor(props) {
    super();
    this.state = {
      child: "hide",
      scrollY: new Animated.Value(0),
      uid: null,
      items: [],
      refreshing: false,
      edit: false,
      photoURL: ""
    };
    this.props = props;
    this.childHandler = this.childHandler.bind(this);
    this.signoutPress = this.signoutPress.bind(this);
    this.editProfile = this.editProfile.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.goBack = this.goBack.bind(this);
    var items = [];
  }

  componentDidMount() {
    this.getGoals();
    this._componentFocused();

    this._sub = this.props.navigation.addListener(
      "didFocus",
      this._componentFocused
    );
  }
  componentWillUnmount() {
    this._sub.remove();
  }

  _componentFocused = () => {
    this.getGoals();
  };
  getGoals() {
    this.db
      .collection("users")
      .doc(this.props.user.uid)
      .collection("goals")
      .get()
      .then(querySnapshot => {
        const items = [];
        querySnapshot.forEach(function (doc) {
          items.push(doc.data());
        });
        this.setState({ items, refreshing: false });
      });
  }

  getUser() {
    var user = this.props.user;
    console.log(user.uid);
    console.log(user.displayName);

    // this.db.collection("users").doc(user.uid).set({name: user.displayName})
    var name;

    if (user) {
      name = user.displayName;
      this.setState({
        firstname: name.split(" ")[0],
        lastname: name.split(" ").length > 1 ? name.split(" ")[1] : null,
        email: user.email,
        uid: user.uid,
        photoURL: user.photoURL ? user.photoURL : ""
      });
    }
  }
  updateUser() {
    var user = this.props.user;
    var name = user.displayName;
    this.setState({
      firstname: name.split(" ")[0],
      lastname: name.split(" ").length > 1 ? name.split(" ")[1] : null,
      email: user.email,
      uid: user.uid,
      photoURL: user.photoURL ? user.photoURL : ""
    });

  }
  signoutPress = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  childHandler() {
    this.updateUser();
    this.setState({ edit: false });
    this._panel.hide();
  }
  goBack() {
    this.updateUser();
    this.setState({ edit: false });
  }

  editProfile() {
    this.setState({ edit: true });
  }

  componentWillMount() {
    this.getUser();
    console.log(this.props.user);
    this.mounted = true;
    this.startHeaderHeight = 80;
    if (Platform.OS == "android") {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
    }
  }
  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.getGoals();
  };

  _draggedValue = new Animated.Value(180);
  render() {
    const data = [50, 10, 40, 30, 20, 85, 91, 35, 53];
    const headerTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: "clamp"
    });
    const titleOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: "clamp"
    });
    const smallTitleOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, 1],
      extrapolate: "clamp"
    });
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.back }}>
        <SlidingUpPanel
          onDragStart={() => console.log("start")}
          onDragEnd={() => console.log("end")}
          containerStyle={{
            zIndex: 9999,
            elevation: 2,
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
          {dragHandler =>
            !this.state.edit ? (
              <AccountSlider
                data={{
                  dragHandler: dragHandler,
                  firstName: this.state.firstname,
                  lastName: this.state.lastname,
                  email: this.state.email,
                  icon:
                    this.state.lastname && this.state.firstname
                      ? this.state.firstname[0] + this.state.lastname[0]
                      : "XX",
                  image: this.state.photoURL
                }}
                action={this.childHandler}
                signOut={this.signoutPress}
                editProfile={this.editProfile}
              />
            ) : (
                <AccountEdit
                  data={{
                    dragHandler: dragHandler,
                    firstName: this.state.firstname,
                    lastName: this.state.lastname,
                    email: this.state.email,
                    icon:
                      this.state.lastname && this.state.firstname
                        ? this.state.firstname[0] + this.state.lastname[0]
                        : "XX",
                    image: this.state.photoURL
                  }}
                  action={this.childHandler}
                  goBack={this.goBack}
                  editProfile={this.editProfile}
                  saved={this.updateUser}
                />
              )
          }
        </SlidingUpPanel>
        <View
          style={[
            styles.avatar,
            {
              borderRadius: 36,
              zIndex: 9998,
              right: 20,
              backgroundColor: "transparent",
              top: TOP_SAFE_AREA + 25,
              position: "absolute"
            }
          ]}
        >
          <Avatar
            rounded
            size="medium"
            avatarStyle={{ backgroundColor: theme.scheme.cadet_blue }}
            onPress={() => this._panel.show()}
            title={
              this.state.lastname && this.state.firstname
                ? this.state.firstname[0] + this.state.lastname[0]
                : "XX"
            }
            source={{
              uri: this.state.photoURL === "" ? null : this.state.photoURL
            }}
          />
        </View>
        <StatusBar barStyle="dark-content" />
        <Animated.View
          style={[
            styles.header,
            { transform: [{ translateY: headerTranslate }] }
          ]}
        >
          <Animated.View
            style={[styles.titleContain, { opacity: titleOpacity }]}
          >
            <Text style={styles.title}>
              Hi, {this.state.firstname}
            </Text>
          </Animated.View>
        </Animated.View>

        <View style={{ flex: 1 }}>
          <Animated.ScrollView
            style={{ backgroundColor: "transparent" }}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
            scrollEventThrottle={1}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
              { useNativeDriver: true }
            )}
          >
            <View
              style={{
                marginTop: HEADER_MAX_HEIGHT - TOP_SAFE_AREA,
                marginLeft: 20,
                alignContent: "center",
                justifyContent: "center"

                // flex: 1
              }}
            >
              <Text
                style={{ fontWeight: "700", fontSize: 30, color: "#3F4F5A" }}
              >
                You're saving
                <Text style={{ color: theme.scheme.crusta }}> $24.89 </Text>
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
                marginHorizontal: 15
              }}
            >
              <OverviewChart
                data={{
                  position: "center",
                  // image: require("../assets/images/entertainment_back.jpg"),
                  image: ["#388acf", theme.scheme.crusta],
                  data: [51, 52, 45, 51, 52, 53, 54],
                  color: theme.scheme.sunshade,
                  title: "Bad Spending"
                }}
                navigation={this.props.navigation}
              />
              <OverviewChart
                data={{
                  position: "left",
                  // image: require("../assets/images/bill_back.jpg"),
                  image: [theme.scheme.crusta, theme.scheme.supernova],
                  data: [50, 52, 51, 51, 48, 53, 47],
                  color: theme.scheme.sunglow,
                  title: "Week Spending"
                }}
                navigation={this.props.navigation}
              />
              <OverviewChart
                data={{
                  position: "right",
                  // image: require("../assets/images/food_back.jpg"),
                  image: ["#e790a6", theme.scheme.green],
                  data: [51, 48, 49, 50, 51, 53, 50, 53],
                  color: theme.scheme.ufo_green,
                  title: "Avg Saving"
                }}
                navigation={this.props.navigation}
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
                  <Text style={styles.title}>Transactions</Text>
                </View>
                <View
                  style={{
                    alignSelf: "center",
                    right: 10
                  }}
                />
              </View>
              <OverviewTransactionView
                data={{
                  position: "center",
                  // image: require("../assets/images/entertainment_back.jpg"),
                  image: ["#388acf", theme.scheme.crusta],
                  data: [51, 52, 45, 51, 52, 53, 54],
                  color: theme.scheme.sunshade,
                  title: "Bad Spending"
                }}
                navigation={this.props.navigation}
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
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("Goal", {
                        navigation: this.props.navigation
                      })
                    }
                  >
                    <Icon
                      name={"ios-add"}
                      color={theme.colors.gray}
                      size={35}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                {this.state.items.map(doc => {
                  return (
                    <Goal
                      key={doc.name}
                      navigation={this.props.navigation}
                      data={{
                        title: doc.name,
                        date: doc.date,
                        category: doc.category,
                        value: doc.value,
                        period: doc.period
                      }}
                    />
                  );
                })}
              </View>
            </View>
          </Animated.ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
export default connect(mapStateToProps)(Overview);

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
    paddingTop: 30
    // flex: 6
  },
  title: {
    fontSize: 28,
    backgroundColor: "transparent",
    fontWeight: "800",
    color: theme.colors.gray
  },

  microtitle: {
    fontSize: theme.sizes.microsub,
    fontWeight: "600",
    backgroundColor: "transparent",
    color: theme.scheme.crusta
  },
  goals: {
    marginTop: 20,
    flexDirection: "column",
    marginHorizontal: 20
  },
  header: {
    position: "absolute",
    top: TOP_SAFE_AREA,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    overflow: "hidden",
    height: HEADER_MAX_HEIGHT
  },
  avatar: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 1
  }
});
