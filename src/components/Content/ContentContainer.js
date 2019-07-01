import React from 'react';
import {connect} from 'react-redux';
import Content from './Content';
import {setUserInfo, getUserProfileInfo,setIsEdit} from '../../DataBLL/profileReducer';
import {withRouter} from "react-router-dom";
import {compose} from "redux";

class ContentContainer extends React.Component{

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
           this.props.getUserProfileInfo(this.getCurrentId(),false)
        }
    }

    componentDidMount() {
        this.props.getUserProfileInfo(this.getCurrentId(),false)
    }

    componentWillUnmount() {
        this.props.setUserInfo(null);
    }

    render() {
        return (
            <Content {...this.props}/>
        )
    }
}

const mapStateToProps = (state) => {
        return {
            profileInfo: state.dataProfile.profileInfo,
            userId: state.auth.userInfo.userId,
            initialId: state.login.currentId,
            isEdit: state.dataProfile.isEdit
        }
};

export default compose(connect(mapStateToProps,{setUserInfo,getUserProfileInfo,setIsEdit}),withRouter)(ContentContainer);