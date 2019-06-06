import React from 'react';
import styled from './User.module.css';

const User = ({img,id,name,status,city,country,btn,follow,unfollow}) => {

    return (
        <div className={styled.user}>
            <div className={styled.user_avatar}>
                <img src={img} alt=""/>
                {(btn) ?
                    <button onClick={()=> unfollow(id)}>unfollow</button> :
                    <button onClick={()=> follow(id)}>follow</button>
                }
            </div>
            <div className={styled.user_cont}>
                <div className={styled.user_cont__left}>
                    <p>{name}</p>
                    <p>{status}</p>
                </div>
                <div className={styled.user_cont__right}>
                    <p>{city}</p>
                    <p>{country}</p>
                </div>
            </div>
        </div>
    )
};

export default User