import React from 'react';
import Dialogs from "./Dialogs";
import {sendMessageText, updateNewMessageText} from "../../DataBLL/dialogsReducer";
import {connect} from "react-redux";
import {redirectAnonUsersHoc} from "../HOC/AnonUsersHOC";

const DialogsContainer = ({dataDialogs,sendMessageText,updateNewMessage}) => {

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

export default connect(mapStateToProps, {sendMessageText, updateNewMessageText})(redirectAnonUsersHoc(DialogsContainer));