import React from 'react';
import styled from './Header.module.css';
import SingInContainer from "./SingIn/SingInContainer";
import logo from './../../assets/imgs/logo.png';

const Header = ()=>{

    return (
        <header className={styled.header}>
            <img src={logo} alt="logo" className={styled.header__logo}/>
            <SingInContainer />
        </header>
    )

};

export default Header;
