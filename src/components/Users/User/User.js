import React,{memo} from 'react';
import {Link} from "react-router-dom";
import styled from './User.module.css';

const User = memo(({img,id,name,status,city,country,btn,follow,unfollow,toggleDisable,isAuth}) => {

    return (
        <div className={styled.user}>
            <div className={styled.user_avatar}>
                <Link to={`profile/${id}`}><img src={img} alt=""/></Link>
                {isAuth && (btn ?
                    <button onClick={()=> unfollow(id)} disabled={toggleDisable.some(uId => uId === id)}>unfollow</button> :
                    <button onClick={()=> follow(id)} disabled={toggleDisable.some(uId => uId === id)}>follow</button>)}
            </div>
            <div className={styled.user_cont}>
                <div className={styled.user_cont__left}>
                    <p>{name}</p>
                    <p>{`${city}, ${country}`}</p>
                </div>
                <div className={styled.user_cont__right}>
                    <p>{status}</p>
                </div>
            </div>
        </div>
    )
});

export default User