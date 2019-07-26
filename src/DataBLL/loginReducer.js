import ConstantType from "./ConstantType";
import {setIsAuth,getUserInfoAuth} from "./authReducer";
import API from "../DAL/api";


const {SET_STATUS_LOGIN,SET_MESSAGE_LOGIN,SET_INITIAL_ID,GET_CAPTCHA} = ConstantType;

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
    currentId: null,
    captchaUrl: null
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
        case SET_INITIAL_ID: {
            return{
                ...state,
                currentId: action.id
            }
        }
        case GET_CAPTCHA: {
            return {
                ...state,
                captchaUrl: action.captcha
            }
        }
        default: {
            return state
        }
    }
};

export const setStatus = (status) => ({type: SET_STATUS_LOGIN, status});
export const setMessage = (message) => ({type: SET_MESSAGE_LOGIN, message});
export const setUserId = (id) => ({type: SET_INITIAL_ID, id});
export const getCaptcha = (captcha) => ({type: GET_CAPTCHA, captcha});

export const login = (email, password, rememberMe, captchaUrl) => (dispatch) => {
    dispatch(setStatus(statuses.INPROGRESS));
    API.logIn(email, password, rememberMe,captchaUrl)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setStatus(statuses.SUCCESS));
                dispatch(setUserId(res.data.data.userId));
                dispatch(setIsAuth(true));
                dispatch(getUserInfoAuth());
                dispatch(getCaptcha(null))
            } else {
                dispatch(setMessage(res.data.messages[0]));
                dispatch(setStatus(statuses.ERROR));
            }
            if(res.data.resultCode === 10){
                dispatch(captcha());
            }
        })
        .catch(e => console.log(e.message))
};

export const captcha = () => async (dispatch) => {
    let res = await API.captcha();
    dispatch(getCaptcha(res.data.url));
};

export default loginReducer;