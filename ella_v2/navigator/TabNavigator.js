import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import Overview from "../screens/Overview";
import CategoryView from "../screens/CategoryView";
import Icon from "react-native-vector-icons/Ionicons";
import Planner from "../screens/Planner";
import Transactions from "../screens/Transactions";
import TransactionsCategoryView from "../screens/TransactionCategoryView";
import Settings from "../screens/Settings";

const activeColor = "#FF2D55";
const inactiveColor = "#B2B2B2";

const HomeStack = createStackNavigator(
  {
    Home: Overview,
    Category: CategoryView
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

HomeStack.navigationOptions = ({ navigation }) => {
  var tabBarVisible = true;
  const routeName = navigation.state.routes[navigation.state.index].routeName;

  if (routeName == "Category") {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: "Home",
    tabBarIcon: ({ focused }) => (
      <Icon
        name="ios-pulse"
        size={26}
        color={focused ? activeColor : inactiveColor}
      />
    )
  };
};

const PlannerStack = createStackNavigator({
  PlannerScreen: Planner
});

PlannerStack.navigationOptions = {
  tabBarLabel: "Planner",
  tabBarIcon: ({ focused }) => (
    <Icon
      name="ios-calendar"
      size={26}
      color={focused ? activeColor : inactiveColor}
    />
  )
};

const TransactionsStack = createStackNavigator({
  TransactionsScreen: Transactions,
  TransactionCategory: TransactionsCategoryView
},  
{
  mode: "modal",
  headerMode: "none"
});

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
      showLabel: false
    }
  }
);

export default TabNavigator;
