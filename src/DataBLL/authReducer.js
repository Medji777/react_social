import ConstantType from "./ConstantType";
import API from "../DAL/api";
import {setUserId} from "./loginReducer";
import {getUserProfileInfo} from "./profileReducer";

const {SET_IS_AUTH,SET_IS_ACTIVE,SET_USER_INFO_AUTH,SET_USER_AVATAR_URL,SET_MESSAGE_ERROR_AUTH,CHECK_COMPLETED} = ConstantType;

let initialState = {
    isInitialized: false,
    isAuth: false,
    isActive: false,
    userInfo: {
        userId: null,
        userName: null,
        userAvatarUrl: ''
    },
    message: ''
};

const authReducer = (state = initialState,action) => {
    switch (action.type) {
        case SET_IS_AUTH:
        case CHECK_COMPLETED:
        case SET_MESSAGE_ERROR_AUTH:
        case SET_IS_ACTIVE:
            return {...state, ...action.payload};

        case SET_USER_INFO_AUTH:
        case SET_USER_AVATAR_URL: {
            return {
                ...state,
                userInfo: {
                    ...state.userInfo, ...action.payload
                }
            }
        }
        default: {
            return state
        }
    }
};

export const setIsAuth = (isAuth) => ({type: SET_IS_AUTH, payload: {isAuth}});
export const setIsActive = (isActive) => ({type: SET_IS_ACTIVE,payload: {isActive}});
export const setUserInfoAuth = (userId) => ({type:SET_USER_INFO_AUTH,payload:{userId}});
export const setMessageErrorAuth = (message) => ({type:SET_MESSAGE_ERROR_AUTH,payload: {message}});
export const setUserAvatarAndName = (userAvatarUrl,userName) => ({type:SET_USER_AVATAR_URL,payload:{userAvatarUrl,userName}});
export const checkInitialized = (isInitialized = true) => ({type:CHECK_COMPLETED, payload: {isInitialized}});

export const getUserInfoAuth = () => async (dispatch) => {
    try {
        let res = await API.getUserInfoAuth();
        if (res.data.resultCode === 0) {
            dispatch(setUserInfoAuth(res.data.data.id));
            dispatch(setIsAuth(true));
            dispatch(getUserProfileInfo(res.data.data.id, true));
            dispatch(setMessageErrorAuth(''));
        } else {
            dispatch(setMessageErrorAuth(res.data.messages[0]));
        }
        dispatch(checkInitialized());
    } catch (e) {
        console.log(e.message);
    }
};

export const logOut = () => async (dispatch) => {
    try {
        let res = await API.logOut();
        if (res.data.resultCode === 0) {
            dispatch(setUserInfoAuth(null));
            dispatch(setUserId(null));
            dispatch(setUserAvatarAndName('', null));
            dispatch(setIsAuth(false));
        }
    } catch (e) {
        console.log(e.message)
    }
};

export default authReducer;