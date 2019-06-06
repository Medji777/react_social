import React from 'react';
import {NavLink} from "react-router-dom";
import styled from './SingIn.module.css'
import defaultImg from '../../../assets/imgs/default_user.jpg';

export const SingIn = ({isAuth,userInfo,logOut,message}) => {
    debugger

    return (
        <div className={styled.login}>
            {isAuth && <div><div>{userInfo.userName}</div><img src={userInfo.userAvatarUrl !== null ? userInfo.userAvatarUrl : defaultImg} alt=''/><button onClick={logOut}>LogOut</button></div>}
            {!isAuth && <NavLink to='/login'>SingIn</NavLink>}
            <p>{message}</p>
        </div>
    )
};

export default SingIn;