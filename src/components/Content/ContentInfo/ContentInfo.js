import React from 'react';
import defaultImg from '../../../assets/imgs/default_user.jpg'
import styled from '../Content.module.css';
import Loading from "../../common/Loading/Loading";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {NavLink} from "react-router-dom";

const ContentInfo = ({profileInfo,userId,currentUserId,isEdit,setIsEdit}) => {
    if(!profileInfo){
        return (
            <Loading />
        )
    }

    if(!!profileInfo && profileInfo.userId === userId){
        setIsEdit(true);
    } else {
        setIsEdit(false);
    }

    const trueUrl = (icon) => {
        if(/website/.test(icon) || /mainLink/.test(icon)){
            return 'link';
        } else {
            return ['fab',`${icon}`];
        }
    };

    const {photos,fullName,aboutMe,contacts,lookingForAJob,lookingForAJobDescription} = profileInfo;
    const contactsArr = Object.keys(contacts).map(key => (
        !contacts[key] ? && <a key={key} href={contacts[key]} target='_blank' rel='noreferrer noopener'><FontAwesomeIcon icon={trueUrl(key)} /></a>
    ));

    return (
        <>
            <div className={styled.bg}>
                <img src="https://imgcomfort.com/Userfiles/Upload/images/illustration-geiranger.jpg" alt=""/>
            </div>
            <div className={styled.pp}>
                <div className={styled.pp__i}>
                    <div className={styled.pp__img_wrap}><img src={photos.large !== null ? photos.large : defaultImg} alt=""/><div className={styled.pp__img_wrap_bottom}><span>Изменить фото</span></div></div>
                    {isEdit && <NavLink to='/edit'>edit</NavLink>}
                    </div>
                <div className={styled.pp__desc}>
                    <p className={styled.pp__desc_name}>{fullName}</p>
                    <div>
                        <p>About me: </p>
                        <p>{aboutMe}</p>
                    </div>
                    <div>
                        <p>Status:</p>
                        {lookingForAJob ? <div>
                            <p>В поисках работы</p>
                            <div>
                                <p>Что именно:</p>
                                <p>{lookingForAJobDescription}</p>
                            </div>
                        </div> : 'Работаю'}
                    </div>
                    <div className={styled.pp__desc_contacts}>
                        <p>Contacts: </p>
                        <div className={styled.pp__desc_contacts_list}>
                            { contactsArr }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ContentInfo