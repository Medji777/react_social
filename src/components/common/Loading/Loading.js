import React from 'react';
import styled from './Loading.module.css';

const Loading = ({wrap,preload}) => {
    return (
        <div style={wrap} className={styled.wrap_loading}>
            <div style={preload} className={styled.loading}/>
        </div>
    )
};

export default Loading;