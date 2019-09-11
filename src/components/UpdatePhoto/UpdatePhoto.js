import React from 'react';
import {connect} from "react-redux";
import {setUpdatePhoto} from "../../DataBLL/profileReducer";
import styled from './UpdatePhoto.module.css'
import {getUserId} from "../../DataBLL/selectors";

const UpdatePhoto = ({setUpdatePhoto, userId}) => {

    const update = (e) => {
        const formData = new FormData();
        formData.append('image', e.currentTarget.files[0]);
        setUpdatePhoto(formData, userId);
    };

    return (
        <div className={styled.update}>
            <div>
                <p className={styled.update__title}>Выберете фотографию для профиля. Размер строго 300x300</p>
                <div className={styled.update__input}>
                    <label htmlFor='photo'>Выберете фото</label>
                    <input type='file' name='image' id='photo' onChange={update}/>
                </div>
            </div>
        </div>
    );
};

export default connect((state)=>({userId: getUserId(state)}),{setUpdatePhoto})(UpdatePhoto);
