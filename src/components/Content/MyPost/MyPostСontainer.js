import React from 'react';
import MyPost from "./MyPost";
import {addPost} from "../../../DataBLL/profileReducer";
import {connect} from "react-redux";
import {reset} from 'redux-form';
import {getIsAuth, getPost} from "../../../DataBLL/selectors";

const MyPostContainer = ({addPost,updateNewPostText,...props}) => {

    const sendPostText = (value) => {
          !!value && addPost(value.post);
    };

    const resetForm = (result,dispatch) => {
        dispatch(reset('post'))
    };

    return <MyPost onSubmit={sendPostText} onSubmitSuccess={resetForm} {...props}/>
};

export default connect((state) => ({post: getPost(state),isAuth: getIsAuth(state)}),{addPost,reset})(MyPostContainer);