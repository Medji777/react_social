import React from 'react';
//Сперциальные компоненты роутинга
import {Route, Redirect, Switch} from 'react-router-dom';
import Header from "./Header/Header";
import Nav from "./Nav/Nav";
import News from "./News/News";
import Music from "./Music/Music";
import Settings from "./Settings/Settings";
import DialogsContainer from "./Dialogs/DialogsContainer";
import UsersContainer from "./Users/UsersContainer";
import ContentContainer from "./Content/ContentContainer";
import './../assets/fonts/fontsConfig';
import Login from "./Login/Login";
import {getUserInfoAuth} from './../DataBLL/authReducer';
import {getUserProfileInfo} from './../DataBLL/profileReducer';
import {connect} from "react-redux";
import styled from './App.module.css';
import NotFound from "./NotFound/NotFound";
import NotAuthorized from "./NotFound/NotAuthorized";


//Основной файл сборки приложения
//Компонент App
class App extends React.Component {

    getCurrentId = () => {
            if(!this.props.userId){
                return this.props.initialId
            } else {
                return this.props.userId
            }
    };

    componentDidMount() {
        this.props.getUserInfoAuth();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.isAuth !== prevProps.isAuth){
            this.props.getUserProfileInfo(this.getCurrentId(),this.props.isAuth);
        }
    }

    render() {
        const {isAuth, isChecked} = this.props;

        if (!isChecked) {
            return false
        }

        // To use a non-anonymous user
        // if(!isAuth) {
        //     return  <Login />;
        // }

        return (
            <div className={styled["app-wrapper"]}>
                <Header/>
                <Nav/>
                <div className={styled["app-wrapper-content"]}>
                    {/*Компонент роутинг-обертка, указывающий путь и ссылку до компонента приложения*/}
                        <Switch>
                            {!isAuth && <Route exact path={['/','/profile']} render={() => <Redirect to='/login'/>}/>}
                            <Route exact path='/' render={() => <Redirect to='/profile'/>}/>
                            <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                            <Route exact path='/profile/:userId?' render={() => <ContentContainer/>}/>
                            <Route exact path='/news' component={News}/>
                            <Route exact path='/music' component={Music}/>
                            <Route exact path='/users' render={() => <UsersContainer/>}/>
                            <Route exact path='/settings' component={Settings}/>
                            <Route exact path='/login' render={() => <Login/>}/>
                            <Route exact path='/not-auth' render={() => <NotAuthorized/>}/>
                            <Route render={() => <NotFound/>}/>
                        </Switch>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isChecked: state.auth.isChecked,
    isAuth: state.auth.isAuth,
    userId: state.auth.userInfo.userId,
    initialId: state.login.currentId
});

export default connect(mapStateToProps,{getUserInfoAuth,getUserProfileInfo})(App);