import React from 'react';
import {connect} from "react-redux";
import SingIn from "./SingIn";
import {logOut,setIsActive} from './../../../DataBLL/authReducer';

class SingInContainer extends React.Component{

    addActive = () => {
        this.props.setIsActive(!this.props.isActive);
    };

    onWindowClick = () => {
        this.props.setIsActive(false);
    };

    componentDidMount() {
        window.addEventListener("click", this.onWindowClick);
    }

    componentWillUnmount() {
        this.props.onWindowClick();
        window.removeEventListener("click", this.onWindowClick);
    }

    render() {
        return (
            <SingIn {...this.props} addActive={this.addActive}/>
        )
    }
}

const mapStateToProps = (state) => {
    let {isAuth, userInfo, message,isActive} = state.auth;
    return {
        isAuth,
        userInfo,
        message,
        isActive
    }
};

export default connect(mapStateToProps, {logOut,setIsActive})(SingInContainer);