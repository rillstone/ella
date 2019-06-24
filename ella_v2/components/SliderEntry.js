import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import styles from '../styles/SliderEntry.style';
const image = <View style={{backgroundColor: 'lime'}}></View>
export default class SliderEntry extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
    };

    render () {
        const { data: { title, subtitle, image }} = this.props;
        
        const uppercaseTitle = <Text
        style={[styles.title]}
        numberOfLines={2}
      >
          { title }
      </Text>;

      const icon = <Image source={image} style={styles.image} />

        return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.slideInnerContainer}>
                <View style={styles.shadow} />
                <View style={styles.imageContainer}>
                    { icon }
                </View>
                <View style={[styles.textContainer]}>
                    { uppercaseTitle }
                    <Text
                      style={[styles.subtitle]}
                      numberOfLines={2}>
                        { subtitle }
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}