import React from 'react';
import {Link} from "react-router-dom";
import styled from './NotAuth.module.css'

let NotAuthorized = () => {
    return (
        <div className={styled.notAuth}>
            <div><p>Вы не авторизованы!</p><p><Link to='/login'>Залогиньтесь</Link> или зарегистрируйтесь</p></div>
        </div>
    );
};

export default NotAuthorized;