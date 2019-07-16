import React, { Component } from "react";
import {
    Text,
} from "react-native";
import { connect } from "../store";
import SafeAreaView from "react-native-safe-area-view";
import * as theme from "../theme";

const mapStateToProps = state => ({
    transaction: state.activeTransaction,
});
class TransactionScreen extends Component {
    render() {
        const {transaction} = this.props;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.back }}>
                <Text>{transaction.amount}</Text>
            </SafeAreaView>
        )
    }
}
export default connect(mapStateToProps)(TransactionScreen)