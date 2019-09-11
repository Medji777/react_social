import React from 'react';
import {NavLink} from "react-router-dom";
import FriendsContainer from "./Friends/FriendsContainer";
import styled from './Nav.module.css';

const Nav = ({isAuth,isActive,isWidthResizeMode,onMenuClose})=>{

    const menuLink = [
        {id: 1, exact: true, path: '/profile', title: 'Profile'},
        {id: 2, exact: false, path: '/dialogs', title: 'Messages'},
        {id: 3, exact: false, path: '/news', title: 'News'},
        {id: 4, exact: false, path: '/music', title: 'Music'},
        {id: 5, exact: false, path: '/users', title: 'Find users'},
        {id: 6, exact: false, path: '/settings', title: 'Settings'}
    ];

    return (
        <nav onClick={(e) => isWidthResizeMode && e.stopPropagation()} className={isActive ? `${styled.nav} ${styled.nav__active}` : `${styled.nav}`}>
            <ul className={isAuth ? styled.nav__items : `${styled.nav__items} ${styled.not_auth}`}>
                {/*Для использование ссылок компонета react-router-dom, вместо href импользуется to*/}
                {/*activeClassName - задает уникальное значение активного класса, по default 'active'*/}
                {menuLink.map(l => <li key={l.id} className={styled.item}><NavLink onClick={() => isWidthResizeMode && onMenuClose()} to={l.path} exact={l.exact} activeClassName={styled.active}>{l.title}</NavLink></li>)}
            </ul>
            <FriendsContainer />
        </nav>
    )
};

export default Nav
