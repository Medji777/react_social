import React from 'react';
import SingContainer from "./Sing/Sing";
import NewMessageCount from "./NewMessageCount/NewMessageCount";
import LogoMenu from "./LogoMenu/LogoMenu";
import styled from './Header.module.css';

const Header = ({countNewMessage,message,toggleMobileMenu,isWidthResizeMode,...props}) => {
        return (
            <header className={styled.header}>
                <div className={styled.header__wrapper}>
                    <LogoMenu toggleMobileMenu={toggleMobileMenu} isWidthResizeMode={isWidthResizeMode}/>
                    {props.isAuth && <NewMessageCount countNewMessage={countNewMessage}/>}
                    <SingContainer {...props} message={message}/>
                </div>
            </header>
        )
};

export default Header;
