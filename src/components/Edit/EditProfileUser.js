import React from 'react';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import AnonUsersHOC from "../HOC/AnonUsersHOC";
import {setAuthUserProfile,setChangeAuthProfile} from './../../DataBLL/profileReducer';
import EditFormUser from "./EditFormUser";
import {compose} from "redux";

const EditProfileUser = ({setAuthUserProfile, profile, isLoadEdit}) => {

    const getInputValue = (value) => {
        setAuthUserProfile && setAuthUserProfile(value);
    };

    return (
        <div>
            <h2>EDIT</h2>
            <EditReduxForm onSubmit={getInputValue} initialValues={profile} isLoadEdit={isLoadEdit}/>
        </div>
    )

};

const EditReduxForm = reduxForm({
    form: 'editForm'
})(EditFormUser);

export default compose(connect((state) => ({
    profile: state.dataProfile.userAuthProfileInfo,
    isLoadEdit: state.dataProfile.isLoadEdit,
}), {setAuthUserProfile,setChangeAuthProfile}),AnonUsersHOC)(EditProfileUser);