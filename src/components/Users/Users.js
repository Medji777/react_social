import React from 'react';
import User from "./User/User";
import defaultImg from '../../assets/imgs/default_user.jpg';
import UsersSearch from "./UsersSearch/UsersSearch";
import styled from './Users.module.css';
import Loading from "../common/Loading/Loading";

const Users = (props) => {
    const {users, follow, unfollow, totalCount, isLoading, isLoadingSearch, toggleDisable, setUserName, setCount, removeUsersMoreScroll, searchUsersInfo, isAuth} = props;
    const isLoadingUsers = !!totalCount && users.length >= totalCount;
    if (isLoadingUsers) {
        removeUsersMoreScroll();
    }
    return (
        <div className={styled.users}>
            <h2>Users</h2>
            <UsersSearch setUserName={setUserName} searchUsersInfo={searchUsersInfo} isLoading={isLoadingSearch}/>
            <select onChange={setCount}>
                {/*Рендеринг повторяющихся элементов или списка с помощью метода массивов map*/}
                {[10, 20, 50, 100].map(num => (<option key={num} value={num}>{num}</option>))}
            </select>
            {
                users.map(u => <User
                    key={u.id}
                    id={u.id}
                    img={u.photos.small !== null ? u.photos.small : defaultImg}
                    name={u.name}
                    status={u.status}
                    city={'u.location.city'}
                    country={'u.location.country'}
                    btn={u.followed}
                    follow={follow}
                    unfollow={unfollow}
                    toggleDisable={toggleDisable}
                    isAuth={isAuth}
                />)
            }

            {
                isLoadingUsers ? <p>Пользователи закончились</p> : isLoading && <Loading wrap={{minHeight: '80vh'}}/>
                // :<button onClick={getUsersMore} className='button user_button'>Show more</button>
            }
            <div style={{height: '30px'}}/>
        </div>
    )
};

export default Users;