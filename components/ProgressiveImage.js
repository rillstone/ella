import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import * as theme from '../theme';
const styles = StyleSheet.create({
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  container: {
    backgroundColor: theme.colors.gray,
  },
});
class ProgressiveImage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image {...this.props} />
      </View>
    );
  }
}
export default ProgressiveImage;