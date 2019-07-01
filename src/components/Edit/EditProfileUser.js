import React from 'react';
import {reduxForm,change} from "redux-form";
import {connect} from "react-redux";
import AnonUsersHOC from "../HOC/AnonUsersHOC";
import {setAuthUserProfile,setChangeAuthProfile} from './../../DataBLL/profileReducer';
import EditFormUser from "./EditFormUser";
import {compose} from "redux";

class EditProfileUser extends React.Component{

    getInputValue = (value) => {
        this.props.setAuthUserProfile && this.props.setAuthUserProfile(value);
    };

    // setChangeValue = (values,dispatch,props,previousValues) => {
    //     debugger
    //     if(values !== previousValues){
    //         dispatch(this.props.change('editForm',`${props.registeredFields}`,values))
    //         // setChangeAuthProfile && setChangeAuthProfile(values);
    //     }
    // };
    //
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     this.setChangeValue();
    // }

    render() {
        const {profile,isLoadEdit} = this.props;
        return (
            <div>
                <h2>EDIT</h2>
                <EditReduxForm onSubmit={this.getInputValue} initialValues={profile} isLoadEdit={isLoadEdit}/>
            </div>
        )
    }
}

const EditReduxForm = reduxForm({
    form: 'editForm',
    // onChange(values,dispatch,props,previousValues){
    //     if(values !== previousValues){
    //         dispatch(this.props.change('editForm',`${props.registeredFields}`,values))
    //     }
    // },
    // enableReinitialize: true,
    // touchOnChange: true
})(EditFormUser);

export default compose(connect((state) => ({
    profile: state.dataProfile.userAuthProfileInfo,
    isLoadEdit: state.dataProfile.isLoadEdit,
}), {setAuthUserProfile,setChangeAuthProfile,change}),AnonUsersHOC)(EditProfileUser);