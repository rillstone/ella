import { createStackNavigator, createAppContainer } from "react-navigation";
import Overview from "../screens/Overview";
import CategoryView from "../screens/CategoryView";
import TabNavigator from "./TabNavigator";


const AppNavigator = createStackNavigator(
  {
    Home: Overview,
    Category: CategoryView
  },
  {
    mode: "modal"
  }
);

export default createAppContainer(TabNavigator);