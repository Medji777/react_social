import {createSelector} from 'reselect';

// users
export const getUsersFromState = state => state.usersPage.users;
export const getCurrentPageUsers = state => state.usersPage.currentPage;
export const getCount = state => state.usersPage.count;
export const getTotalCount = state => state.usersPage.totalCount;
export const getIsLoading = state => state.usersPage.isLoading;
export const getIsLoadingSearch = state => state.usersPage.isLoadingSearch;
export const getToggleDisable = state => state.usersPage.toggleDisable;

const getUsersName = state => state.usersPage.searchUsers.name;
const getUsersSearch = state => [...state.usersPage.searchUsers.users];

export const UsersSelector = createSelector(
    [ getUsersName, getUsersSearch ],
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

// dialogs
export const getSelectDialogId = state => state.dataDialogs.selectDialogId;
export const getDataDialogs = state => state.dataDialogs;
export const getTotalCountMessages = state => state.dataDialogs.totalCountMessages;
export const getCurrentPageDialogs = state => state.dataDialogs.currentPage;
export const getMessageDelete = state => state.dataDialogs.messageDelete;

// auth
export const getIsAuth = state => state.auth.isAuth;
export const getUserInfo = state => state.auth.userInfo;
export const getUserId = state => state.auth.userInfo.userId;
export const getMessage = state => state.auth.message;
export const getIsActive = state => state.auth.isActive;
export const getIsInitialized = state => state.auth.isInitialized;

// friends
export const getFriends = state => state.dataFriends.friendsName;

// profile
export const getPost = state => state.dataProfile.post;
export const getCurrentUserId = state => state.dataProfile.currentUserId;
export const getCountNewMessage = state => state.dataDialogs.countNewMessage;
export const getGetDialogsCountMode = state => state.dataDialogs.getDialogsCountMode;

// login
export const getCurrentId = state => state.login.currentId;

// app
export const getWidthScreen = state => state.app.widthScreen;
export const getIsWidthResizeMode = state => state.app.isWidthResizeMode;