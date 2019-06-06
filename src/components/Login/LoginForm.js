import React from "react";
import InputForm from "./InputForm/InputForm";

const LoginForm = ({errorMessageBlock,getInputValue,statuses}) => {
    return (
        <form onSubmit={getInputValue}>
            <div>
                <label htmlFor='login'>Login</label>
                <InputForm id={'login'} type={'text'} name={'text'}/>
            </div>
            <div>
                <label htmlFor='Password'>Password</label>
                <InputForm id={'Password'} type={'password'} name={'password'}/>
            </div>
            <div>
                <label htmlFor='RememberMe'>Remember Me</label>
                <InputForm id={'RememberMe'} type={'checkbox'} name={'checkbox'}/>
            </div>
            <button disabled={status === statuses.INPROGRESS}>LogIn</button>
            {errorMessageBlock}
        </form>
    )
};

export default LoginForm