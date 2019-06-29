import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "redux";

// export const redirectAnonUsersHoc = (Component) => {
//     const overComponent = (props) => {
//
//         if (!props.isAuth) {
//             return <Redirect to='/not-auth'/>
//         }
//
//         return <Component {...props}/>
//     };
//     return connect((state) => ({isAuth: state.auth.isAuth}))(overComponent);
// };
const redirectAnonUsersHoc = (Component) => (props) => {

    if (!props.isAuth) {
        return <Redirect to='/not-auth'/>
    }

    return <Component {...props}/>
};

export default compose(connect((state) => ({isAuth: state.auth.isAuth}), null), redirectAnonUsersHoc);