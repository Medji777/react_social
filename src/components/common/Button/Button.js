import React from 'react';
import styled from './Button.module.css';

const Button = ({type,children}) => {
    return (
            <button className={styled.btn} type={type}>
                {children}
            </button>
    );
};

export default Button;