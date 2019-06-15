import ConstantType from "./ConstantType";
import API from "../DAL/api";

const {SET_IS_AUTH,SET_USER_INFO_AUTH,SET_USER_AVATAR_URL,SET_MESSAGE_ERROR_AUTH} = ConstantType;

let initialState = {
    isAuth: false,
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
                isAuth: action.value
            }
        }
        case SET_USER_INFO_AUTH: {
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    userId: action.userId,
                    userName: action.userName
                }
            }
        }
        case SET_USER_AVATAR_URL: {
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    userAvatarUrl: action.avatarUrl
                }
            }
        }
        case SET_MESSAGE_ERROR_AUTH: {
            return {
                ...state,
                message: action.message
            }
        }
        default: {
            return state
        }
    }
};

export const setIsAuth = (value) => ({type: SET_IS_AUTH, value});
export const setUserInfoAuth = (userId,userName) => ({type:SET_USER_INFO_AUTH,userId,userName});
export const setMessageErrorAuth = (message) => ({type:SET_MESSAGE_ERROR_AUTH,message});
export const setUserAvatarUrl = (avatarUrl) => ({type:SET_USER_AVATAR_URL,avatarUrl});

export const getUserInfoAuth = () => (dispatch) => {
    API.getUserInfoAuth()
        .then((res) => {
            debugger
            if(res.data.resultCode === 0){
                dispatch(setUserInfoAuth(res.data.data.id,res.data.data.login));
                dispatch(setIsAuth(true));
                dispatch(setMessageErrorAuth(''));
            } else {
                dispatch(setMessageErrorAuth(res.data.messages[0]));
            }
        })
        .catch(e => console.log(e.message))
};

export const logOut = () => (dispatch) => {
    debugger
    API.logOut()
        .then((res) => {
            if(res.data.resultCode === 0){
                dispatch(setIsAuth(false));
                dispatch(setUserInfoAuth(null,null));
            } else {
                //dispatch();
            }
        })
        .catch(e => console.log(e.message))
};

export default authReducer;