import React from 'react';
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styled from './SingIn.module.css';
import defaultImg from '../../../assets/imgs/default_user.jpg';

export const SingIn = ({isAuth, userInfo, logOut, message, addActive, isActive}) => {
    return (
        <div className={styled.login} onClick={(e) => {
            e.stopPropagation();
        }}>
            {isAuth && <>
                <div onClick={addActive} className={isActive ? `${styled.login__info} ${styled.login__info__active}` : styled.login__info}>
                    <div className={styled.login__info__name}>{userInfo.userName}</div>
                    <img className={styled.login__info__img}
                         src={userInfo.userAvatarUrl !== null ? userInfo.userAvatarUrl : defaultImg} alt=''/>
                    <FontAwesomeIcon className={styled.login__info__arrow} icon={['fas', 'chevron-down']}/>
                </div>
                <div className={isActive ? `${styled.login__menu} ${styled.login__menu__active}` : styled.login__menu}>
                    <button className={styled.login__menu__logOut} onClick={logOut}>LogOut</button>
                </div>
            </>}
            {!isAuth && <NavLink to='/login'>SingIn</NavLink>}
            {message && <p>{message}</p>}
        </div>
    )
};

export default SingIn;