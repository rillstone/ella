import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class SliderEntry extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
    };

    render() {
        const { data: { title, subtitle, image }, navigation } = this.props;

        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => navigation.navigate('TransactionCategory', { chartColor: color, lineD: lineData, fontColor: textColor })}
            >
                <ImageBackground
                    source={image}
                    imageStyle={{ borderRadius: entryBorderRadius }}
                    style={styles.slideInnerContainer}
                >
                    <View style={styles.textContainer}>
                        <Text
                            style={styles.title}
                            numberOfLines={2}>
                            {title}
                        </Text>
                        <Text
                            style={styles.subtitle}
                            numberOfLines={2}>
                            {subtitle}
                        </Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity >
        );
    }
}

import { Dimensions, Platform } from 'react-native';
import * as theme from '../../theme';

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = 300;
const slideWidth = wp(85);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

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
        height: 80,
        paddingBottom: 16,
        paddingHorizontal: 16,
        marginHorizontal: wp(2),
        backgroundColor: 'white',
        borderRadius: entryBorderRadius,
    },
    title: {
        fontSize: 24,
        color: theme.colors.gray
    },
    subtitle: {
        marginTop: 2,
        fontSize: 16,
        color: theme.colors.gray
    },
});