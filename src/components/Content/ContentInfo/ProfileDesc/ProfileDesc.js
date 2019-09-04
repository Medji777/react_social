import React from 'react';
import StatusUserContainer from "../StatusUser/StatusUserContainer";
import styled from "../../Content.module.css";

const ProfileDesc = ({profileInfo,contactsArr,...props}) => {
    const {fullName,aboutMe,lookingForAJob,lookingForAJobDescription} = profileInfo;

    return (
        <div className={styled.pp__desc}>
            <p className={styled.pp__desc_name}>{fullName}</p>
            <StatusUserContainer profileInfo={profileInfo} {...props}/>
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
                    {contactsArr}
                </div>
            </div>
        </div>
    )
};

export default ProfileDesc;