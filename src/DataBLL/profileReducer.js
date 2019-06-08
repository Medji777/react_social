import ConstantType from "./ConstantType";
import {setUserAvatarUrl} from './authReducer';
import API from "../DAL/api";

const {ADD_POST,UPDATE_NEW_POST_TEXT,SET_USER_INFO} = ConstantType;
const initialState = {
    post: [
        {id: '1', src: 'https://www.abc.net.au/news/image/8314104-1x1-940x940.jpg', text: 'post 1'},
        {id: '2', src: 'https://www.abc.net.au/news/image/8314104-1x1-940x940.jpg', text: 'post 2'},
        {id: '3', src: 'https://www.abc.net.au/news/image/8314104-1x1-940x940.jpg', text: 'post 3'},
        {id: '4', src: 'https://www.abc.net.au/news/image/8314104-1x1-940x940.jpg', text: 'post 4'}
    ],
    newTextPost: '',
    profileInfo: null
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
        default:
            return state;
    }
};

export const addPostActionCreator = () => ({type: ADD_POST});
export const updateNewPostTextActionCreator = (text) => ({type: UPDATE_NEW_POST_TEXT, newText: text});
export const setUserInfo = (profileInfo) => ({type:SET_USER_INFO,profileInfo});

export const getUserProfileInfo = (id,currentAuthUserId,initialLoginUserId) => (dispatch) => {
    debugger
    API.getProfileInfo(id)
        .then(res => {
            if(res.data.hasOwnProperty('message')){

            } else {
                if((currentAuthUserId || initialLoginUserId) === res.data.userId){
                    dispatch(setUserAvatarUrl(res.data.photos.small));
                    dispatch(setUserInfo({...res.data}))
                } else {
                    dispatch(setUserInfo({...res.data}))
                }
            }
        })
};

export default profileReducer