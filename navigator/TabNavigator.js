import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";

import TransactionScreen from "../screens/TransactionScreen";
import Overview from "../screens/Overview";
import NewGoal from "../screens/NewGoal";
import GoalView from "../screens/GoalView";
import OverviewChartView from "../screens/OverviewChartView";
// import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import NewUserWelcomeScreen from "../screens/NewUserWelcomeScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import Icon from "react-native-vector-icons/Ionicons";
import Planner from "../screens/Planner";
import Transactions from "../screens/Transactions";
import TransactionsScreen from "../screens/TransactionsScreen";
import TransactionsCategoryView from "../screens/TransactionCategoryView";
import Settings from "../screens/Settings";
import { FluidNavigator } from "react-navigation-fluid-transitions";
import * as theme from '../theme';


import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';


class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}


const activeColor = theme.scheme.crusta;
const inactiveColor = "#B2B2B2";

const HomeStack = createStackNavigator(
  {
    Home: Overview,
    Goal: NewGoal,
    ViewGoal: GoalView,
    OverviewChart: OverviewChartView,
    TransactionView: TransactionScreen,
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

HomeStack.navigationOptions = ({ navigation }) => {
  var tabBarVisible = true;
  const routeName = navigation.state.routes[navigation.state.index].routeName;

  if (
    routeName === "ViewGoal" ||
    routeName === "OverviewChart" ||
    routeName === "TransactionView"
  ) {
    tabBarVisible = false;
  }


  return {
    headerStyle: {
      backgroundColor: 'green',
    },
    tabBarVisible,
    tabBarLabel: "Overview",
    tabBarIcon: ({ focused }) => (
      <Icon
        name="ios-today"
        size={26}
        color={focused ? activeColor : inactiveColor}
      />
    )
  };
};

const PlannerStack = createStackNavigator(
  {
    PlannerScreen: Planner
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

PlannerStack.navigationOptions = ({ navigation }) => {
  return {
    tabBarLabel: "Planner",
    tabBarIcon: ({ focused }) => (
      <Icon
        name="ios-create"
        size={26}
        color={focused ? activeColor : inactiveColor}
      />
    )
  }
};

const TransactionsStack = createStackNavigator(
  {
    TransactionsScreen: TransactionsScreen,
    TransactionCategory: TransactionsCategoryView
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

TransactionsStack.navigationOptions = ({ navigation }) => {
  var tabBarVisible = true;
  const routeName = navigation.state.routes[navigation.state.index].routeName;

  if (routeName == "TransactionCategory") {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: "Transactions",
    tabBarIcon: ({ focused }) => (
      <Icon
        name="ios-card"
        size={26}
        color={focused ? activeColor : inactiveColor}
      />
    )
  };
};

const SettingsStack = createStackNavigator({
  SettingsScreen: Settings
});

SettingsStack.navigationOptions = {

  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <Icon
      name="ios-settings"
      size={26}
      color={focused ? activeColor : inactiveColor}
    />
  )
};

const TabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    PlannerStack,
    TransactionsStack,
    SettingsStack
  },
  {
    tabBarOptions: {
      // showLabel: false,
      inactiveTintColor: inactiveColor,
      activeTintColor: activeColor,
      style: {

      }
    }
  }
);

const SignInStack = FluidNavigator(
  {
    // NewUser: NewUserWelcomeScreen,
    Welcome: WelcomeScreen,
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
    // HomePage: TabNavigator
  }, { navigationOptions: { gesturesEnabled: false } },
  {
    mode: "card",
    headerMode: "none"
  }

);
export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: TabNavigator,
    Auth: SignInStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
)

// export default SignInStack;
