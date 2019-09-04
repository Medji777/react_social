import {applyMiddleware, combineReducers, createStore,compose} from 'redux';
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import friendsSideReducer from "./friendsSideReducer";
import usersReducer from "./usersReducer";
import loginReducer from "./loginReducer";
import authReducer from "./authReducer";
import thunk from "redux-thunk";
import {reducer as formReducer} from 'redux-form';
import appReducer from "./appReducer";

const reducers = combineReducers({
    dataProfile: profileReducer,
    dataDialogs: dialogsReducer,
    dataFriends: friendsSideReducer,
    usersPage: usersReducer,
    login: loginReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,composeEnhancers(applyMiddleware(thunk)));

// window.store = store;

export default store