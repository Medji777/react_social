import React from "react";
import InputForm from "../common/InputForm/InputForm";
import {Field} from "redux-form";
import styled from './Login.module.css';

const validateOnSert = (value) => {
    if(!value) return 'Input is REQUIRED';
    return undefined;
};

const validateOnLogin = (value) => {
    if(!(/^([a-z0-9_]+)?(-|.)([a-z0-9_]+)@[a-z0-9_]{2,5}\.[a-z]{2,6}/i.test(value))){
        return 'Login not corrected'
    }
    return undefined;
};

const validateOnPassword = (value) => {
    if(!(/^[a-z0-9_.]{1,13}/i.test(value))){
        return 'Password not corrected'
    }
    return undefined;
};

const validateOnNormPassword = (value) => {
    debugger
    if(value && value.length < 5){
        return 'Password not norm'
    }
    return undefined;
};

const LoginForm = ({errorMessageBlock,getInputValue,statuses,status,handleSubmit}) => {

    return (
        <form onSubmit={handleSubmit} className={styled.form__login}>
            <div className={styled.field__form_input}>
                <label htmlFor='login'>Login</label>
                <Field component={InputForm} id={'login'} type={'text'} name={'text'} validate={[validateOnSert,validateOnLogin]}/>
            </div>
            <div className={styled.field__form_input}>
                <label htmlFor='Password'>Password</label>
                <Field component={InputForm} id={'Password'} type={'password'} name={'password'} validate={[validateOnSert,validateOnPassword]} warn={validateOnNormPassword}/>
            </div>
            <div className={styled.field__form_checkbox}>
                <label htmlFor='RememberMe'>Remember Me</label>
                <Field component={InputForm} id={'RememberMe'} type={'checkbox'} name={'checkbox'}/>
            </div>
            <button type='submit' disabled={status === statuses.INPROGRESS}>LogIn</button>
            {errorMessageBlock}
        </form>
    )
};

export default LoginForm