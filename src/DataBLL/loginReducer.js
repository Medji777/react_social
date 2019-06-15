import ConstantType from "./ConstantType";
import {setIsAuth,getUserInfoAuth} from "./authReducer";
import API from "../DAL/api";


const {SET_STATUS_LOGIN,SET_MESSAGE_LOGIN,SET_ID} = ConstantType;

export const statuses = {
    INIT: 'INIT',
    ERROR: 'ERROR',
    INPROGRESS: 'INPROGRESS',
    SUCCESS: 'SUCCESS',
    CAPTCAREQUIRED: 'CAPTCAREQUIRED'
};

let initialState = {
    status: statuses.INIT,
    message: '',
    currentId: null
};

const loginReducer = (state = initialState,action) => {
    switch (action.type) {
        case SET_STATUS_LOGIN: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_MESSAGE_LOGIN: {
            return {
                ...state,
                message: action.message
            }
        }
        case SET_ID: {
            return{
                ...state,
                currentId: action.id
            }
        }
        default: {
            return state
        }
    }
};

export const setStatus = (status) => ({type: SET_STATUS_LOGIN, status});
export const setMessage = (message) => ({type: SET_MESSAGE_LOGIN, message});
export const setUserId = (id) => ({type: SET_ID, id});

export const login = (email, password, rememberMe, c) => (dispatch) => {
    dispatch(setStatus(statuses.INPROGRESS));
    API.logIn(email, password, rememberMe)
        .then(res => {
            debugger;
            if (res.data.resultCode === 0) {
                dispatch(setStatus(statuses.SUCCESS));
                dispatch(setUserId(res.data.data.userId));
                dispatch(setIsAuth(true));
                dispatch(getUserInfoAuth());
            } else {
                dispatch(setMessage(res.data.messages[0]));
                dispatch(setStatus(statuses.ERROR));
            }
        })
        .catch(e => console.log(e.message))
};

export default loginReducer;