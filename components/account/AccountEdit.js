import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  ActivityIndicator
} from "react-native";
import PropTypes from "prop-types";
import SlidingUpPanel from "rn-sliding-up-panel";
import * as theme from "../../theme";
import { Button, Input, Avatar, Card, Divider } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
// import { ImagePicker, Permissions, Constants } from "expo";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as firebase from "firebase";
import { dispatch, connect } from '../../store';

import "firebase/storage";
import "firebase/firestore";

const mapStateToProps = state => ({
  user: state.user,
});

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
class AccountEdit extends Component {
  db = firebase.firestore();
  storage = firebase.storage();
  static propTypes = {
    data: PropTypes.object.isRequired
  };
  constructor(props) {
    super();
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      loading: false,
      uploading: false,
      imageName: "",
      photoURL: ""
    };
    this.props = props;
    this.saveProfile = this.saveProfile.bind(this);
  }
  componentDidMount() {
    this.getPermissionAsync();
    this.getUser();
  }

  saveProfile(firstName, lastName, email, func) {
    var user = this.props.user;
    return new Promise((resolve, reject) => {
      this.db
        .collection("users")
        .doc(user.uid)
        .set({
          name: this.state.firstName
            ? this.state.firstName +
              " " +
              (this.state.lastName ? this.state.lastName : lastName)
            : firstName +
              " " +
              (this.state.lastName ? this.state.lastName : lastName)
        }).catch(error => {
          reject();
        })
        .then(() => {
          user.updateProfile({
            displayName: this.state.firstName
              ? this.state.firstName +
                " " +
                (this.state.lastName ? this.state.lastName : lastName)
              : firstName +
                " " +
                (this.state.lastName ? this.state.lastName : lastName),
            email: this.state.email ? this.state.email : email
          });
        }).catch(error => {
          reject();
        })
        .then(() => {
          resolve();
        });
    });
  }

  getUser() {
    var user = this.props.user;
    console.log(user.uid);
    console.log(user.photoURL);
    // this.db.collection("users").doc(user.uid).set({name: user.displayName})

    if (user != null) {
      this.setState({
        photoURL: user.photoURL ? user.photoURL : ""
      });
    }
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };
  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var user = this.props.user;
    this.setState({ uploading: true });
    var ref = firebase
      .storage()
      .ref()
      .child("images/" + imageName);
    // this.db.collection("users").doc(user.uid).set({image: ref.child('images/imageName')})

    return ref.put(blob);
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.uploading != this.state.uploading &&
      this.state.uploading == false
    ) {
      var user = this.props.user;
      firebase
        .storage()
        .ref()
        .child("images/" + this.state.imageName)
        .getDownloadURL()
        .then(url => {
          user.updateProfile({
            photoURL: url
          });
          this.setState({ photoURL: url });
        });
    }
  }
  onChooseImagePress = async () => {
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5
    });

    if (!image.cancelled) {
      var date = new Date();
      var user = this.props.user;
      var imageName = Date.parse(date) + user.displayName;
      this.setState({ imageName: imageName });
      this.uploadImage(image.uri, imageName)
        .then(done => {
          return this.setState({ uploading: false });
        })
        // .then(
        //   // firebase.storage().ref().child("images/" + imageName).getDownloadURL().then(onResolve, onReject)

        //     .then(function() {
        //       // Update successful.

        //     })
        //     .catch(function(error) {
        //       // An error happened.
        //     })
        // )
        .catch(error => {
          console.log(error);
        });
    }
  };

  render() {
    const {
      data: { dragHandler, firstName, lastName, email, icon, image }
    } = this.props;

    return (
      <DismissKeyboard>
        <View style={styles.container}>
          <View style={styles.dragHandler} {...dragHandler}>
            <View style={styles.slideContainer}>
              <View
                style={{
                  flex: 1,
                  alignSelf: "center",
                  alignContent: "center",
                  justifyContent: "center"
                }}
              >
                <Button
                  title="back"
                  type="clear"
                  onPress={() => {
                    this.props.goBack();
                  }}
                  titleStyle={{ fontWeight: "600", fontSize: 20 }}
                  style={{ alignSelf: "center" }}
                />
              </View>
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
                    this.props.action();
                  }}
                  titleStyle={{ fontWeight: "600", fontSize: 20 }}
                  style={{ alignSelf: "center" }}
                />
              </View>
            </View>
          </View>
          <ActivityIndicator
            animating={this.state.uploading}
            color="#bc2b78"
            size="large"
            style={styles.activityIndicator}
          />
          <TouchableOpacity
            style={{
              flex: 0.5,
              marginVertical: 15,
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={this.onChooseImagePress}
          >
            <Avatar
              rounded
              avatarStyle={{ backgroundColor: theme.scheme.cadet_blue }}
              size="large"
              title={icon}
              showEditButton
              source={{
                uri:
                  this.state.photoURL !== ""
                    ? this.state.photoURL
                    : image === ""
                    ? null
                    : image
              }}
            />
          </TouchableOpacity>

          <View style={styles.nameHeader}>
            <Text style={styles.name}>{firstName + " " + lastName}</Text>

            <Text style={styles.email}>{email}</Text>
          </View>

          <View style={{ top: 10 }}>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCompleteType="name"
              placeholderTextColor={theme.colors.inactive}
              autoCompleteType="email"
              keyboardType="default"
              placeholder={firstName}
              textContentType="givenName"
              onChangeText={text => {
                this.setState({ firstName: text });
              }}
            />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              placeholderTextColor={theme.colors.inactive}
              keyboardType="default"
              autoCompleteType="name"
              placeholder={lastName}
              textContentType="familyName"
              onChangeText={text => {
                this.setState({ lastName: text });
              }}
            />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              placeholderTextColor={theme.colors.inactive}
              keyboardType="email-address"
              autoCompleteType="email"
              placeholder={email}
              textContentType="emailAddress"
              onChangeText={text => {
                this.setState({ email: text });
              }}
            />
          </View>

          <Divider
            style={{
              height: 1,
              width: viewportWidth - 50,
              backgroundColor: "#F5F5F5"
            }}
          />
          <View
            style={{
              flex: 2,
              alignContent: "flex-end",
              justifyContent: "flex-end",
              alignItems: "flex-end"
            }}
          >
            <Button
              onPress={() => {
                this.saveProfile(firstName, lastName, email).then(() => {
                  this.props.saved();
                }
                );
                // this.props.saved();
              }}
              title="save"
            />
            {/* <Text onPress={() => {this.panel.hide(); this.signoutPress();}}>Sign Out</Text> */}
          </View>

          <View style={{ flex: 0.1 }} />
        </View>
      </DismissKeyboard>
    );
  }
}

export default connect(mapStateToProps)(AccountEdit);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6f5f7"
  },
  dragHandler: {
    alignSelf: "stretch",
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
    // alignContent: "flex-start",  justifyContent: "flex-start",alignSelf: "flex-start",
  },
  slideContainer: {
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
  },
  nameHeader: {
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  name: {
    fontSize: 20,
    color: theme.colors.gray
  },
  email: {
    fontSize: 16,
    color: theme.colors.inactive
  },
  input: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.white,
    borderBottomWidth: 0,
    width: viewportWidth - 40,
    paddingLeft: 10,
    height: 40,
    borderRadius: 6,
    margin: 10,
    marginHorizontal: 30,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1
  },
  activityIndicator: {
    position: "absolute",
    // justifyContent: "center",
    top: viewportHeight / 2.5,
    // alignItems: "center",
    // alignContent: "center",
    alignSelf: "center",

    height: 80,
    zIndex: 100000
  }
});
