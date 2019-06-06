import React from 'react';
import styled from '../Dialogs.module.css';

const MessageList = ({message}) => {
    return (
        <div className={styled.message_item}>{message}</div>
    )
};

export default MessageList