import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Animated,
  FlatList
} from "react-native";
import TransitionView from "../../components/TransitionView";
import * as theme from "../../theme";
import Icon from "react-native-vector-icons/Ionicons";
import { getInset } from "react-native-safe-area-view";
import { NavigationActions } from "react-navigation";
import { dispatch, connect } from "../../store";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers
} from "react-native-popup-menu";
const mapStateToProps = state => ({
  user: state.user,
  colors: state.colors,
});

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
const IS_IOS = Platform.OS === "ios";
function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
const backdrop = [
  require("../../assets/images/general_back.png"),
  require("../../assets/images/leisure_back.png"),
  require("../../assets/images/personal_back.png"),
  require("../../assets/images/save_back.png"),
  require("../../assets/images/wellbeing_back.png"),
  require("../../assets/images/goal_back.png")
];
const slideHeight = viewportHeight * 0.15;
const TOP_SAFE_AREA = Platform.OS === "ios" ? getInset("top") : 40;
const BOTTOM_SAFE_AREA = Platform.OS === "ios" ? getInset("bottom") : 40;
const slideWidth = wp(85);
const itemHorizontalMargin = wp(2);
const HEADER_MAX_HEIGHT = 400;
const HEADER_MIN_HEIGHT = Platform.OS === "ios" ? 250 : 250;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const DATE_OPTIONS = { weekday: "long", month: "long", day: "numeric" };

class MealView extends Component {
  mounted = false;
  constructor(props) {
    super();
    this.state = {
      scrollY: new Animated.Value(0),
      scrollOp: 1,
      period: "month",
      meal: props.navigation.getParam("data", {})
    };
    this.props = props;
  }

