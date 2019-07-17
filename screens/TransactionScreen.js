import React, { Component } from "react";
import {
    Text,
    Image,
    StatusBar,
    StyleSheet,
    Dimensions,
    View,
    TouchableOpacity,
} from "react-native";
import { connect } from "../store";
import Icon from "react-native-vector-icons/Ionicons";
import { NavigationActions } from "react-navigation";
import * as theme from "../theme";

const DATE_OPTIONS = { weekday: "short", month: "short", day: "numeric", year: "short" };
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
    "window"
);

const mapStateToProps = state => ({
    transaction: state.activeTransaction,
});
class TransactionScreen extends Component {
    render() {
        const { transaction, navigation } = this.props;
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
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
                    <Icon name="ios-close-circle" size={36} color={theme.colors.gray} />
                </TouchableOpacity>
                <View
                    style={styles.receipt}
                >
                    <Image
                        style={{
                            width: 150,
                            height: 150,
                            borderRadius: 25,
                        }}
                        source={{ uri: transaction.logo }}
                    />
                    <Text style={styles.text}>{transaction.name}</Text>
                    <Text style={styles.text}>${transaction.amount}</Text>
                    <Text style={styles.text}>{transaction.type}</Text>
                    <Text style={styles.text}>
                        {new Date(transaction.date)
                            .toLocaleDateString("en-NZ", DATE_OPTIONS)}
                    </Text>
                </View>
            </View>
        )
    }
}
export default connect(mapStateToProps)(TransactionScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: theme.colors.lightGray,
    },
    receipt: {
        // flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        width: viewportWidth * 0.8,
        height: viewportHeight * 0.8,
        backgroundColor: theme.colors.white,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#000",
    },
    text:{
        fontSize: 18,
    }
});