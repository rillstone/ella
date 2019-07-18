import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import styles from '../../styles/SliderEntryTransaction.style';
const image = <View style={{backgroundColor: 'lime'}}></View>
export default class SliderEntryTransaction extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
    };

    render () {
        const { data: { title, subtitle, image, back,color,lineData,textColor}, navigation} = this.props;
        
        const uppercaseTitle = <Text
        style={[styles.title]}
        numberOfLines={1}
      >
          { title }
      </Text>;

      const icon = <Image source={image} style={styles.image} />

        return (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => navigation.navigate('TransactionCategory', {data: back, chartColor: color, lineD: lineData, fontColor: textColor})}
              style={styles.slideInnerContainer}>
                <View style={styles.shadow} />
                <View style={styles.imageContainer}>
                    { icon }
                </View>
                <View style={[styles.textContainer]}>
                    { uppercaseTitle }
                    {/* <Text
                      style={[styles.subtitle]}
                      numberOfLines={2}>
                        { subtitle }
                    </Text> */}
                </View>
            </TouchableOpacity>
        );
    }
}