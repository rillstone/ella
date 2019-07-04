import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  Dimensions,
  ImageBackground,
  Animated,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import * as theme from "../theme";
import * as shape from "d3-shape";
import { LineChart, Grid } from "react-native-svg-charts";
import payments from "../assets/payments.json";
import SlidingUpPanel from "rn-sliding-up-panel";
import Icon from "react-native-vector-icons/Ionicons";
import { Button, Input, Avatar, Card,Divider } from "react-native-elements";

import { Transition } from "react-navigation-fluid-transitions";
import * as firebase from "firebase";
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
    this.state = {
      lastname: null
    };
    this.props = props;
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
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f5f7" }}>
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
            <View style={styles.container}>
              <View style={styles.dragHandler} {...dragHandler}>
                <View
                  style={
                    styles.dragHeader
                  }
                >
                  <View style={{ flex: 1, alignSelf: "flex-start" }} />
                  <View
                    style={{
                      flex: 2,
                      alignSelf: "center",
                      alignContent: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "600",
                        fontSize: 20,
                        color: theme.colors.gray,
                        textAlign: "center"
                      }}
                    >
                      Account
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignSelf: "center",
                      alignContent: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Button
                      title="done"
                      type="clear"
                      onPress={() => {
                        this._panel.hide();
                      }}
                      titleStyle={{ fontWeight: "600", fontSize: 20 }}
                      style={{ alignSelf: "center" }}
                    />
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 20,
                  marginTop: 40
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignContent: "center",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Avatar
                    rounded
                    size="medium"
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
                <View
                  style={{ flex: 5, flexDirection: "column", marginLeft: 10 }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: theme.colors.gray
                    }}
                  >
                    {/* {this.state.firstname + ' ' + this.state.lastname} */}
                    Charlie Rillstone
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "400",
                      color: "#5B7282"
                    }}
                  >
                    {/* {this.state.email} */}
                    charlierillstone@gmail.com
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignContent: "flex-end",
                    justifyContent: "flex-end",
                    alignItems: "flex-end"
                  }}
                >
                  <Icon name="ios-arrow-forward" size={26} color={"#E1E1E1"} />
                </View>
              </TouchableOpacity>
              <Divider style={{ height:1, width: viewportWidth-50,backgroundColor: '#F5F5F5' }} />
              <View
                style={{
                  flex: 2,
                  alignContent: "flex-end",
                  justifyContent: "flex-end",
                  alignItems: "flex-end"
                }}
              >
                <Button
                  type="clear"
                  onPress={() => {
                    this._panel.hide();
                    this.signoutPress();
                  }}
                  title="Sign Out"
                />
                {/* <Text onPress={() => {this._panel.hide(); this.signoutPress();}}>Sign Out</Text> */}
              </View>
              <View style={{ flex: 0.1 }} />
            </View>
          )}
        </SlidingUpPanel>
        <StatusBar barStyle="dark-content" />
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={styles.titleContain}>
            <Text style={styles.title}>
              {/* Hi, {this.state.firstname} */}
              Hi, Charlie!
            </Text>
            <Text style={styles.microtitle}>kuken!</Text>
          </View>
          {/* <Transition appear='scale' delay={500} shared="enter"> */}
          <View
            style={{
              flex: 0.8,
              marginRight: 20,
              paddingTop: 30,
              justifyContent: "center",
              alignItems: "center"
            }}
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
          {/* </Transition> */}
        </View>

        <View style={{ flex: 8 }}>
          <View
            style={{
              marginTop: 20,
              marginLeft: 20,
              alignContent: "center",
              justifyContent: "center"
              // flex: 1
            }}
          >
            <Text style={{ fontWeight: "700", fontSize: 30, color: "#3F4F5A" }}>
              You're saving
              <Text style={{ color: "#F6699A" }}> $24.89 </Text>
            </Text>
            <Text style={{ fontWeight: "300", fontSize: 28, color: "#3F4F5A" }}>
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
            <View
              style={{
                alignSelf: "flex-start",
                justifyContent: "flex-start",
                alignContent: "flex-start",
                left: 0
              }}
            >
              <View
                style={{
                  shadowOffset: { width: 0, height: 0 },
                  shadowColor: "black",
                  shadowOpacity: 0.3,
                  shadowRadius: 2,
                  elevation: 1,
                  backgroundColor: "#0000"
                }}
              >
                <ImageBackground
                  source={require("../assets/images/bill_back.jpg")}
                  style={[
                    {
                      marginHorizontal: 5
                    },
                    styles.card
                  ]}
                >
                  <LineChart
                    style={{
                      height: viewportWidth / 3
                    }}
                    curve={shape.curveNatural}
                    data={data.slice(3, 9)}
                    contentInset={{ top: 20, bottom: 20 }}
                    svg={{
                      strokeWidth: 2,
                      stroke: "#FFF"
                    }}
                  />
                </ImageBackground>
              </View>
            </View>
            <View
              style={{
                alignSelf: "center",
                justifyContent: "center",
                alignContent: "center"
              }}
            >
              <View
                style={{
                  shadowOffset: { width: 0, height: 0 },
                  shadowColor: "black",
                  shadowOpacity: 0.3,
                  shadowRadius: 2,
                  elevation: 1,
                  backgroundColor: "#0000"
                }}
              >
                <ImageBackground
                  source={require("../assets/images/entertainment_back.jpg")}
                  style={[
                    {
                      marginHorizontal: 9
                    },
                    styles.card
                  ]}
                >
                  <LineChart
                    style={{
                      height: viewportWidth / 3
                    }}
                    curve={shape.curveNatural}
                    data={data}
                    contentInset={{ top: 20, bottom: 20 }}
                    svg={{
                      strokeWidth: 2,
                      stroke: "#FFF"
                    }}
                  />
                </ImageBackground>
              </View>
            </View>
            <View
              style={{
                alignSelf: "flex-end",
                justifyContent: "flex-end",
                alignContent: "flex-end",
                right: 0
              }}
            >
              <View
                style={{
                  shadowOffset: { width: 0, height: 0 },
                  shadowColor: "black",
                  shadowOpacity: 0.3,
                  shadowRadius: 2,
                  elevation: 1,
                  backgroundColor: "#0000"
                }}
              >
                <ImageBackground
                  source={require("../assets/images/food_back.jpg")}
                  style={[
                    {
                      marginHorizontal: 5
                    },
                    styles.card
                  ]}
                >
                  <LineChart
                    style={{
                      height: viewportWidth / 3
                    }}
                    curve={shape.curveNatural}
                    data={data.slice(1, 7)}
                    contentInset={{ top: 20, bottom: 20 }}
                    svg={{
                      strokeWidth: 2,
                      stroke: "#FFF"
                    }}
                  />
                </ImageBackground>
              </View>
            </View>
          </View>
        </View>
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
  card: {
    borderRadius: 12,
    width: viewportWidth / 3.6,
    height: viewportWidth / 3,
    overflow: "hidden",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 1
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
  saving: {
    fontSize: 24,
    fontWeight: "800",
    color: theme.colors.gray
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

  container: {
    flex: 1,
    zIndex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  dragHandler: {
    alignSelf: "stretch",
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
    // alignContent: "flex-start",  justifyContent: "flex-start",alignSelf: "flex-start",
  },
  microtitle: {
    fontSize: theme.sizes.microsub,
    fontWeight: "600",
    color: "#F6699A"
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
  },
  dragHeader: {
    backgroundColor: "#F5F5F5",
                    width: viewportWidth,
                    height: 64,
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    shadowColor: "black",
                    shadowOffset: {
                      width: 0,
                      height: -1
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 2,
                    elevation: 0
  }

});
