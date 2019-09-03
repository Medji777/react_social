import ConstantType from "./ConstantType";
import {getUserInfoAuth, setUserAvatarAndName} from './authReducer';
import API from "../DAL/api";

const {ADD_POST,SET_USER_INFO,SET_AUTH_USER_INFO,IS_EDIT,IS_LOAD_EDIT,SET_CHANGE_AUTH_PROFILE,SET_IS_OPEN_POPUP,SET_USER_STATUS} = ConstantType;
const initialState = {
    post: [
        {id: '1', src: 'https://www.abc.net.au/news/image/8314104-1x1-940x940.jpg', text: 'post 1'},
        {id: '2', src: 'https://www.abc.net.au/news/image/8314104-1x1-940x940.jpg', text: 'post 2'},
        {id: '3', src: 'https://www.abc.net.au/news/image/8314104-1x1-940x940.jpg', text: 'post 3'},
        {id: '4', src: 'https://www.abc.net.au/news/image/8314104-1x1-940x940.jpg', text: 'post 4'}
    ],
    profileInfo: null,
    userAuthProfileInfo: null,
    isEdit: false,
    isLoadEdit: false,
    isOpenPopUp: false,
    userStatus: ''
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let count = state.post.length;
            let newPost = {
                id: ++count, src: '#', text: action.post
            };
            return {...state, post: [...state.post, newPost]};
        }
        case SET_USER_INFO:
        case SET_AUTH_USER_INFO:
        case IS_EDIT:
        case IS_LOAD_EDIT:
        case SET_IS_OPEN_POPUP:
        case SET_USER_STATUS:
            return {...state, ...action.payload};
        case SET_CHANGE_AUTH_PROFILE: {
            return {
                ...state,
                userAuthProfileInfo: {...state.userAuthProfileInfo,...action.profile}
            }
        }
        default:
            return state;
    }
};

export const addPost = (post) => ({type: ADD_POST,post});
export const setUserInfo = (profileInfo) => ({type:SET_USER_INFO,payload: {profileInfo}});
export const setAuthUserInfo = (userAuthProfileInfo) => ({type:SET_AUTH_USER_INFO,payload: {userAuthProfileInfo}});
export const setIsEdit = (isEdit) => ({type: IS_EDIT, payload: {isEdit}});
export const setIsLoadEdit = (isLoadEdit) => ({type: IS_LOAD_EDIT,payload: {isLoadEdit}});
export const setChangeAuthProfile = (profile) => ({type: SET_CHANGE_AUTH_PROFILE,profile});
export const setIsOpenPopUp = (isOpenPopUp) => ({type: SET_IS_OPEN_POPUP,payload: {isOpenPopUp}});
export const setUserStatus = (userStatus) => ({type: SET_USER_STATUS,payload: {userStatus}});

export const getUserProfileInfo = (userId, isAuthUser = false) => async (dispatch) => {
    if (userId) {
        let res = await API.getProfileInfo(userId);
        try{
           if (isAuthUser) {
               dispatch(setUserAvatarAndName(res.data.photos.small, res.data.fullName));
               dispatch(setAuthUserInfo({...res.data}));
           } else {
               dispatch(setUserInfo({...res.data}));
           }
        }
        catch (e) {
            console.log(e.message)
        }
    }
};

export const setAuthUserProfile = (userAuthProfileInfo) => async (dispatch) => {
    dispatch(setIsLoadEdit(true));
    let res = await API.setAuthProfileInfo(userAuthProfileInfo);
    try{
        if (res.data.resultCode === 0) {
            dispatch(setAuthUserInfo({...userAuthProfileInfo}));
            dispatch(setIsLoadEdit(false));
        }
    }
    catch (e) {
        console.log(e.message)
    }
};

export const setUpdatePhoto = (img,userId) => async (dispatch) => {
    let res = await API.setUpdatePhoto(img);
    try {
        if (res.data.resultCode === 0) {
            dispatch(getUserProfileInfo(userId));
            dispatch(getUserInfoAuth());
        }
    }
    catch (e) {
        console.log(e.message)
    }
};

export const getStatusUser = (userId) => async (dispatch) => {
    let res = await API.getStatusUser(userId);
    try {
        if (res.status === 200) {
            dispatch(setUserStatus(res.data));
        }
    }
    catch (e) {
        console.log(e.message)
    }
};

export const setUpdateStatus = (status) => async (dispatch) => {
    let res = await API.setUpdateStatus(status);
    try {
        if (res.data.resultCode === 0) {
            dispatch(setUserStatus(status));
            // dispatch(getUserInfoAuth());
        }
    }
    catch (e) {
        console.log(e.message)
    }
};

export default profileReducer;