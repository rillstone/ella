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
    Animated
} from "react-native";
import TransitionView from "../../components/TransitionView";
import * as theme from "../../theme";
import Icon from "react-native-vector-icons/Ionicons";
import { getInset } from "react-native-safe-area-view";
import { NavigationActions } from "react-navigation";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers
} from 'react-native-popup-menu';

import * as categoryTypes from "../../components/goals/CategoryTypes";
import { Transition } from "react-navigation-fluid-transitions";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
    "window"
);
const IS_IOS = Platform.OS === "ios";
function wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}
const backdrop = [require("../../assets/images/general_back.png"), require("../../assets/images/leisure_back.png"), require("../../assets/images/personal_back.png"), require("../../assets/images/save_back.png"), require("../../assets/images/wellbeing_back.png"), require("../../assets/images/goal_back.png")];
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
            period: "month"
        };
        this.props = props;
    }

    componentWillMount() {
        this.mounted = true;
        this.startHeaderHeight = 80;
        if (Platform.OS == "android") {
            this.startHeaderHeight = 100 + StatusBar.currentHeight;
        }
    }

    render() {
        const { navigation } = this.props;
        const meal = navigation.getParam("data", {});
        console.log(this.props.title);
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
                        this._menu.open()
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
                <View style={styles.scrollOver}>
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
                        <View style={{ flexDirection: "column", left: 15, alignItems: "center", marginTop: 30 }}>
                            <Text style={styles.title}>{meal.name}</Text>
                            <Text style={styles.date}>
                                Preparation time: {meal.readyInTime} mins
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                marginTop: 30,
                                left: 30,
                                alignItems: "center"
                            }}
                        >
                            <Icon
                                name={
                                    "ios-rocket"
                                }
                                size={30}
                                color={theme.colors.inactive}
                            />
                            <Text style={[styles.date, { left: 15, top: 5 }]}>
                                Category Placeholder
                            </Text>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}
export default MealView;

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
        left: 0
    },
    date: {
        color: theme.colors.gray,
        fontSize: 18,
        left: 0
    },
});
