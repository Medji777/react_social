//import React from 'react';
import Friends from "./Friends";
import {connect} from "react-redux";
import {getFriends, getIsAuth} from "../../../DataBLL/selectors";

export default connect((state)=>({friends: getFriends(state),isAuth:getIsAuth(state)}),{})(Friends);