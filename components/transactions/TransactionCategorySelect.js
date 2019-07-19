import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { Button } from "react-native-elements";
import * as theme from "../../theme";

export default class TransactionCategorySelect extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    const {
      data: { name, selected }
    } = this.props;
    return (
      <TouchableOpacity
        style={selected === name ? styles.categorySelected : styles.category}
        onPress={() => this.props.buttonPress(name)}
      >
        <Text
          style={
            selected === name
              ? styles.categoryTitleSelected
              : styles.categoryTitle
          }
        >
          {name}
        </Text>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  category: {
    marginHorizontal: 5,
    borderRadius: 10
  },
  categorySelected: {
    marginHorizontal: 5,
    backgroundColor: "white",
    borderRadius: 10
  },
  categoryTitle: {
    color: "white",
    fontSize: 16,
    padding: 5,
    paddingHorizontal: 8,
  },
  categoryTitleSelected: {
    color: theme.colors.gray,
    fontSize: 16,
    padding: 5,
    paddingHorizontal: 8,
  }
});
