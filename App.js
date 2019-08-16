import React from "react";
import { YellowBox,AsyncStorage } from "react-native";
import { mapping, light as lightTheme } from "@eva-design/eva";
import { ApplicationProvider } from "react-native-ui-kitten";
import payments from "./assets/payments.json"
import AppNavigator from "./navigator/AppNavigator";
import ApiKeys from "./constants/ApiKeys";
import * as firebase from "firebase";
import { dispatch, connect, Provider } from "./store";
import { MenuProvider } from 'react-native-popup-menu';
import _ from 'lodash';
import moment from "moment";
const mapStateToProps = state => ({
  user: state.user,
  // put the stuff here you want to access from the global store
  // then instead of calling it from "this.state.<var>" call it from "this.props.<var>"

});

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

class App extends React.Component {

  mounted = false;
  constructor() {
    super();
    this.state = {
      isLoadingComplete: false,
      isAuthenticationReady: false,
      isAuthenticated: false,
      user: null
    };
    firebase.initializeApp(ApiKeys.FirebaseConfig);
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
    
  }
  componentDidMount() {
    this.mounted = true;
  }
  onAuthStateChanged = (user) => {
    this.setState({
      isAuthenticationReady: true,
      isAuthenticated: !!user,
      isLoadingComplete: true,
      user: firebase.auth().currentUser
    });
    // sent to the global store here
    dispatch("SET_USER", { user: firebase.auth().currentUser });
    // this.generateNewTrans()
  };
  makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log('trans_'+ result)
    return 'trans_'+ result;
 }
  generateNewTrans = () => {
    var x = payments;
    var y = [x.Transport, x.Leisure, x.Food, x.Bills];
    // console.log(y);
    // console.log("---BREAK---");

    y.forEach(e => {
      e._id='new_'+Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      // console.log(e);
      var now = moment();
      // var then = moment(e[0].date);
      var then = moment(moment().subtract(7,'days').format());
      // console.log(moment(moment().subtract(7,'days').format()))
      var diff = now.diff(then, 'days');
      // console.log(diff)
      for (i = 1; i < diff; i++) {
        var newTrans = _.cloneDeep(e[Math.floor(Math.random() * e.length)]);
        var newAmount = Math.round((newTrans.amount * ((Math.floor(Math.random() * 10) + 5) / 10)) * 100) / 100;
        newTrans._id = 'new_'+Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        newTrans.amount = newAmount;
        newTrans.date = then.add(1, 'days').clone();
        // console.log(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))
        
        e.unshift(newTrans);

      }
    });
    // console.log(y);
    // updated is what you'd return (overwrites x)
    var updated = { Transport: y[0], Leisure: y[1], Food: y[2], Bills: y[3] };
    console.log("---BREAK---");
    console.log(updated)
    console.log("---BREAK---");
  }


  render() {
    if (this.state.isLoadingComplete) {
      return (
        <MenuProvider>
          <ApplicationProvider mapping={mapping} theme={lightTheme}>
            <Provider>
              <AppNavigator />
            </Provider>
          </ApplicationProvider>
        </MenuProvider>
      );
    } else return null;

  }
  _loadResourcesAsync = async () => {
    return Promise.all([

    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
export default connect(mapStateToProps)(App);