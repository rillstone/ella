import createStore from "react-recontext";

// initial state
const initialState = {
    personData: {},
    user: {},
    transactions: [],
    goals: [],
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
};

// if you want debugging (actually pretty handy)
const enableLogger = false;

export const { Provider, connect, dispatch } = createStore(
    initialState,
    actionsCreators,
    enableLogger
);