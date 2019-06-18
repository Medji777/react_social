import React from 'react';
import {Link} from "react-router-dom";

let NotAuthorized = () => {
    return (
        <div>
            <div><p>Вы не авторизированы!</p><p><Link to='/login'>Залогиньтесь</Link> или зарегистрируйтесь</p></div>
        </div>
    );

};

export default NotAuthorized;
