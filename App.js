import React from "react";
import { YellowBox } from "react-native";
import { mapping, light as lightTheme } from "@eva-design/eva";
import { ApplicationProvider } from "react-native-ui-kitten";
import AppNavigator from "./navigator/AppNavigator";
import ApiKeys from "./constants/ApiKeys";
import * as firebase from "firebase";
import { dispatch, connect, Provider } from "./store";
import { MenuProvider } from 'react-native-popup-menu';
import _ from 'lodash';

const mapStateToProps = state => ({
  user: state.user,
  // put the stuff here you want to access from the global store
  // then instead of calling it from "this.state.<var>" call it from "this.props.<var>"

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
    });
    // sent to the global store here
    dispatch("SET_USER", { user: { x: "dummy user to prove" } });
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