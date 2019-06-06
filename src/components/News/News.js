import React from 'react';
import styled from './News.module.css';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'

const News = ({isAuth}) => {
    if (!isAuth) {
        return <Redirect to='/login'/>
    }
    return (
        <div className={styled.news}>
            <h2>News</h2>
        </div>
    )
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps,{})(News)