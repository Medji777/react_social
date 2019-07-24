import React, {Component} from 'react';
import {connect} from "react-redux";
import {setUpdatePhoto} from "../../DataBLL/profileReducer";
import styled from './UpdatePhoto.module.css'

class UpdatePhoto extends Component {

    // state = {
    //     isActive: false,
    //     isUp: false
    // };

    update = (e) => {
        const formData = new FormData();
        formData.append('image',e.currentTarget.files[0]);
        this.props.setUpdatePhoto(formData,this.props.userId);
    };

    render() {
        return (
            <div className={styled.update}>
                {/*<button onClick={(e) => e.currentTarget.nextSibling.click()}>Выберете фото</button>*/}
                <div>
                    <p>Выберете фотографию для профиля. Размер строго 300x300</p>
                    <div className={styled.update__input}>
                        <label htmlFor='photo'>Выберете фото</label>
                        <input type='file' name='image' id='photo' onChange={this.update}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state)=>({userId: state.auth.userInfo.userId}),{setUpdatePhoto})(UpdatePhoto);
