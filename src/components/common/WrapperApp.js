import React from 'react';
import styled from './WrapperApp.module.css';

export default (props) => {
    return (
        <div className={styled.wrapper}>
            {props.children}
        </div>
    )
};