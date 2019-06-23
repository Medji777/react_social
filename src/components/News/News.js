import React from 'react';
import styled from './News.module.css';
import {redirectAnonUsersHoc} from "../HOC/AnonUsersHOC";

const News = () => {
    return (
        <div className={styled.news}>
            <h2>News</h2>
        </div>
    )
};

export default redirectAnonUsersHoc(News);