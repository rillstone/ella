import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import * as firebase from "firebase";

// Initial State
const initialState = {
  personData: {}
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "setPersonData":
      return { ...state, personData: action.value };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export { store };

// Action Creators
const setPersonData = personData => {
  return {
    type: "setPersonData",
    value: personData
  };
};
const watchPersonData = () => {
  return function(dispatch) {
    firebase
      .database()
      .ref("person")
      .on(
        "value",
        function(snapshot) {
          var personData = snapshot.val();
          var actionSetPersonData = setPersonData(personData);
          dispatch(actionSetPersonData);
        },
        function(error) {
          console.log(error);
        }
      );
  };
};
export { setPersonData, watchPersonData };

