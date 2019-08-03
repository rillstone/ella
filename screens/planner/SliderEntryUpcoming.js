import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Dimensions, Platform } from 'react-native';
import * as theme from '../../theme';
import { Transition } from 'react-navigation-fluid-transitions';

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
function wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}
const entryBorderRadius = 8;
const slideHeight = 180;
const slideWidth = wp(40);
const itemHorizontalMargin = wp(2);
export const sliderWidthSmall = viewportWidth;
export const itemWidthSmall = slideWidth + itemHorizontalMargin * 2;


export default class SliderEntryUpcoming extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
    };

    render() {
        const { data, navigation } = this.props;
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => navigation.navigate('MealView', { data: data })}
            >
                <ImageBackground
                    source={{ uri: data.imageUrl }}
                    imageStyle={{ borderRadius: entryBorderRadius }}
                    style={styles.slideInnerContainer}
                >
                </ImageBackground>
                    <View style={styles.textContainer}>
                        <Text
                            style={styles.title}
                            numberOfLines={2}>
                            {data.name}
                        </Text>
                    </View>
            </TouchableOpacity >
        );
    }
}

const styles = StyleSheet.create({
    slideInnerContainer: {
        width: slideWidth,
        height: slideHeight,
        marginHorizontal: itemHorizontalMargin,
        paddingBottom: itemHorizontalMargin,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        justifyContent: "flex-end",
    },
    textContainer: {
        justifyContent: 'center',
        paddingTop: 20 - entryBorderRadius,
        // height: 100,
        width: slideWidth,
        paddingBottom: 10,
        paddingHorizontal: 0,
        marginHorizontal: wp(2),
        backgroundColor: 'transparent',
        borderRadius: entryBorderRadius,
    },
    title: {
        fontSize: 16,
        fontWeight: "700",
        color: theme.colors.gray,

    },
    subtitle: {
        marginTop: 2,
        fontSize: 15,
        color: theme.colors.gray
    },
});