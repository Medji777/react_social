import React from 'react';
import MyPost from "./MyPost";
import {addPost, updateNewPostText} from "../../../DataBLL/profileReducer";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    const {post,newTextPost} = state.dataProfile;
    return {
        post,
        newTextPost
    }
};

export default connect(mapStateToProps,{addPost,updateNewPostText})(MyPost);