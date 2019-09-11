import React from 'react';
import {connect} from "react-redux";
import AnonUsersHOC from "../HOC/AnonUsersHOC";
import {setAuthUserProfile,setChangeAuthProfile} from './../../DataBLL/profileReducer';
import EditFormUser from "./EditFormUser";
import {compose} from "redux";
import {getIsLoadEdit, getIsWidthResizeMode, getUserAuthProfileInfo} from "../../DataBLL/selectors";
import styled from './Edit.module.css';

const EditProfileUser = ({setAuthUserProfile, profile, isLoadEdit,isWidthResizeMode}) => {

    const getInputValue = (value) => {
        setAuthUserProfile && setAuthUserProfile(value);
    };

    return (
        <div className={styled.edit}>
            <h2>EDIT</h2>
            <EditFormUser onSubmit={getInputValue} initialValues={profile} isLoadEdit={isLoadEdit} isWidthResizeMode={isWidthResizeMode}/>
        </div>
    )
};

export default compose(connect((state) => ({
    profile: getUserAuthProfileInfo(state),
    isLoadEdit: getIsLoadEdit(state),
    isWidthResizeMode: getIsWidthResizeMode(state)
}), {setAuthUserProfile,setChangeAuthProfile}),AnonUsersHOC)(EditProfileUser);