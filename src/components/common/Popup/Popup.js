import React from 'react';
import Popup from "reactjs-popup";
//import styled from './Popup.module.css';

const PopUp = (props) => {

    return (
        <Popup open={props.isOpen} onClose={props.closePopUp} modal closeOnDocumentClick>
            <>
                <div><p>Загрузка новой фотографии</p><span className="close" onClick={props.closePopUp}>&times;</span></div>
                {props.children}
            </>
        </Popup>
    );

};

export default PopUp;