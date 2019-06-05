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
import {getUserInfoAuth} from './../DataBLL/authReducer'
import {connect} from "react-redux";
import styled from './App.module.css';

//Основной файл сборки приложения
//Компонент App
class App extends React.Component {

    componentDidMount() {
        this.props.getUserInfoAuth()
    }

    render() {
        const {isAuth} = this.props;

        // if(!isAuth) {
        //    // return  <Redirect to='/login' />;
        //    return  <Login />;
        // }

        return (
            <div className={styled["app-wrapper"]}>
                <Header/>
                <Nav/>
                <div className={styled["app-wrapper-content"]}>
                    {/*Компонент роутинг-обертка, указывающий путь и ссылку до компонента приложения*/}
                    <Switch>

                        {/*<Route path={['/', '/profile']} render={(isAuth) => {*/}
                        {/*if (isAuth) {*/}
                        {/*return <Redirect to='/profile'/>*/}
                        {/*} else {*/}
                        {/*return <Redirect to='/login'/>*/}
                        {/*}*/}
                        {/*}}/>*/}

                        {!isAuth && <Route exact path={['/','/profile']} render={() => <Redirect to='/login'/>}/>}
                        <Route exact path='/' render={() => <Redirect to='/profile'/>}/>
                        <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                        <Route exact path='/profile/:userId?' render={() => <ContentContainer/>}/>
                        <Route path='/news' component={News}/>
                        <Route path='/music' component={Music}/>
                        <Route path='/users' render={() => <UsersContainer/>}/>
                        <Route path='/settings' component={Settings}/>
                        <Route path='/login' render={() => <Login/>}/>
                    </Switch>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps,{getUserInfoAuth})(App);