import ConstantType from "./ConstantType";
import API from "../DAL/api";

const {FOLLOW,UNFOLLOW,SET_USERS,
       SET_CURRENT_PAGE,SET_TOTAL_COUNT,UPDATE_USERS,
       SET_SEARCH_USERS,SET_SEARCH_USERS_NAME,RESET_SEARCH_USERS_NAME,
       SET_COUNT_USERS,IS_LOADING,IS_LOADING_SEARCH,DISABLE} = ConstantType;

const initialState = {
    users: [],
    currentPage: 1,
    count: 10,
    totalCount: null,
    isLoading: false,
    isLoadingSearch: false,
    toggleDisable: [],
    searchUsers: {
        name: '',
        users: []
    }
};

const followToggle = (state,action,followed) => {
    return {
        ...state,
        users: state.users.map(u => {
            return (u.id === action.userId) ? {...u, followed} : u
        })
    };
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return followToggle (state,action,true);
        case UNFOLLOW:
            return followToggle (state,action,false);
        case SET_USERS: {
            return {
                ...state,
                users: [...state.users, ...action.users]
            }
        }
        case SET_CURRENT_PAGE:
        case SET_TOTAL_COUNT:
        case SET_COUNT_USERS:
        case UPDATE_USERS:
        case IS_LOADING:
        case IS_LOADING_SEARCH:
            return {...state, ...action.payload};
        case SET_SEARCH_USERS: {
            return {
                ...state,
                searchUsers: {
                    ...state.searchUsers,
                    users: [...action.users]
                }
            }
        }
        case SET_SEARCH_USERS_NAME:
        case RESET_SEARCH_USERS_NAME: {
            return {
                ...state,
                searchUsers: {
                    ...state.searchUsers, ...action.payload
                }
            }
        }
        case DISABLE: {
            return {
                ...state,
                toggleDisable: action.flag ? [...state.toggleDisable, action.id] : state.toggleDisable.filter(id => id !== action.id)
            }
        }
        default:
            return state;
    }
};

export const setFollow = (userId) => ({type: FOLLOW, userId});
export const setUnfollow = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, payload: {currentPage}});
export const setTotalCount = (totalCount) => ({type: SET_TOTAL_COUNT, payload: {totalCount}});
export const setCountUsers = (count) => ({type: SET_COUNT_USERS, payload: {count}});
export const setSearchUsersName = (name) => ({type: SET_SEARCH_USERS_NAME, payload:{name}});
export const setSearchUsers = (users) => ({type: SET_SEARCH_USERS, users});
export const resetSearchUsersName = () => ({type: RESET_SEARCH_USERS_NAME,payload:{name: '', users: []}});
export const updateUsers = () => ({type: UPDATE_USERS,payload:{users: [], currentPage: 1}});
export const isLoading = (isLoading) => ({type: IS_LOADING,payload: {isLoading}});
export const isLoadingSearch = (isLoadingSearch) => ({type: IS_LOADING_SEARCH,payload: {isLoadingSearch}});
export const isDisable = (id,flag) => ({type: DISABLE,id,flag});

const followUnfollowFlow = async (dispatch,id,apiMethod,AC) => {
    dispatch(isDisable(id,true));
    try{
        let res = await apiMethod(id);
        if(res.data.resultCode === 0){
            dispatch(AC(id));
            dispatch(isDisable(id,false))
        }
    }
    catch (e) {
        console.log(e.message)
    }
};

export const follow = (id) => (dispatch) => {
    followUnfollowFlow(dispatch,id,API.follow.bind(API),setFollow);
};

export const unfollow = (id) => (dispatch) => {
    followUnfollowFlow(dispatch,id,API.unfollow.bind(API),setUnfollow);
};

export const getUsers = (page,count) => async (dispatch) => {
    dispatch(isLoading(true));
    try {
        let res = await API.getUsers(page,count);
        dispatch(setUsers([...res.data.items]));
        dispatch(setTotalCount(res.data.totalCount));
        dispatch(isLoading(false));
    }
    catch (e) {
        console.log(e.message)
    }
};

export const getUsersSearch = (str,count) => async (dispatch) => {
    dispatch(isLoadingSearch(true));
    dispatch(setSearchUsersName(str));
    try {
        let res = await API.getSearchUsers(str,count);
        dispatch(setSearchUsers(res.data.items));
        dispatch(isLoadingSearch(false));
    }
    catch (e) {
        console.log(e.message)
    }
};

export default usersReducer;