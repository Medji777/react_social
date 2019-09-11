import React from 'react';
import {connect} from "react-redux";
import {
    getCount, getCurrentPageUsers, getIsAuth,
    getIsLoading, getIsLoadingSearch, getToggleDisable,
    getTotalCount, getUsersFromState,
    UsersSelector
} from "../../DataBLL/selectors";
import Users from "./Users";
import {
    setCurrentPage,
    follow,
    setCountUsers,
    unfollow,
    updateUsers,
    resetSearchUsersName,
    getUsers,
    getUsersSearch
} from "../../DataBLL/usersReducer";

class UsersContainer extends React.Component {

    getUsersMore = () => {
        this.setUsersMore();
    };

    setUsersMore = () => {
        let {currentPage, setCurrentPage, count} = this.props;
        setCurrentPage(++currentPage);
        this.getFetchData(currentPage, count);
    };

    getStartUsers = () => {
        let {currentPage, updateUsers} = this.props;
        updateUsers(); // users: [] , currentPage: 1
        this.getFetchData(currentPage);
    };

    setCount = (e) => {
        let {setCountUsers,updateUsers} = this.props;
        let num = +(e.target.value);
        updateUsers();
        //setState - асинхронный метод
        //this.setState({count: num});
        setCountUsers(num);
    };

    getUpdateUsers = () => {
        let {currentPage, count} = this.props;
        this.getFetchData(currentPage, count);
    };

    getFetchData = (page, count = 10) => {
        this.props.getUsers(page,count); // GET - thunk - запрос пользователей getUsers в usersReducer
    };

    setUserName = (e) => {
        let str = e.target.value;
        (str.length >= 1) ? this.getSearchUsers(str) : this.props.resetSearchUsersName();
    };

    getSearchUsers = (str, count = 100) => {
        this.props.getUsersSearch(str,count) // GET - thunk - запрос поиска пользователя getUsersSearch в usersReducer
    };

    getUsersMoreScroll = (e) => {
        const {clientHeight,scrollTop,scrollHeight} = e.currentTarget.document.documentElement;
        let scrollH = Math.max(scrollHeight); // высота блока с прокруткой
        let loadHeight = clientHeight + (clientHeight/2); // линия подгрузки

        if(scrollTop >= (scrollH - loadHeight)) {
            this.getUsersMore();
        }
    };

    removeUsersMoreScroll = () => {
        window.removeEventListener('scroll',this.getUsersMoreScroll);
    };

    addUsersMoreScroll = () => {
        window.addEventListener('scroll',this.getUsersMoreScroll);
    };

    componentDidMount() {
        this.getStartUsers();
        this.addUsersMoreScroll();
    }

    //В данном случе проверяем, изменился ли count. Если изменился, то выполняем запрос новой ранжировки пользователей
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.count !== prevProps.count) {
            this.getUpdateUsers();
            this.addUsersMoreScroll();
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps !== this.props
    }

    componentWillUnmount() {
        const {updateUsers,resetSearchUsersName} = this.props;
        updateUsers(); // users: [] , currentPage: 1
        resetSearchUsersName();
        this.removeUsersMoreScroll();
    }

    render() {
        return (
            <Users {...this.props} setUserName={this.setUserName} setCount={this.setCount} removeUsersMoreScroll={this.removeUsersMoreScroll}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: getUsersFromState(state),
        currentPage: getCurrentPageUsers(state),
        count: getCount(state),
        totalCount: getTotalCount(state),
        isLoading: getIsLoading(state),
        isLoadingSearch: getIsLoadingSearch(state),
        toggleDisable: getToggleDisable(state),
        isAuth: getIsAuth(state),
        searchUsersInfo: UsersSelector(state)
    }
};

export default connect(mapStateToProps, {
    //AC - Action Creators (dispatch - обрабатывется автоматически)
    follow,
    unfollow,
    setCurrentPage,
    setCountUsers,
    resetSearchUsersName,
    updateUsers,
    getUsers,
    getUsersSearch
})(UsersContainer);
