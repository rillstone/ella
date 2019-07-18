import React, { Component } from "react";
import {
    Text,
    Image,
    StatusBar,
    StyleSheet,
    Dimensions,
    View,
    Animated,
    TouchableOpacity,
} from "react-native";
import { connect } from "../../store";
import Icon from "react-native-vector-icons/Ionicons";
import { NavigationActions } from "react-navigation";
import * as theme from "../../theme";

const DATE_OPTIONS = { weekday: "short", month: "short", day: "numeric"};
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
    "window"
);

const mapStateToProps = state => ({
    transaction: state.activeTransaction,
});
class TransactionScreen extends Component {


      componentWillMount() {
        this.animatedValue = new Animated.Value(0);
      }
      componentDidMount() {
        Animated.timing(this.animatedValue, {
            toValue: 150,
            duration: 1000
          }).start();
        }

    render() {
        const { transaction, navigation } = this.props;
        const interpolateColor = this.animatedValue.interpolate({
            inputRange: [0, 300],
            outputRange: ['#00000000', '#00000050']
          })
        return (
            <Animated.View style={[styles.container, {backgroundColor:interpolateColor}]}>
                <StatusBar hidden={true} />
                <TouchableOpacity
                    onPress={() => {
                        this.setState({ scrollOp: 0 });
                        this.props.navigation.dispatch(NavigationActions.back());
                    }}
                    style={{
                        position: "absolute",
                        // right: 25,
                        bottom: 80,
                        zIndex: 999
                    }}
                >
                    <Icon name="ios-close-circle" size={60} color={theme.colors.white} />
                </TouchableOpacity>
                <View
                    style={styles.receipt}
                >
                    <Image
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 50,
                            marginVertical: 20

                        }}
                        source={{ uri: transaction.logo }}
                    />
                    <View style={styles.column}>
                    <Text style={styles.title}>TO</Text>
                    <Text style={styles.text}>{transaction.name}</Text>
                    </View>
                    <View style={styles.column}>
                    <Text style={styles.title}>AMOUNT</Text>
                    <Text style={styles.text}>${transaction.amount}</Text>
                    </View>
                    <View style={styles.column}>
                    <Text style={styles.title}>INFO</Text>
                    <Text style={styles.text}>{transaction.type}</Text>
                    </View>
                    <View style={styles.column}>
                    <Text style={styles.title}>DATE</Text>
                    <Text style={styles.text}>
                        {new Date(transaction.date)
                            .toLocaleDateString("en-NZ", DATE_OPTIONS)}
                    </Text>
                    </View>
                </View>
            </Animated.View>
        )
    }
}
export default connect(mapStateToProps)(TransactionScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        // backgroundColor: '#00000040',
        
    },
    receipt: {
        // flex: 1,
        // justifyContent: "space-around",
        alignItems: "center",
        width: viewportWidth * 0.7,
        height: viewportHeight * 0.45,
        backgroundColor: theme.colors.white,
        borderRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: "black",
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 1,
        bottom: 20
    },
    text:{
        fontSize: 15,
        fontWeight: '600'
    },
    title:{
        fontSize: 12,
        color: theme.colors.inactive,

    },
    column: {
        flexDirection: 'column',
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        marginLeft: 30,
        marginVertical: 8
    },
});