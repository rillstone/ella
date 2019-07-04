import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Dimensions,
  Animated,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import * as theme from "../theme";
import SlidingUpPanel from "rn-sliding-up-panel";
import Icon from "react-native-vector-icons/Ionicons";
import { Avatar } from "react-native-elements";
import AccountSlider from "../components/AccountSlider";
import OverviewChart from "../components/OverviewChart";
import { Transition } from "react-navigation-fluid-transitions";
import * as firebase from "firebase";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

class Overview extends Component {
  mounted = false;
  constructor(props) {
    super();
    this.state = {
      lastname: null,
      child: "hide"
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
            <OverviewChart
              data={{
                position: "left",
                image: require("../assets/images/bill_back.jpg"),
                data: data.slice(3, 9)
              }}
            />
            <OverviewChart
              data={{
                position: "center",
                image: require("../assets/images/entertainment_back.jpg"),
                data: data
              }}
            />
            <OverviewChart
              data={{
                position: "right",
                image: require("../assets/images/food_back.jpg"),
                data: data.slice(1, 7)
              }}
            />
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
  titleContain: {
    paddingLeft: 20,
    paddingTop: 30,
    flex: 6
  },
  title: {
    fontSize: theme.sizes.title,
    fontWeight: "800",
    color: theme.colors.gray
  },

  microtitle: {
    fontSize: theme.sizes.microsub,
    fontWeight: "600",
    color: "#F6699A"
  }
});
