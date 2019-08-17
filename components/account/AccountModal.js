import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import PropTypes from "prop-types";
import * as theme from "../../theme";
import { Button, Avatar, Divider } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import Modalize from "react-native-modalize";
import AccountEdit from "./AccountEdit";
import AccountSlider from "./AccountSlider";

import { dispatch, connect } from "../../store";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
const mapStateToProps = state => ({
    user: state.user,
    colors: state.colors
  });
class AccountModal extends Component {
    modal = React.createRef();
  static propTypes = {
    // data: PropTypes.object.isRequired
  };
  

  constructor(props) {
    super();
    this.state = {
        child: "hide",
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
  }

  componentDidMount() {
    this.props.onRef(this)
    this.updateUser();
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }
  renderContent = () => {
    return ( 
      !this.state.edit ? (
        <AccountSlider
          data={{

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
          navigation={this.props.navigation}
        />
      ) : (
          <AccountEdit
            data={{
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
    );
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
  onClosed = () => {
    dispatch("SET_HIDE", false);
    // const setParamsAction = NavigationActions.setParams({
    //   params: { showTabBar: true }, key: this.props.navigation.state.key, 
    // });
    // this.props.navigation.dispatch(setParamsAction);
    const { onClosed } = this.props;
    if (onClosed) {
      onClosed();
    }
  };

  openModal = () => {
    dispatch("SET_HIDE", true);
    if (this.modal.current) {
      this.modal.current.open();
      // const setParamsAction = NavigationActions.setParams({
      //   params: { showTabBar: false }, key: this.props.navigation.state.key, 
      // });
      // this.props.navigation.dispatch(setParamsAction);
    }
  };

  closeModal = () => {
    dispatch("SET_HIDE", false);
    if (this.modal.current) {
      // const setParamsAction = NavigationActions.setParams({
      //   params: { showTabBar: true }, key: this.props.navigation.state.key, 
      // });
      // this.props.navigation.dispatch(setParamsAction);
      this.modal.current.close();

    }
  };
  signoutPress = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };
  childHandler() {
    this.updateUser();
    this.setState({ edit: false });
    this.closeModal();
  }
  goBack() {
    this.updateUser();
    this.setState({ edit: false });
  }

  editProfile() {
    this.setState({ edit: true });
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
  render() {
    // const {
    //   data: { dragHandler, firstName, lastName, email, icon, image }
    // } = this.props;
    return (
        <Modalize
        ref={this.modal}
        onClosed={this.onClosed}
        handlePosition={"inside"}
        adjustToContentHeight
        modalStyle={{borderRadius:12, backgroundColor: this.props.colors.back,zIndex: 99999,}}
      >
        {this.renderContent()}
      </Modalize>
    );
  }
}
export default connect(mapStateToProps)(AccountModal);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    alignItems: "center",

    justifyContent: "center",
    backgroundColor: "#f6f5f7",

    borderTopLeftRadius: 13,
    borderTopRightRadius: 13
  },
  dragHandler: {
    alignSelf: "stretch",
    height: 64,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "transparent"
    // alignContent: "flex-start",  justifyContent: "flex-start",alignSelf: "flex-start",
  }
});
