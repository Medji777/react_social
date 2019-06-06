import React from 'react';
import {connect} from "react-redux";
import SingIn from "./SingIn";
import {getUserInfoAuth,logOut} from './../../../DataBLL/authReducer';

class SingInContainer extends React.Component{

    componentDidMount() {
        this.props.getUserInfoAuth()
    }

    render() {
        return (
            <SingIn {...this.props}/>
        )
    }
}

const mapStateToProps = (state) => {
    let {isAuth,userInfo,message} = state.auth;
    return {
        isAuth,
        userInfo,
        message
    }
};

export default connect(mapStateToProps,{getUserInfoAuth,logOut})(SingInContainer);