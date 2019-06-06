import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import styled from './Music.module.css';

const Music = ({isAuth}) =>{
    if (!isAuth) {
        return <Redirect to='/login'/>
    }
    return (
        <div className={styled.music}>
            <h2>Music</h2>
        </div>
    )

};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps,{})(Music);