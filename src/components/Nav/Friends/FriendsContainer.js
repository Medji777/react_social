import React from 'react';
import Friends from "./Friends";
import {connect} from "react-redux";

export default connect((state)=>({friends: state.dataFriends.friendsName,isAuth:state.auth.isAuth}),{})(Friends);