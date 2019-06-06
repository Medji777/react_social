import React from 'react';
import styled from '../Friends.module.css';

const Friend = ({name,src}) => {
    return (
        <div className={styled.friend}>
            <img src={src} alt=""/>
            <p>{name}</p>
        </div>
    )
};

export default Friend