import React from 'react';
import {connect} from 'react-redux';
import Content from './Content';
import {setUserInfo,getUserProfileInfo} from '../../DataBLL/profileReducer';
import {getUserInfoAuth,setUserAvatarUrl} from "./../../DataBLL/authReducer";
import {withRouter} from "react-router-dom";

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
        debugger

        if (this.props.match.params.userId !== prevProps.match.params.userId) {
           this.props.getUserProfileInfo(this.getCurrentId,this.props.userId,this.props.initialId)
        }
    }

    componentDidMount() {
        this.props.getUserProfileInfo(this.getCurrentId,this.props.userId,this.props.initialId)
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
        debugger;
        return {
            profileInfo: state.dataProfile.profileInfo,
            userId: state.auth.userInfo.userId,
            initialId: state.login.currentId
        }
};

  let WithRouterComponentContainer =  withRouter(ContentContainer);

export default connect(mapStateToProps,{setUserInfo,getUserInfoAuth,setUserAvatarUrl,getUserProfileInfo})(WithRouterComponentContainer);