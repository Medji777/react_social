import React from 'react';
import {connect} from "react-redux";
import {login, statuses} from './../../DataBLL/loginReducer';
import {Redirect} from 'react-router-dom';
import LoginForm from "./LoginForm";
import {reduxForm} from "redux-form";
import styled from './Login.module.css';

export const Login = ({login,status,message,isAuth}) => {

    if(isAuth) {
        return <Redirect to='/profile'/>
    }

    const getInputValue = (value) => {
        login && login(value.text,value.password,value.checkbox);
    };

    let errorMessageBlock = status === statuses.ERROR && <div className="error">{message}</div>;

    return (
        <div className={styled.auth}>
            <div className={styled.auth_page}>
                <h2>Authorization</h2>
                <LoginReduxForm onSubmit={getInputValue} errorMessageBlock={errorMessageBlock} statuses={statuses} status={status}/>
            </div>
        </div>
    );

};

const LoginReduxForm = reduxForm({
    form: 'loginForm',

})(LoginForm);

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

export default connect(mapStateToProps,{login})(Login);