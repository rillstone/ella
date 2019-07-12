import React from "react";
import { AppLoading } from 'expo';
import { StyleSheet, Text, View, YellowBox } from "react-native";
import { mapping, light as lightTheme } from "@eva-design/eva";
import { ApplicationProvider, Layout } from "react-native-ui-kitten";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import Overview from "./screens/Overview";
import AppNavigator from "./navigator/AppNavigator";
import { createStore } from "redux";
import Planner from "./screens/Planner";
import Transactions from "./screens/Transactions";
import Settings from "./screens/Settings";
import ApiKeys from "./constants/ApiKeys";
import * as firebase from "firebase";
import { Provider } from "react-redux";
import { store } from "./redux/app-redux";
import { MenuProvider } from 'react-native-popup-menu';
import _ from 'lodash';

// firebase.initializeApp(ApiKeys.FirebaseConfig);

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
  // componentWillUnmount() {
  //   this.mounted = false;
  //   this.firebaseListener && this.firebaseListener();
  //   this.authListener = undefined;
  // }

  // authListener() {
  //   this.firebaseListener = 
  //   // this.firebaseListener();
  // }
  onAuthStateChanged = (user) => {
    // if (this.mounted) {
    this.setState({
      isAuthenticationReady: true,
      isAuthenticated: !!user,
      isLoadingComplete: true,
      user: firebase.auth().currentUser
    })
    // }
  };

  render() {
    if (this.state.isLoadingComplete) {
      return (
        <MenuProvider>

          <ApplicationProvider mapping={mapping} theme={lightTheme}>

            <AppNavigator />
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
// const App = () => (
// );

export default App;

// const navigation = createBottomTabNavigator({
//   Overview: {
//     screen: Overview,
//     navigationOptions: {
//       tabBarLabel: 'Overview',
//       tabBarIcon: ({ tintColor }) => (
//         <Icon name="ios-pulse" color={tintColor} size={24} />
//       )
//     }
//   },
//   Planner: {
//     screen: Planner,
//     navigationOptions: {
//       tabBarLabel: 'Planner',
//       tabBarIcon: ({ tintColor }) => (
//         <Icon name="ios-calendar" color={tintColor} size={24} />
//       )
//     }
//   },
//   Transactions: {
//     screen: Transactions,
//     navigationOptions: {
//       tabBarLabel: 'Transactions',
//       tabBarIcon: ({ tintColor }) => (
//         <Icon name="ios-card" color={tintColor} size={24} />
//       )
//     }
//   },
//   Settings: {
//     screen: Settings,
//     navigationOptions: {
//       tabBarLabel: 'Settings',
//       tabBarIcon: ({ tintColor }) => (
//         <Icon name="ios-settings" color={tintColor} size={24} />
//       )
//     }
//   },
// }, {
//     tabBarOptions: {
//       activeTintColor: '#FF2D55',
//       inactiveTintColor: '#B2B2B2',
//       showLabel: false,
//       style: {
//         backgroundColor: '#f6f5f7',
//         borderTopWidth: 0,
//         shadowOffset: { width: 0, height: 3 },
//         shadowColor: 'black',
//         shadowOpacity: 0.4,
//         elevation: 5,
//       }
//     }
//   })

// const App = createAppContainer(navigation);
// export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
