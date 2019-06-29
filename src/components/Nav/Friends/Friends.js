import React from 'react';
import Friend from "./Friend/Friend";
import styled from './Friends.module.css';

const Friends = ({friends,isAuth}) => {
    return (
        isAuth &&
        <div className={styled.friends}>
            <h3>Friends</h3>
            <div className={styled.friends_list}>
                {
                    friends.map((f) => <Friend key={f.id} name={f.name} src={f.avatarImg} styled={styled}/>)
                }
            </div>
        </div>
    )
};

export default Friends