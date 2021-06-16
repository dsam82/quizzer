import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Signup from './components/Signup';

if (!localStorage.getItem('user')) {
    var user = {
        username: '',
        isLoggedIn: false
    };

    localStorage.setItem('user', JSON.stringify(user));
}

user = JSON.parse(localStorage.getItem('user'))
console.log(user)
if (user.isLoggedIn === false) {
    ReactDOM.render(<Signup />, document.getElementById('root'));
} else {
    ReactDOM.render(<App />, document.getElementById('root'));
}

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
