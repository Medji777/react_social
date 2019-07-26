import React from 'react';
import {connect} from 'react-redux';
import Content from './Content';
import {setUserInfo, getUserProfileInfo, setIsEdit, setIsOpenPopUp, getStatusUser} from '../../DataBLL/profileReducer';
import {withRouter} from "react-router-dom";
import {compose} from "redux";

class ContentContainer extends React.Component{

    openPopUp = () => {
        this.props.setIsOpenPopUp(!this.props.isOpenPopUp)
    };

    closePopUp = () => {
        this.props.setIsOpenPopUp(false);
    };

    getCurrentId = () => {
      let currentId = this.props.match.params.userId;
        if(!currentId){
            if(!this.props.userId){
                return this.props.initialId
            } else {
                return this.props.userId
            }
        }
        return currentId;
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            debugger;
           this.props.getUserProfileInfo(this.getCurrentId(),false);
           this.props.getStatusUser(this.getCurrentId());
        }
    }

    componentDidMount() {
        debugger;
        this.props.getUserProfileInfo(this.getCurrentId(),false);
        this.props.getStatusUser(this.getCurrentId());
    }

    componentWillUnmount() {
        this.props.setUserInfo(null);
    }

    render() {
        return (
            <Content {...this.props} openPopUp={this.openPopUp} closePopUp={this.closePopUp} />
        )
    }
}

const mapStateToProps = (state) => {
        return {
            profileInfo: state.dataProfile.profileInfo,
            userId: state.auth.userInfo.userId,
            initialId: state.login.currentId,
            isEdit: state.dataProfile.isEdit,
            isOpenPopUp: state.dataProfile.isOpenPopUp
        }
};

export default compose(connect(mapStateToProps,{setUserInfo,getUserProfileInfo,setIsEdit,setIsOpenPopUp,getStatusUser}),withRouter)(ContentContainer);