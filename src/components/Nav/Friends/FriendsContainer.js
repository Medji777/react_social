import React from 'react';
import Friends from "./Friends";
//import StoreContext from '../../../StoreContext'
import {connect} from "react-redux";

// const FriendsContainer = ({}) => {
//
//     //let {friendsName} = store.getState().dataFriends;
//
//     return (
//         <StoreContext.Consumer>
//             {
//                 (store)=>{
//                     let {friendsName} = store.getState().dataFriends;
//                     return (
//                         <Friends friends={friendsName}/>
//                     )
//                 }
//             }
//         </StoreContext.Consumer>
//     )
// };
const mapStateToProps = (state) => {
    return {
        friends: state.dataFriends.friendsName
    }
};
const FriendsContainer = connect(mapStateToProps)(Friends);

export default FriendsContainer