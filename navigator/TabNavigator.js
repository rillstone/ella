import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
  Header
} from "react-navigation";

import TransactionScreen from "../screens/transactions/TransactionScreen";
import Overview from "../screens/overview/Overview";
import NewGoal from "../screens/goals/NewGoal";
import GoalView from "../screens/goals/GoalView";
import OverviewChartView from "../screens/overview/OverviewChartView";
// import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import WelcomeScreen from "../screens/intro/WelcomeScreen";
import NewUserWelcomeScreen from "../screens/intro/NewUserWelcomeScreen";
import SignInScreen from "../screens/intro/SignInScreen";
import SignUpScreen from "../screens/intro/SignUpScreen";
import Icon from "react-native-vector-icons/Ionicons";
import Planner from "../screens/planner/Planner";
import PlannerIntro from "../screens/planner/plannerIntro/PlannerIntro";
import MealSizeCount from "../screens/planner/plannerIntro/MealSizeCount";
import DietaryReq from "../screens/planner/plannerIntro/DietaryReq";
import MealServicesList from "../screens/planner/plannerIntro/MealServicesList";
import MealServicePlans from "../screens/planner/plannerIntro/MealServicePlans";
import PlannerInitQuestions from "../screens/planner/plannerIntro/PlannerInitQuestions";
import MealView from "../screens/planner/MealView";
import Transactions from "../screens/transactions/Transactions";
import TransactionsScreen from "../screens/transactions/TransactionsScreen";
import TransactionsCategoryView from "../screens/transactions/TransactionCategoryView";
import Settings from "../screens/Settings";
import LinkedAccountsScreen from "../screens/settings/LinkedAccountsScreen";
import BudgetScreen from "../screens/settings/BudgetScreen";
import AuthenticationScreen from "../screens/settings/AuthenticationScreen";
import AboutScreen from "../screens/settings/AboutScreen";
import ContactScreen from "../screens/settings/ContactScreen";
import CustomTabNav from "./CustomTabNav";
import { FluidNavigator } from "react-navigation-fluid-transitions";
import * as theme from "../theme";

import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Platform
} from "react-native";

const headerProps = {
  headerTintColor: "#fff"
};

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("userToken");

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? "App" : "Auth");
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

class PlannerUserDataScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const plannerUserDataScreen = await AsyncStorage.getItem("plannerIntro");
    this.props.navigation.navigate(
      plannerUserDataScreen === "Planner" ? "Planner" : "PlannerIntro"
    );
  };

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
    TransactionView: TransactionScreen
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);
HomeStack.TranitionConfig;
HomeStack.navigationOptions = ({ navigation }) => {
  var tabBarVisible = true;
  const routeName = navigation.state.routes[navigation.state.index].routeName;

  if (
    routeName === "ViewGoal" ||
    routeName === "Goal" ||
    routeName === "OverviewChart" ||
    routeName === "TransactionView"
  ) {
    tabBarVisible = false;
  }

  if (routeName === "TransactionView") {
  }

  return {
    headerStyle: {
      backgroundColor: "green"
    },
    // tabBarVisible: (navigation.state.routes[0].params && navigation.state.routes[0].params.showTabBar) && tabBarVisible,
    animationEnabled: true,
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
    Planner: Planner,
    MealView: MealView
  },
  {
    headerMode: "none",
    mode: "modal",
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);

PlannerStack.navigationOptions = ({ navigation }) => {
  var tabBarVisible = true;
  const routeName = navigation.state.routes[navigation.state.index].routeName;

  if (routeName === "MealView") {
    tabBarVisible = false;
  }
  return {
    tabBarLabel: "Planner",
    tabBarVisible,

    tabBarIcon: ({ focused }) => (
      <Icon
        name="ios-heart"
        size={26}
        color={focused ? theme.scheme.green : inactiveColor}
      />
    )
  };
};

const PlannerIntroStack = createStackNavigator(
  {
    PlannerScreen: PlannerIntro,

    PlannerInitQuestions: PlannerInitQuestions,
    MealSizeCount: MealSizeCount,
    DietaryReq: DietaryReq,
    MealServicesList: MealServicesList,
    MealServicePlans: MealServicePlans
  },
  {
    headerMode: "none",
    mode: "modal",
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);

PlannerIntroStack.navigationOptions = ({ navigation }) => {
  var tabBarVisible = true;
  const routeName = navigation.state.routes[navigation.state.index].routeName;

  if (
    routeName === "PlannerInitQuestions" ||
    routeName === "MealSizeCount" ||
    routeName === "DietaryReq" ||
    routeName === "MealServicesList" ||
    routeName === "MealServicePlans"
  ) {
    tabBarVisible = false;
  }
  return {
    tabBarLabel: "Planner",
    tabBarVisible,

    tabBarIcon: ({ focused }) => (
      <Icon
        name="ios-heart"
        size={26}
        color={focused ? theme.scheme.green : inactiveColor}
      />
    )
  };
};

const PlannerSwitchNavigator = createSwitchNavigator(
  {
    PlannerUser: PlannerUserDataScreen,
    Planner: PlannerStack,
    PlannerIntro: PlannerIntroStack
  },
  {
    initialRouteName: "PlannerUser"
  }
);

PlannerSwitchNavigator.navigationOptions = ({ navigation }) => {
  var tabBarVisible = true;
  const routeName = navigation.state.routes[navigation.state.index].routeName;
  // console.log(
  //   navigation.state.routes[navigation.state.index].routes
  //     ? navigation.state.routes[navigation.state.index].routes.length
  //     : ""
  // );
  if (
    navigation.state.routes[navigation.state.index].routes &&
    navigation.state.routes[navigation.state.index].routes.length > 1
  ) {
    if (
      navigation.state.routes[navigation.state.index].routes[1].routeName ===
      "MealView" || navigation.state.routes[navigation.state.index].routes[1].routeName ===
      "PlannerInitQuestions" ||  navigation.state.routes[navigation.state.index].routes[1].routeName ===
      "MealSizeCount" || navigation.state.routes[navigation.state.index].routes[1].routeName ===
      "DietaryReq" || navigation.state.routes[navigation.state.index].routes[1].routeName ===
      "MealServicesList" || navigation.state.routes[navigation.state.index].routes[1].routeName ===
      "MealServicePlans"
    ) {
      tabBarVisible = false;
    }
  }
  if (
    routeName === "MealView" ||
    routeName === "PlannerInitQuestions" ||
    routeName === "MealSizeCount" ||
    routeName === "DietaryReq" ||
    routeName === "MealServicesList" ||
    routeName === "MealServicePlans"
  ) {
    tabBarVisible = false;
  }
  return {
    tabBarLabel: "Planner",
    tabBarVisible,

    tabBarIcon: ({ focused }) => (
      <Icon
        name="ios-heart"
        size={26}
        color={focused ? theme.scheme.green : inactiveColor}
      />
    )
  };
};
const TransactionsStack = createStackNavigator(
  {
    TransactionsScreen: TransactionsScreen,
    TransactionCategory: TransactionsCategoryView,
    TransactionView2: TransactionScreen
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

TransactionsStack.navigationOptions = ({ navigation }) => {
  var tabBarVisible = true;
  const routeName = navigation.state.routes[navigation.state.index].routeName;

  if (routeName == "TransactionCategory" || routeName === "TransactionView2") {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: "Transactions",
    tabBarIcon: ({ focused }) => (
      <Icon
        name="ios-card"
        size={26}
        color={focused ? theme.scheme.cerise : inactiveColor}
      />
    )
  };
};

const SettingsStack = createStackNavigator(
  {
    SettingsScreen: {
      screen: Settings,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    LinkedAccounts: {
      screen: LinkedAccountsScreen,
      navigationOptions: ({ navigation }) =>
        Platform.OS == "android"
          ? {
              headerStyle: {
                backgroundColor: theme.scheme.royal_blue
              },
              headerTitle: "Accounts",
              headerTintColor: "#fff"
            }
          : { header: null }
    },
    BudgetScreen: {
      screen: BudgetScreen,
      navigationOptions: ({ navigation }) =>
        Platform.OS == "android"
          ? {
              headerStyle: {
                backgroundColor: theme.scheme.fuchsia_blue
              },
              headerTitle: "Budget",
              headerTintColor: "#fff"
            }
          : { header: null }
    },
    Authentication: {
      screen: AuthenticationScreen,
      navigationOptions: ({ navigation }) =>
        Platform.OS == "android"
          ? {
              headerStyle: {
                backgroundColor: theme.scheme.green
              },
              headerTitle: "Authentication",
              headerTintColor: "#fff"
            }
          : { header: null }
    },
    About: {
      screen: AboutScreen,
      navigationOptions: ({ navigation }) =>
        Platform.OS == "android"
          ? {
              headerStyle: {
                backgroundColor: theme.scheme.cerise
              },
              headerTitle: "About",
              headerTintColor: "#fff"
            }
          : { header: null }
    },
    Contact: {
      screen: ContactScreen,
      navigationOptions: ({ navigation }) =>
        Platform.OS == "android"
          ? {
              headerStyle: {
                backgroundColor: theme.scheme.supernova
              },
              headerTitle: "Contact",
              headerTintColor: "#fff"
            }
          : { header: null }
    }
  },
  { mode: "card", headerMode: "screen" }
);

SettingsStack.navigationOptions = ({ navigation }) => {
  return {
    tabBarLabel: "Settings",

    tabBarIcon: ({ focused }) => (
      <Icon
        name="ios-settings"
        size={26}
        color={focused ? theme.colors.gray : inactiveColor}
      />
    )
  };
};

const TabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    // PlannerStack,
    PlannerSwitchNavigator,
    TransactionsStack,
    SettingsStack
  },
  { tabBarComponent: CustomTabNav },
  {
    tabBarOptions: {
      showLabel: false,
      inactiveTintColor: inactiveColor,
      activeTintColor: activeColor,
      style: {
        borderTopColor: "transparent",
        // backgroundColor: theme.colors.back,
        shadowOffset: { width: 0, height: 1 },
        shadowColor: "#6b6b6b",
        shadowOpacity: 0.0,
        shadowRadius: 2,
        elevation: 1
      }
    }
  }
);

const SignInStack = FluidNavigator(
  {
    // NewUser: NewUserWelcomeScreen,
    Welcome: WelcomeScreen,
    SignIn: SignInScreen,
    SignUp: SignUpScreen
    // HomePage: TabNavigator
  },
  { navigationOptions: { gesturesEnabled: false } },
  {
    mode: "card",
    headerMode: "none"
  }
);
export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: TabNavigator,
    Auth: SignInStack
  },
  {
    initialRouteName: "AuthLoading"
  }
);

// export default SignInStack;
