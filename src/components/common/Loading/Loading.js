import React from 'react';
import styled from './Loading.module.css';

const Loading = (props) => {
    return (
        <div style={props.wrap} className={styled.wrap_loading}>
            <div style={props.preload} className={styled.loading}/>
        </div>
    )
};

export default Loading;