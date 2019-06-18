import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

export const redirectAnonUsersHoc = (Component) => {
    const otherComponent = (props) => {

        if (!props.isAuth) {
            return <Redirect to='/not-auth'/>
        }

        return <Component {...props}/>
    };
    return connect((state) => ({isAuth: state.auth.isAuth}))(otherComponent);
};