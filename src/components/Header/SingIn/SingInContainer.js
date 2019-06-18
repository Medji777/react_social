import React from 'react';
import {connect} from "react-redux";
import SingIn from "./SingIn";
import {logOut} from './../../../DataBLL/authReducer';

const SingInContainer = (props) => {

    return (
        <SingIn {...props}/>
    )

};

const mapStateToProps = (state) => {
    let {isAuth, userInfo, message} = state.auth;
    return {
        isAuth,
        userInfo,
        message
    }
};

export default connect(mapStateToProps,{logOut})(SingInContainer);