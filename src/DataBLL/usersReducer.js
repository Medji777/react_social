import ConstantType from "./ConstantType";
import API from "../DAL/api";

const {FOLLOW,UNFOLLOW,SET_USERS,SET_CURRENT_PAGE,SET_TOTAL_COUNT,UPDATE_USERS,SET_SEARCH_USERS,SET_SEARCH_USERS_NAME,RESET_SEARCH_USERS_NAME,SET_COUNT_USERS} = ConstantType;

const initialState = {
    users: [],
    currentPage: 1,
    count: 10,
    totalCount: null,
    isLoading: false,
    searchUsers: {
        name: '',
        users: []
    }
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    return (u.id === action.userId) ? {...u, followed: true} : u
                })
            };
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    return (u.id === action.userId) ? {...u, followed: false} : u
                })
            };
        case SET_USERS: {
            return {
                ...state,
                users: [...state.users, ...action.users]
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case SET_TOTAL_COUNT: {
            return {
                ...state,
                totalCount: action.totalCount
            }
        }
        case SET_COUNT_USERS: {
            return {
                ...state,
                count: action.count
            }
        }
        case UPDATE_USERS: {
            return {
                ...state,
                users: [],
                currentPage: 1
            }
        }
        case SET_SEARCH_USERS: {
            return {
                ...state,
                searchUsers: {
                    ...state.searchUsers,
                    users: [...action.users]
                }
            }
        }
        case SET_SEARCH_USERS_NAME: {
            return {
                ...state,
                searchUsers: {
                    ...state.searchUsers,
                    name: action.name
                }
            }
        }
        case RESET_SEARCH_USERS_NAME: {
            return {
                ...state,
                searchUsers: {
                    ...state.searchUsers,
                    name: '',
                    users: []
                }
            }
        }
        default:
            return state;
    }
};

export const setFollow = (userId) => ({type: FOLLOW, userId});
export const setUnfollow = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalCount = (totalCount) => ({type: SET_TOTAL_COUNT, totalCount});
export const setCountUsers = (count) => ({type: SET_COUNT_USERS, count});
export const setSearchUsersName = (name) => ({type: SET_SEARCH_USERS_NAME, name});
export const setSearchUsers = (users) => ({type: SET_SEARCH_USERS, users});
export const resetSearchUsersName = () => ({type: RESET_SEARCH_USERS_NAME});
export const updateUsers = () => ({type: UPDATE_USERS});

export const follow = (id) => (dispatch) => {
    API.follow(id)
        .then(res => {
            if(res.data.resultCode === 0){
                dispatch(setFollow(id))
            }
        })
        .catch(e => console.log(e.message))
};

export const unfollow = (id) => (dispatch) => {
    API.unfollow(id)
        .then(res => {
            if(res.data.resultCode === 0){
                dispatch(setUnfollow(id))
            }
        })
        .catch(e => console.log(e.message))
};

export default usersReducer;