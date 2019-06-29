import {applyMiddleware, combineReducers, createStore} from 'redux';
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import friendsSideReducer from "./friendsSideReducer";
import usersReducer from "./usersReducer";
import loginReducer from "./loginReducer";
import authReducer from "./authReducer";
import thunk from "redux-thunk";
import {reducer as formReducer} from 'redux-form';

const reducers = combineReducers({
    dataProfile: profileReducer,
    dataDialogs: dialogsReducer,
    dataFriends: friendsSideReducer,
    usersPage: usersReducer,
    login: loginReducer,
    auth: authReducer,
    form: formReducer
});

const store = createStore(reducers,applyMiddleware(thunk));

window.store = store;

export default store