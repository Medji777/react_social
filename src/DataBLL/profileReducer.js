import ConstantType from "./ConstantType";
import {setUserAvatarAndName} from './authReducer';
import API from "../DAL/api";

const {ADD_POST,UPDATE_NEW_POST_TEXT,SET_USER_INFO,SET_CURRENT_USER_ID,SET_AUTH_USER_INFO,IS_EDIT,IS_LOAD_EDIT,SET_CHANGE_AUTH_PROFILE} = ConstantType;
const initialState = {
    post: [
        {id: '1', src: 'https://www.abc.net.au/news/image/8314104-1x1-940x940.jpg', text: 'post 1'},
        {id: '2', src: 'https://www.abc.net.au/news/image/8314104-1x1-940x940.jpg', text: 'post 2'},
        {id: '3', src: 'https://www.abc.net.au/news/image/8314104-1x1-940x940.jpg', text: 'post 3'},
        {id: '4', src: 'https://www.abc.net.au/news/image/8314104-1x1-940x940.jpg', text: 'post 4'}
    ],
    newTextPost: '',
    profileInfo: null,
    userAuthProfileInfo: null,
    currentUserId: null,
    isEdit: false,
    isLoadEdit: false
};

const profileReducer = (state = initialState, action) => {
    let stateCopy;
    switch (action.type) {
        case ADD_POST:
            stateCopy = {
                ...state,
                post: [...state.post]
            };
            let count = state.post.length;
            if (state.newTextPost.trim()) {
                let newPost = {
                    id: ++count, src: '#', text: state.newTextPost
                };
                stateCopy.post.push(newPost);
                stateCopy.newTextPost = '';
            }
            return stateCopy;

        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newTextPost: action.newText
            };
        case SET_USER_INFO: {
            return {
                ...state,
                profileInfo: action.profileInfo
            }
        }
        case SET_AUTH_USER_INFO: {
            return {
                ...state,
                userAuthProfileInfo: action.userAuthProfileInfo
            }
        }
        case SET_CURRENT_USER_ID: {
            return {
                ...state,
                currentUserId: action.id
            }
        }
        case IS_EDIT: {
            return {
                ...state,
                isEdit: action.isEdit
            }
        }
        case IS_LOAD_EDIT: {
            return {
                ...state,
                isLoadEdit: action.isLoadEdit
            }
        }
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

export const addPost = () => ({type: ADD_POST});
export const updateNewPostText = (text) => ({type: UPDATE_NEW_POST_TEXT, newText: text});
export const setUserInfo = (profileInfo) => ({type:SET_USER_INFO,profileInfo});
export const setAuthUserInfo = (userAuthProfileInfo) => ({type:SET_AUTH_USER_INFO,userAuthProfileInfo});
//export const setCurrentUserId = (id) => ({type: SET_CURRENT_USER_ID,id});
export const setIsEdit = (isEdit) => ({type: IS_EDIT, isEdit});
export const setIsLoadEdit = (isLoadEdit) => ({type: IS_LOAD_EDIT,isLoadEdit});
export const setChangeAuthProfile = (profile) => ({type: SET_CHANGE_AUTH_PROFILE,profile});

export const getUserProfileInfo = (userId, isAuthUser = false) => (dispatch) => {
    debugger;
    if(userId){
        API.getProfileInfo(userId)
            .then(res => {
                if (isAuthUser) {
                    dispatch(setUserAvatarAndName(res.data.photos.small,res.data.fullName));
                    dispatch(setAuthUserInfo({...res.data}));
                } else {
                    dispatch(setUserInfo({...res.data}));
                }
            })
    }
};

export const setAuthUserProfile = (userAuthProfileInfo) => (dispatch) => {
    debugger;
    dispatch(setIsLoadEdit(true));
    API.setAuthProfileInfo(userAuthProfileInfo)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAuthUserInfo({...userAuthProfileInfo}));
                dispatch(setIsLoadEdit(false));
            }
        })
};

export default profileReducer;