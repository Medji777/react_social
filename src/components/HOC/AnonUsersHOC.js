import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "redux";
import {getIsAuth} from "../../DataBLL/selectors";

 const redirectAnonUsersHoc = (Component) => (props) => {

     if (!props.isAuth) {
         return <Redirect to='/not-auth'/>
     }

     return <Component {...props}/>
 };

export default compose(connect((state) => ({isAuth: getIsAuth(state)}), null), redirectAnonUsersHoc);