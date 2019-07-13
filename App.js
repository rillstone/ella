import React from "react";
import { AppLoading } from 'expo';
import { StyleSheet, Text, View, YellowBox } from "react-native";
import { mapping, light as lightTheme } from "@eva-design/eva";
import { ApplicationProvider, Layout } from "react-native-ui-kitten";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import Overview from "./screens/Overview";
import AppNavigator from "./navigator/AppNavigator";
import Planner from "./screens/Planner";
import Transactions from "./screens/Transactions";
import Settings from "./screens/Settings";
import ApiKeys from "./constants/ApiKeys";
import * as firebase from "firebase";
import { dispatch, connect, Provider } from "./store";
import { MenuProvider } from 'react-native-popup-menu';
import _ from 'lodash';

// firebase.initializeApp(ApiKeys.FirebaseConfig);

const mapStateToProps = state => ({
  user: state.user,
  // put the stuff here you want to access from global store
  // then instead of calling it from this.state.user call it from this.props.user

});

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

class App extends React.Component {

  mounted = false;
  constructor() {
    super();
    this.state = {
      isLoadingComplete: false,
      isAuthenticationReady: false,
      isAuthenticated: false,
      user: null
    };
    firebase.initializeApp(ApiKeys.FirebaseConfig);
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  }
  componentDidMount() {
    this.mounted = true;
  }
  onAuthStateChanged = (user) => {
    this.setState({
      isAuthenticationReady: true,
      isAuthenticated: !!user,
      isLoadingComplete: true,
      user: firebase.auth().currentUser
    })
  };

  render() {
    if (this.state.isLoadingComplete) {
      return (
        <MenuProvider>
          <ApplicationProvider mapping={mapping} theme={lightTheme}>
            <Provider>
              <AppNavigator />
            </Provider>
          </ApplicationProvider>
        </MenuProvider>
      );
    } else return null;

  }
  _loadResourcesAsync = async () => {
    return Promise.all([

    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
export default connect(mapStateToProps)(App);