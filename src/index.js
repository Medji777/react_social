import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import store from './DataBLL/reduxStore';
//import {Provider} from './StoreContext';
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import './index.css';


//const reRenderPage = (store) => {
    ReactDOM.render(
        <Provider store={store}>
            {/*Инициализирующий компонент, для создания роутинга в приложении*/}
            <BrowserRouter>
                <App title="React_Social_Network"/>
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