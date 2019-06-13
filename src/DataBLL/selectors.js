import React from 'react';
import {createSelector} from 'reselect';

// export const UserSelector = (state) => {
//     //debugger;
//     let regexp = new RegExp(`^${state.name}`,'i');
//     let users = [...state.users].filter(u=>u.name.match(regexp));
//     return {...state,users}
// };

const getUsersName = (state) => state.name;
const getUsers = (state) => [...state.users];

export const UsersSelector = createSelector(
    [ getUsersName, getUsers ],
    (name, usersList) => {
        let regexp = new RegExp(`(^| )${name}`,'ig');
        // console.log(regexp);
        let users = usersList.filter(u=>u.name.match(regexp));
        return {name, users};
    }
);