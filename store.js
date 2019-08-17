import createStore from "react-recontext";
import {StyleSheet} from 'react-native';
import * as theme from "./theme";
// initial state
const initialState = {
    personData: {},
    user: {},
    transactions: [],
    goals: [],
    activeTransaction: {},
    colors: (theme.colors),
    hide: false,
};

// create app actions
const actionsCreators = {
    addGoals: (state, { goals }) => ({
        goals: goals,
    }),
    addGoal: (state, { goal }) => ({
        goals: [...state.goals, goal],
    }),
    setPersonData: (state, {personData}) => ({
        personData: personData
    }),
    setUser: (state, {user}) => ({
        user: user
    }),
    setActiveTransaction: (state, {transaction}) => ({
        activeTransaction: transaction
    }),
    setColors: (state, colorType) => ({
        colors: colorType==="dark"? (theme.colorsDark) : (theme.colors)
    }),
    setHide: (state, hidden) => ({
        hide: hidden
    }),
};

// if you want debugging (actually pretty handy)
const enableLogger = false;

export const { Provider, connect, dispatch } = createStore(
    initialState,
    actionsCreators,
    enableLogger
);