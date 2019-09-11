import React from 'react';
import defaultImg from "../../../assets/imgs/default_user.jpg";
import {Link} from "react-router-dom";
import Loading from "../../common/Loading/Loading";
import styled from './UsersSearch.module.css';

const UsersSearch = ({setUserName, searchUsersInfo, isLoadingSearch}) => {
    const {name, users} = searchUsersInfo;
    const wrap = {minHeight: '23px', position: 'absolute', display: 'flex',
        alignItems: 'center', flexDirection: 'row', right: '15px'};
    const preload = {width: '10px', height: '10px', border: '2px solid #fff', borderTopColor: '#1add05'};
    return (
        <div className={styled.search}>
            <input onChange={setUserName} type="text" placeholder='Search...'/>
            {isLoadingSearch && <Loading wrap={wrap} preload={preload}/>}
            {name.length >= 1 &&
            <div className={styled.search__result}>
                {(users.length === 0 && name.length > 1) ?
                    <p className={styled["search__result-element--error"]}>Найдено {users.length} пользователей</p> :
                    users.map(u =>
                        <Link to={`profile/${u.id}`} key={u.id} className={styled.search__link}>
                            <div key={u.id} className={styled["search__result-element"]}>
                                <img src={u.photos.small !== null ? u.photos.small : defaultImg} alt=''/>
                                <div className={styled["search__result-element--desc"]}>
                                    <p>{u.name}</p>
                                </div>
                            </div>
                        </Link>)
                }
            </div>
            }
        </div>
    )
};

export default UsersSearch;