import React from 'react';
import {connect} from "react-redux";
import {login, statuses} from './../../DataBLL/loginReducer';
import {Redirect} from 'react-router-dom';
import LoginForm from "./LoginForm";

export const Login = ({login,status,message,isAuth}) => {

    if(isAuth) {
        return <Redirect to='/profile'/>
    }

    const getInputValue = (e) => {
        e.preventDefault();
        debugger
        let {text,password,checkbox} = e.currentTarget.elements;
        login && login(text.value,password.value,checkbox.checked);
    };

    let errorMessageBlock = status === statuses.ERROR && <div className="error">{message}</div>;

    return (
        <div>
            <h2>Authorization</h2>
            <LoginForm errorMessageBlock={errorMessageBlock} getInputValue={getInputValue} statuses={statuses}/>
        </div>
    );

};

const mapStateToProps = (state) => {
    const {status,message,captchaUrl} = state.login;
    const {isAuth} = state.auth;
    return {
        isAuth,
        status,
        message,
        captchaUrl
    }
};

// const mapDispatchToProps = (dispatch) => ({
//     login(l,p,rm,c){
//         dispatch(login(l,p,rm,c));
//     }
// });

export default connect(mapStateToProps,{login})(Login);