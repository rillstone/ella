import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image
} from "react-native";
import * as theme from "../../theme";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/Ionicons";
import TransactionModal from "./TransactionModal";
import { connect,dispatch } from "../../store";
const colors = [
  theme.scheme.crusta,
  theme.scheme.royal_blue2,
  theme.scheme.cerise,
  theme.scheme.green,
  theme.scheme.fuchsia_blue
];
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
const mapStateToProps = state => ({
  user: state.user,
  colors: state.colors
});
class OverviewTransaction extends Component {
  // transactionModal = React.createRef();
  static propTypes = {
    data: PropTypes.object.isRequired,
    index: PropTypes.number,
  };

  render() {
    const {
      data: { logo, name, date, amount,category },
      index
    } = this.props;
    // const background = colors[Math.floor(Math.random() * colors.length)];
    const background = colors[category==='transport'? 0 : category==='food'? 1 : category==='bills'? 2 : category==='leisure'? 3 : category==='clothing'? 4 : 4]
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => {
            // this.props.navigation.navigate("TransactionView")
            // this.props.myRef.openModal();
            this.props.openProp();
            dispatch("SET_ACTIVE_TRANSACTION", { transaction: this.props.data})
          }
          }
          style={[styles.transactionContainer, {backgroundColor: this.props.colors.white}]}
        >
          <View style={styles.iconContainer}>
            <Image style={styles.icon} source={{ uri: logo }} />
          </View>

          <View style={[styles.categoryTag, { backgroundColor: background }]} />
          <View style={{ flex: 1, top: 35 / 1.5, alignSelf: 'center' }}>
            <Text
              style={{
                fontWeight: "700",
                justifyContent: "center",
                fontSize: 12,
                color: this.props.colors.gray
              }}
            >
              {name}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "600",
                justifyContent: "center",
                alignItems: "center",
                paddingRight: 5,
                fontSize: 11,
                color: this.props.colors.gray
              }}
            >
              {amount.toString().startsWith("-")
                ? amount.toFixed(2).toString().replace("-", "$")
                : "$" + amount.toFixed(2)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
export default connect(mapStateToProps)(OverviewTransaction);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6f5f7"
  },
  iconContainer: {
    zIndex: 1,
    justifyContent: "flex-start",
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
    shadowColor: "#6b6b6b",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.4,
    shadowRadius: 1.5,
    elevation: 1
  },
  icon: {
    width: 35,
    height: 35,
    top: viewportWidth / 21.6,
    position: "absolute",
    borderRadius: 17
  },
  categoryTag: {
    width: viewportWidth / 3.6,
    height: viewportWidth / 3.6 / 3,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignContent: "flex-start",
    alignSelf: "flex-start",
    justifyContent: "flex-start"
  },
  transactionContainer: {
    borderRadius: 12,
    marginHorizontal: 10,
    // backgroundColor: "white",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    alignSelf: "center",
    flexDirection: "column",
    width: viewportWidth / 3.6,
    height: viewportWidth / 3.6,
    // overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1
  }
});
