import React,{lazy,Suspense} from 'react';
import ReactDOM from 'react-dom';
//import App from './components/App';
import store from './DataBLL/reduxStore';
//import {Provider} from './StoreContext';
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import Loading from "./components/common/Loading/Loading";
//import WrapperApp from "./components/common/WrapperApp";
import './index.css';

const App = lazy(()=>import ("./components/App"));

//const reRenderPage = (store) => {
    ReactDOM.render(
        <Provider store={store}>
            {/*Инициализирующий компонент, для создания роутинга в приложении*/}
            <BrowserRouter>
                {/*<WrapperApp>*/}
                    <Suspense fallback={<Loading wrap={{display: 'flex', alignItems: 'center', minHeight: '100vh'}}/>}>
                        <App title="React_Social_Network"/>
                    </Suspense>
                {/*</WrapperApp>*/}
            </BrowserRouter>
        </Provider>
        ,document.querySelector('#root'));
//};

//reRenderPage(store);

//Специальный шаблон проектирования observer - наблюдатель
//subscribe(observer) - метод store (пописчик - наблюдатель), запускающий отрисовку нового состояния state
// store.subscribe(()=>{
//     reRenderPage(store);
// });