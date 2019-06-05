import React from 'react';
import {NavLink} from "react-router-dom";
import styled from '../Dialogs.module.css';

const DialogList = ({name,id,src}) => {
    return (
        <div className={styled.dialog_item}>
            <img src={src} alt=""/>
            <NavLink to={`/dialogs/${id}`} activeClassName={styled.active}>{name}</NavLink>
        </div>
    )
};

export default DialogList