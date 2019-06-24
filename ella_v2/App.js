import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import Overview from './screens/Overview'
import Planner from './screens/Planner'
import Transactions from './screens/Transactions'
import Settings from './screens/Settings'


const navigation = createBottomTabNavigator({
  Overview: {
    screen: Overview,
    navigationOptions: {
      tabBarLabel: 'Overview',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-pulse" color={tintColor} size={24} />
      )
    }
  },
  Planner: {
    screen: Planner,
    navigationOptions: {
      tabBarLabel: 'Planner',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-calendar" color={tintColor} size={24} />
      )
    }
  },
  Transactions: {
    screen: Transactions,
    navigationOptions: {
      tabBarLabel: 'Transactions',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-card" color={tintColor} size={24} />
      )
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-settings" color={tintColor} size={24} />
      )
    }
  },
}, {
    tabBarOptions: {
      activeTintColor: '#FF2D55',
      inactiveTintColor: '#ffc1cd',
      showLabel: false,
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        shadowOffset: { width: 5, height: 3 },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 5
      }
    }
  })

const App = createAppContainer(navigation);
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});