import {createSelector} from 'reselect';

const getUsersName = state => state.name;
const getUsers = state => [...state.users];

export const UsersSelector = createSelector(
    [ getUsersName, getUsers ],
    (name, usersList) => {
        name = escapeRegExp(name);
        let regexp = new RegExp(`(^| )${name}`,'ig');
        let users = usersList.filter(u=>u.name.match(regexp));
        return {name, users};
    }
);

const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
};