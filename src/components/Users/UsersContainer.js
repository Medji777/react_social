import React from 'react';
import {connect} from "react-redux";
import API from "../../DAL/api";
import {UsersSelector} from "../../DataBLL/selectors";
import Users from "./Users";
import {
    setCurrentPage,
    follow,
    setUsers,
    setTotalCount,
    setCountUsers,
    unfollow,
    updateUsers,
    setSearchUsers,
    setSearchUsersName,
    resetSearchUsersName
} from "../../DataBLL/usersReducer";

class UsersContainer extends React.Component {

    state = {
        isLoading: false,
        isLoadingSearch: false
    };

    getUsersMore = () => {
        this.setState({isLoading: !this.state.isLoading});
        this.setUsersMore();
    };

    setUsersMore = () => {
        let {currentPage, setCurrentPage, count} = this.props;
        setCurrentPage(++currentPage);
        this.getFetchData(currentPage, count);
    };

    getStartUsers = () => {
        let {currentPage, updateUsers} = this.props;
        this.setState({isLoading: !this.state.isLoading});
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
        this.setState({isLoading: !this.state.isLoading});
        this.getFetchData(currentPage, count);
    };

    getFetchData = (page, count = 10) => {
        API.getUsers(page,count)
            .then(res => {
                this.props.setUsers([...res.data.items]);
                this.props.setTotalCount(res.data.totalCount);
                this.setState({isLoading: false});
            })
            .catch(e => console.log(e.message))
    };

    setUserName = (e) => {
        let str = e.target.value;
        (str.length >= 1) ? this.getSearchUsers(str) : this.props.resetSearchUsersName();
    };

    getSearchUsers = (str, count = 100) => {
        this.setState({isLoadingSearch: true});
        this.props.setSearchUsersName(str);
        API.getSearchUsers(str,count)
            .then(res => {
                this.props.setSearchUsers(res.data.items);
                this.setState({isLoadingSearch: false});
            })
            .catch(e => console.log(e.message))
    };

    componentDidMount() {
        this.getStartUsers();
    }

    //В данном случе проверяем, изменился ли count. Если изменился, то выполняем запрос новой ранжировки пользователей
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.count !== prevProps.count) {
            this.getUpdateUsers();
        }
    }

    componentWillUnmount() {
        const {updateUsers,resetSearchUsersName} = this.props;
        updateUsers(); // users: [] , currentPage: 1
        resetSearchUsersName();
    }

    render() {
        const {users, follow, unfollow, totalCount, searchUsersInfo} = this.props;
        return (
            <Users users={users}
                   follow={follow}
                   unfollow={unfollow}
                   totalCount={totalCount}
                   searchUsersInfo={searchUsersInfo}
                   isLoading={this.state.isLoading}
                   isLoadingSearch={this.state.isLoadingSearch}
                   setUserName={this.setUserName}
                   setCount={this.setCount}
                   getUsersMore={this.getUsersMore}
            />
        )
    }
}

const mapStateToProps = (state) => {
    let {users, currentPage, count, totalCount, searchUsers} = state.usersPage;
    return {
        users,
        currentPage,
        count,
        totalCount,
        searchUsersInfo: UsersSelector(searchUsers)
    }
};

export default connect(mapStateToProps, {
    //AC - Action Creators (dispatch - обрабатывется автоматически)
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalCount,
    setCountUsers,
    setSearchUsers,
    setSearchUsersName,
    resetSearchUsersName,
    updateUsers
})(UsersContainer);
