import React from 'react';
//Компонент ссылок из react-router-dom
import {NavLink} from "react-router-dom";
import styled from './Nav.module.css';
import FriendsContainer from "./Friends/FriendsContainer";

const Nav = ({})=>{
    return (
        <nav className={styled.nav}>
            <ul>
                {/*Для использование ссылок компонета react-router-dom, вместо href импользуется to*/}
                {/*activeClassName - задает уникальное значение активного класса, по default 'active'*/}
                <li className={styled.item}><NavLink to="/profile" exact activeClassName={styled.active}>Profile</NavLink></li>
                <li className={styled.item}><NavLink to="/dialogs" activeClassName={styled.active}>Messages</NavLink></li>
                <li className={styled.item}><NavLink to="/news" activeClassName={styled.active}>News</NavLink></li>
                <li className={styled.item}><NavLink to="/music" activeClassName={styled.active}>Music</NavLink></li>
                <li className={styled.item}><NavLink to="/users" activeClassName={styled.active}>Find users</NavLink></li>
                <li className={styled.item}><NavLink to="/settings" activeClassName={styled.active}>Settings</NavLink></li>
            </ul>
            <FriendsContainer />
        </nav>
    )
};

export default Nav
