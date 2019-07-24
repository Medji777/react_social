import React, {useEffect, useState} from 'react';
import StatusUser from "./StatusUser";
import {setUpdateStatus} from "../../../../DataBLL/profileReducer";
import {connect} from "react-redux";

const StatusUserContainer = ({setUpdateStatus,userStatus,profileInfo,userId}) => {

    const [isEditMode, setIsEditMode] = useState(false);
    const [status, setStatus] = useState('');

    // if (userStatus !== status) {
    //     setStatus(userStatus)
    // }

    useEffect(() => {
        setStatus(userStatus)
    }, [userStatus]);

    const activeEditMode = () => {
        setIsEditMode(true);
    };

    const deactiveEditMode = (e) => {
        setIsEditMode(false);
        if (userStatus !== status) {
            setUpdateStatus(e.currentTarget.value);
        }
    };

    const setEditStatus = (e) => {
        setStatus(e.currentTarget.value);
    };

    return (
        <StatusUser isEditMode={isEditMode} status={status} profileInfo={profileInfo} userId={userId} setEditStatus={setEditStatus} activeEditMode={activeEditMode} deactiveEditMode={deactiveEditMode}/>
    );

};

    // class StatusUserContainer extends React.Component{
    //
    //     state = {
    //         isEditMode: false,
    //         status: ''
    //     };
    //
    //     activeEditMode = () => {
    //         this.setState({isEditMode: true})
    //     };
    //
    //     deactiveEditMode = (e) => {
    //         this.setState({isEditMode: false});
    //         setUpdateStatus(e.currentTarget.value);
    //     };
    //
    //     setEditStatus = (e) => {
    //         this.setState({status: e.currentTarget.value});
    //     };
    //
    //     componentDidMount() {
    //         this.setState({status: this.props.userStatus});
    //     }
    //
    //     componentDidUpdate(prevProps, prevState, snapshot) {
    //         if(this.props.userStatus !== prevProps.userStatus){
    //             this.setState({status: this.props.userStatus});
    //         }
    //     }
    //
    //     render() {
    //         debugger
    //         return (
    //             <StatusUser isEditMode={this.state.isEditMode} status={this.state.status} profileInfo={this.props.profileInfo} userId={this.props.userId} setEditStatus={this.setEditStatus} activeEditMode={this.activeEditMode} deactiveEditMode={this.deactiveEditMode}/>
    //         )
    //     }
    // }

export default connect((state)=>({userStatus:state.dataProfile.userStatus}),{setUpdateStatus})(StatusUserContainer);