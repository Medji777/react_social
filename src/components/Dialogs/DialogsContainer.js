import React from 'react';
import Dialogs from "./Dialogs";
import {sendMessageText, updateNewMessageText} from "../../DataBLL/dialogsReducer";
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';
//import StoreContext from '../../StoreContext';

// const DialogsContainer = ({}) => {
//
//     //let dataDialogs = store.getState().dataDialogs;
//
//     // const sendMessage = () => {
//     //     store.dispatch(sendMessageActionCreator());
//     // };
//     //
//     // const updateNewMessage = (text) => {
//     //     store.dispatch(updateNewMessageTextActionCreator(text));
//     // };
//
//     return (
//         <StoreContext.Consumer>
//             {
//                 (store)=>{
//                     const sendMessage = () => {
//                         store.dispatch(sendMessageActionCreator());
//                     };
//
//                     const updateNewMessage = (text) => {
//                         store.dispatch(updateNewMessageTextActionCreator(text));
//                     };
//                     let dataDialogs = store.getState().dataDialogs;
//                     return (
//                         <Dialogs dataDialogs={dataDialogs} sendMessageText={sendMessage} updateNewMessage={updateNewMessage}/>
//                     )
//                 }
//             }
//         </StoreContext.Consumer>
//     )
// };
const DialogsContainer = ({dataDialogs,sendMessageText,updateNewMessage,isAuth}) => {

    if(!isAuth) {
        return <Redirect to='/login'/>
    }

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

// const mapDispatchToProps = (dispatch) => {
//     return {
//         sendMessageText() {
//             dispatch(sendMessageActionCreator());
//         },
//         updateNewMessage(text) {
//             dispatch(updateNewMessageTextActionCreator(text));
//         }
//     }
// };

export default connect(mapStateToProps, {sendMessageText, updateNewMessageText})(DialogsContainer);