  componentWillMount() {
    this.mounted = true;
    this.startHeaderHeight = 80;
    if (Platform.OS == "android") {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
    }
    var list = [];
    var recipeList = [];
    this.state.meal.ingredients.split(",").map((tr, i) => {
      list.push({ key: tr });
    });
    this.state.meal.recipe.map((tr, i) => {
        recipeList.push({ key: tr });
      });
    this.setState({
      text: this.state.meal.ingredients,
      choice: "Ingredients",
      ingredientsStyle: styles.active,
      recipeStyle: styles.inactive,
      nutritionStyle: styles.inactive,
      ingredientsList: list,
      recipeList: recipeList
    });
  }
  render() {
    const { meal, ingredientsStyle, recipeStyle, nutritionStyle } = this.state;
    return (
      <View style={styles.fill}>
        <StatusBar hidden={true} />
        <Menu ref={c => (this._menu = c)} renderer={renderers.SlideInMenu}>
          <MenuTrigger />
          <MenuOptions>
            <MenuOption text="Save" />
            <MenuOption>
              <Text style={{ color: "red" }}>Delete</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>

        <TouchableOpacity
          onPress={() => {
            this.setState({ scrollOp: 0 });
            this.props.navigation.dispatch(NavigationActions.back());
          }}
          style={{
            position: "absolute",
            right: 25,
            top: 25,
            zIndex: 999
          }}
        >
          <Icon name="ios-close-circle" size={36} color={theme.colors.white} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this._menu.open();
          }}
          style={{
            position: "absolute",
            left: 25,
            top: 25,
            zIndex: 999
          }}
        >
          <Icon name="ios-more" size={36} color={theme.colors.white} />
        </TouchableOpacity>
        <ImageBackground
          source={{ uri: meal.imageUrl && meal.imageUrl }}
          style={{
            flex: 1,
            alignItems: "center",
            alignContent: "center",
            flexDirection: "column"
          }}
          imageStyle={{ resizeMode: "cover" }}
        />
        <View style={[styles.scrollOver,{backgroundColor: this.props.colors.back }]}>
          <ScrollView
            borderRadius={10}
            style={{
              overflow: "hidden",
              elevation: 1,
              position: "relative",
              borderRadius: 10,
              backgroundColor: "transparent"
            }}
          >
            <View
              style={{
                flexDirection: "column",
                left: 20,
                alignItems: "flex-start",
                marginTop: 30
              }}
            >
              <Text style={[styles.title, { color: this.props.colors.gray}]}>{meal.name}</Text>
              <Text style={[styles.date, { color: this.props.colors.gray}]}>
                Preparation time: {meal.readyInTime} mins
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 8,
                left: 10,
                alignItems: "flex-start",
                alignContent: 'flex-start',
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    choice: "Ingredients",
                    text: meal.ingredients,
                    recipeStyle: styles.inactive,
                    ingredientsStyle: styles.active,
                    nutritionStyle: styles.inactive
                  });
                }}
                style={{    
                    padding: 10,
                    fontSize: 30}}
              >
                <Text style={ingredientsStyle}>Ingredients</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    choice: "Recipe",
                    text: meal.recipe,
                    recipeStyle: styles.active,
                    ingredientsStyle: styles.inactive,
                    nutritionStyle: styles.inactive
                  });
                }}
                style={{    
                    padding: 10,
                    fontSize: 30}}
              >
                <Text style={[recipeStyle, { color: this.props.colors.gray}]}>Recipe</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    choice: "Nutrition",
                    text: meal.nutrition,
                    recipeStyle: styles.inactive,
                    ingredientsStyle: styles.inactive,
                    nutritionStyle: styles.active
                  });
                  
                }}
                style={{    
                    padding: 10,
                    fontSize: 30}}
                >
                <Text style={[nutritionStyle, { color: this.props.colors.gray}]}>Nutrition</Text>
                
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 30,
                left: 30,
                alignItems: "center"
              }}
            >
              {this.state.ingredientsStyle == styles.active || this.state.recipeStyle == styles.active? (
                <FlatList
                  style={{ marginBottom: 10,}}
                  data={this.state.ingredientsStyle == styles.active ? this.state.ingredientsList : this.state.recipeList}
                  //   renderItem={this.renderRow}
                  renderItem={({ item }) => (
                    <Text
                      style={{
                        marginBottom: 12,
                        paddingRight: 40,
                        fontSize: 18,
                        fontWeight: "300",
                        color: this.props.colors.inactive,
                        width: viewportWidth -20,
                      }}
                    >
                      <Icon
                        name="md-square-outline"
                        size={12}
                        color={this.props.colors.inactive}
                      />{"   "}
                      {item.key}{" "}
                    </Text>
                  )}
                />
              ) : (
                <Text style={[styles.recipe, { color: this.props.colors.gray}]}>{this.state.text}</Text>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
export default connect(mapStateToProps)(MealView);

const styles = StyleSheet.create({
  fill: {
    flex: 1
  },
  scrollOver: {
    width: viewportWidth,
    height: viewportHeight / 1.5,
    bottom: 0,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    shadowColor: "#6b6b6b",
    shadowOffset: {
      width: 0,
      height: -1
    },
    position: "absolute",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 1,
    zIndex: 10000,
    backgroundColor: "white"
  },
  title: {
    color: theme.colors.gray,
    fontSize: 30,
    fontWeight: '800',
    left: 0,
    textAlign: 'left'
  },
  date: {
    color: theme.colors.gray,
    fontSize: 18,
    left: 0
  },
  recipe: {
    color: theme.colors.gray,
    width: "90%"
  },
  active: {
    // backgroundColor: theme.colors.white,
    // padding: 10,
    // fontSize: 30,
    // borderRadius: 5,
    // borderWidth: 5,
    // borderColor: theme.scheme.ufo_green
    fontSize: 20, fontWeight: '600', color: theme.colors.gray

  },
  inactive: {
    fontSize: 20, fontWeight: '400', color: theme.colors.inactive
    // backgroundColor: theme.scheme.ufo_green,
    // padding: 10,
    // fontSize: 10,
    // borderRadius: 5,
    // borderWidth: 5,
    // borderColor: theme.scheme.ufo_green
  }
});
