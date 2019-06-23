import React from 'react';
import styled from './Music.module.css';
import {redirectAnonUsersHoc} from "../HOC/AnonUsersHOC";

const Music = () =>{
    return (
        <div className={styled.music}>
            <h2>Music</h2>
        </div>
    )
};

export default redirectAnonUsersHoc(Music);