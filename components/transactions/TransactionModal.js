import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image
} from "react-native";
import PropTypes from "prop-types";
import * as theme from "../../theme";
import { Button, Avatar, Divider } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import Modalize from "react-native-modalize";
import moment from "moment";
import { dispatch, connect } from "../../store";
import Dash from "react-native-dash";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
const mapStateToProps = state => ({
  transaction: state.activeTransaction,
  colors: state.colors,
});
class TransactionModal extends Component {
  modal = React.createRef();
  static propTypes = {
    // data: PropTypes.object.isRequired
  };

  constructor(props) {
    super();
    this.state = {
      child: "hide",
      uid: null,
      items: [],
      refreshing: false,
      edit: false,
      photoURL: ""
    };
    this.props = props;
    this.childHandler = this.childHandler.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }
  renderContent = () => {
    //   console.log(this.props.transaction);
    // //   if (Object.keys(this.props.transaction).length !== 0) {
    // return (
    // );
    // }else return null
  };

  onClosed = () => {
    // const setParamsAction = NavigationActions.setParams({
    //   params: { showTabBar: true }, key: this.props.navigation.state.key,
    // });
    // this.props.navigation.dispatch(setParamsAction);
    const { onClosed } = this.props;
    if (onClosed) {
      onClosed();
    }
  };

  openModal = () => {
    if (this.modal.current) {
      this.modal.current.open();
      // const setParamsAction = NavigationActions.setParams({
      //   params: { showTabBar: false }, key: this.props.navigation.state.key,
      // });
      // this.props.navigation.dispatch(setParamsAction);
    }
  };

  closeModal = () => {
    if (this.modal.current) {
      // const setParamsAction = NavigationActions.setParams({
      //   params: { showTabBar: true }, key: this.props.navigation.state.key,
      // });
      // this.props.navigation.dispatch(setParamsAction);
      this.modal.current.close();
    }
  };

  childHandler() {
    this.setState({ edit: false });
    this.closeModal();
  }
  goBack() {
    this.setState({ edit: false });
  }

