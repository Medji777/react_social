import React from 'react';
import DialogList from "./DialogList/DialogList";
import MessageList from "./MessageList/MessageList";
import styled from './Dialogs.module.css';

const Dialogs = ({dataDialogs,sendMessage,changeTextMessage}) => {
  return (
      <div className={styled.dialogs}>
          <h2>Dialogs</h2>
          <div className={styled.dialogs_items}>
              {
                  dataDialogs.dialogName.map((n)=> <DialogList key={n.id} name={n.name} id={n.id} src={n.avatarImg}/>)
              }
          </div>
          <div className={styled.messages}>
              {
                  dataDialogs.messageName.map((m)=> <MessageList key={m.id} message={m.message} />)
              }
          </div>
          <div className={styled.message_post}>
              <form className='form_message' onSubmit={sendMessage}>
                  <textarea id="message" onChange={changeTextMessage} value={dataDialogs.newMessageText} cols="30" rows="10" placeholder='message'/>
                  <button>Send Message</button>
              </form>
          </div>
      </div>
  )
};

export default Dialogs