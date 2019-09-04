import React from 'react';
import styled from "../../Content.module.css";
import defaultImg from "../../../../assets/imgs/default_user.jpg";
import {NavLink} from "react-router-dom";
import PopUp from "../../../common/Popup/Popup";
import UpdatePhoto from "../../../UpdatePhoto/UpdatePhoto";

const ProfileImg = ({large,isEditProfileUser,openPopUp,isStartDialog,isAuth,userId,isOpenPopUp,closePopUp,isEdit}) => {
    return (
        <div className={styled.pp__i}>
            <div className={styled.pp__img_wrap}>
                <img src={large !== null ? large : defaultImg} alt=""/>
                {isEditProfileUser && <div className={styled.pp__img_wrap_bottom}>
                    <div onClick={openPopUp}>Изменить фото</div>
                </div>}
                {isStartDialog && isAuth && <button className={styled.pp__btn_dialog}><NavLink to={`/dialogs/${userId}`}>Написать сообщение</NavLink></button>}
            </div>
            <PopUp isOpen={isOpenPopUp} closePopUp={closePopUp}>
                <UpdatePhoto/>
            </PopUp>
            {isEdit && <NavLink to='/edit'>Edit profile</NavLink>}
        </div>
    )
};

export default ProfileImg;