  render() {
    const info = [
      {
        icon: "ios-calendar",
        title: "Date",
        reverse: false,
        value: moment(this.props.transaction.date).format("ddd, D MMM")
      },
      {
        icon: "ios-time",
        title: "Time",
        reverse: true,
        value: moment(this.props.transaction.date).format("h:mm a")
      }
      //   {
      //     icon: "ios-pricetags",
      //     title: "Amount",
      //     value:
      //       Object.keys(this.props.transaction).length !== 0
      //         ? this.props.transaction.amount.toString().startsWith("-")
      //           ? this.props.transaction.amount.toString().replace("-", "$")
      //           : "$" + this.props.transaction.amount
      //         : ""
      //   }
    ];
    const { transaction, navigation } = this.props;
    // const {
    //   data: { dragHandler, firstName, lastName, email, icon, image }
    // } = this.props;
    return (
      <Modalize
        ref={this.modal}
        onClosed={this.onClosed}
        handlePosition={"inside"}
        adjustToContentHeight
        modalStyle={{
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          backgroundColor: this.props.colors.backModal,
          zIndex: 99999
        }}
      >
        <View style={styles.receipt}>
          <View
            style={{
              width: viewportWidth,
              //   height: 64,
              alignItems: "flex-start",
              justifyContent: "flex-start",
              flexDirection: "row"
              //   backgroundColor: 'blue'
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: 35,
                paddingLeft: 20,
                paddingTop: 40,
                color: this.props.colors.gray,
                textAlign: "left"
              }}
            >
              Payment Details
            </Text>
          </View>

          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: "row",
              //   alignContent: "flex-start",

              //   alignItems: "center",
              //   margin: 20,
              paddingHorizontal: 20,
              marginTop: 10
            }}
            onPress={() => {}}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start"
              }}
            >
              <View
                style={{
                  // flex: 1,
                  alignContent: "flex-start",
                  justifyContent: "flex-start",
                  alignItems: "flex-start"
                }}
              >
                <Image
                  style={{
                    width: 75,
                    height: 75,
                    borderRadius: 37.5
                    // marginVertical: 20
                  }}
                  source={{ uri: this.props.transaction.logo }}
                />
              </View>
              <View
                style={{
                  flexDirection: "column",
                  marginLeft: 20
                }}
              >
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "600",
                    color: this.props.colors.gray
                  }}
                >
                  {this.props.transaction.name}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "500",
                    color: this.props.colors.gray
                  }}
                >
                  {/* {this.state.email} */}
                  {this.props.transaction.category}
                </Text>
              </View>
            </View>

            <View
              style={{
                // flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                flexGrow: 1,
                right: 10

                // marginVertical: 15
              }}
            >
              <View
                style={{
                  alignSelf: "flex-end",
                  justifyContent: "center",
                  borderWidth: 1,
                  borderColor: this.props.colors.lightGray,
                  borderRadius: 5
                }}
              >
                <Text
                  style={{
                    padding: 2,
                    textTransform: "uppercase",
                    fontSize: 18,
                    textAlign: "right",
                    color: this.props.colors.inactive
                  }}
                >
                  {this.props.transaction.type}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              width: viewportWidth,
              paddingHorizontal: 20,
              flex: 1,
              marginTop: 30,
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center"
              //   backgroundColor: "blue"
            }}
          >
            {info.map(item => {
              return (
                <View
                  key={item.title}
                  style={{
                    flex: 1,
                    flexDirection: item.reverse ? "row-reverse" : "row",
                    alignContent: "center",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    alignSelf: "center"
                  }}
                >
                  <View
                    style={{
                      marginHorizontal: 10
                    }}
                  >
                    <Icon
                      name={item.icon}
                      color={theme.colors.gray}
                      size={34}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "500",
                        color: this.props.colors.gray
                      }}
                    >
                      {item.value}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
          <Dash
            dashThickness={1}
            dashGap={4}
            dashLength={5}
            dashColor={this.props.colors.inactive}
            style={{

              width: viewportWidth - 60,
              height: 50,
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center",
              alignSelf: "center",
              alignItems: 'center'
            }}
          />
          <View
            style={{
              width: viewportWidth,
              //   height: 64,
              alignItems: "flex-start",
              justifyContent: "flex-start",
              flexDirection: "row"
              //   backgroundColor: 'blue'
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: 35,
                paddingLeft: 25,

                color: this.props.colors.gray,
                textAlign: "left"
              }}
            >
              Total
            </Text>
            <Text
              style={{
                fontWeight: "400",
                fontSize: 35,
                paddingRight: 25,
                alignSelf: "flex-end",
                flexGrow: 1,
                color: this.props.colors.gray,
                textAlign: "right"
              }}
            >
                                  {Object.keys(this.props.transaction).length !== 0
              ? this.props.transaction.amount.toString().startsWith("-")
                ? this.props.transaction.amount.toString().replace("-", "$")
                : "$" + this.props.transaction.amount
              : ""}
            </Text>
          </View>
        </View>
        
      </Modalize>
    );
  }
}
export default connect(mapStateToProps)(TransactionModal);
const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",

    justifyContent: "center",
    backgroundColor: "#f6f5f7",

    borderTopLeftRadius: 13,
    borderTopRightRadius: 13
  },

  receipt: {
    // alignItems: "center",
    // width: viewportWidth * 0.6,
    // height: viewportWidth,
    // backgroundColor: "#ff000030",
    // top: 0,
    // zIndex: 9999,
    // position: "absolute"
  },
  receipt_top: {
    // backgroundColor: "#ff000030",
    height: 80,
    width: viewportWidth * 0.6,
    alignContent: "center",
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
    justifyContent: "center"
  },
  receipt_bot: {
    // backgroundColor: "#00ff0030",
    height: viewportWidth - 80,
    width: viewportWidth * 0.6
  },
  text: {
    fontSize: 15,
    fontWeight: "600"
  },
  title: {
    fontSize: 12,
    color: theme.colors.inactive
  },
  column: {
    flexDirection: "column",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginVertical: 15
  },
  columnRight: {
    flexDirection: "column",
    alignContent: "flex-end",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    alignSelf: "flex-end",
    marginRight: 20,
    marginVertical: 15
  }
});
