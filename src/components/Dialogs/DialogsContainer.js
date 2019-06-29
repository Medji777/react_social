import React from 'react';
import Dialogs from "./Dialogs";
import {sendMessageText, updateNewMessageText} from "../../DataBLL/dialogsReducer";
import {connect} from "react-redux";
//import {Redirect} from 'react-router-dom';
import redirectAnonUsersHoc from "../HOC/AnonUsersHOC";
import {compose} from "redux";

const DialogsContainer = ({dataDialogs,sendMessageText,updateNewMessage}) => {

    // if(!isAuth) {
    //     return <Redirect to='/not-auth'/>
    // }

    const sendMessage = (e) => {
        e.preventDefault();
        sendMessageText();
    };

    const changeTextMessage = (e) => {
        let text = e.currentTarget.value;
        updateNewMessage(text);
    };

    return (
        <Dialogs dataDialogs={dataDialogs} sendMessage={sendMessage} changeTextMessage={changeTextMessage} />
    )
};

const mapStateToProps = (state) => {
    return {
        dataDialogs: state.dataDialogs,
        isAuth: state.auth.isAuth
    }
};

export default compose(connect(mapStateToProps, {sendMessageText, updateNewMessageText}),redirectAnonUsersHoc)(DialogsContainer);