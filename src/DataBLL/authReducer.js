import ConstantType from "./ConstantType";
import API from "../DAL/api";
import {setUserId} from "./loginReducer";

const {SET_IS_AUTH,SET_IS_ACTIVE,SET_USER_INFO_AUTH,SET_USER_AVATAR_URL,SET_MESSAGE_ERROR_AUTH,CHECK_COMPLETED} = ConstantType;

let initialState = {
    isChecked: false,
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
        case SET_IS_AUTH: {
            return {
                ...state,
                isAuth: action.value,
            }
        }
        case CHECK_COMPLETED:{
            return {...state, isChecked: true}
        }
        case SET_USER_INFO_AUTH: {
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    userId: action.userId,
                    // userName: action.userName
                }
            }
        }
        case SET_USER_AVATAR_URL: {
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    userAvatarUrl: action.avatarUrl,
                    userName: action.userName
                }
            }
        }
        case SET_MESSAGE_ERROR_AUTH: {
            return {
                ...state,
                message: action.message
            }
        }
        case SET_IS_ACTIVE: {
            return {
                ...state,
                isActive: action.flag
            }
        }
        default: {
            return state
        }
    }
};

export const setIsAuth = (value) => ({type: SET_IS_AUTH, value});
export const setIsActive = (flag) => ({type: SET_IS_ACTIVE,flag});
export const setUserInfoAuth = (userId) => ({type:SET_USER_INFO_AUTH,userId});
export const setMessageErrorAuth = (message) => ({type:SET_MESSAGE_ERROR_AUTH,message});
export const setUserAvatarAndName = (avatarUrl,userName) => ({type:SET_USER_AVATAR_URL,avatarUrl,userName});
export const checkCompleted = () => ({type:CHECK_COMPLETED});

export const getUserInfoAuth = () => (dispatch) => {
    API.getUserInfoAuth()
        .then((res) => {
            if(res.data.resultCode === 0){
                dispatch(setUserInfoAuth(res.data.data.id));
                dispatch(setIsAuth(true));
                dispatch(setMessageErrorAuth(''));
            } else {
                dispatch(setMessageErrorAuth(res.data.messages[0]));
            }
            dispatch(checkCompleted());
        })
        .catch(e => console.log(e.message))

};

export const logOut = () => (dispatch) => {
    API.logOut()
        .then((res) => {
            if(res.data.resultCode === 0){
                dispatch(setUserInfoAuth(null));
                dispatch(setUserId(null));
                dispatch(setIsAuth(false));
            } else {
                //dispatch();
            }

        })
        .catch(e => console.log(e.message))
};

export default authReducer;