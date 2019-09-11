import React from 'react';
import Popup from "reactjs-popup";
import styled from './Popup.module.css';

const PopUp = ({isOpen, closePopUp, children}) => {
    return (
        <Popup open={isOpen} onClose={closePopUp} modal closeOnDocumentClick>
            <>
                <div className={styled.modal_header}><p>Загрузка новой фотографии</p>
                    <span className={`${styled.modal_close} close`} onClick={closePopUp}>&times;</span>
                </div>
                {children}
            </>
        </Popup>
    );
};

export default PopUp;