import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './Components/Autenticacao/Login';
import { isAuthenticated } from './Services/AuthService';
import * as serviceWorker from './serviceWorker';

if (isAuthenticated()){
    ReactDOM.render(<App />, document.getElementById('root'));
} else {
    ReactDOM.render(<Login />, document.getElementById('root'));
}
    





// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
