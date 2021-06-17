import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './components/User/App';
import Navbar from './components/Navbar';
import Tutor from './components/Tutor'

if (!localStorage.getItem('user')) {
    var user = {
        username: '',
        isLoggedIn: false,
        isTutor: false
    };

    localStorage.setItem('user', JSON.stringify(user));
}

user = JSON.parse(localStorage.getItem("user"));

if (user.isLoggedIn === false) {
    console.log("first")
    ReactDOM.render(<Navbar />, document.getElementById('root'));
} else if (user.isTutor === false) {
    console.log("second")
    ReactDOM.render(<App />, document.getElementById('root'));
} else {
    ReactDOM.render(<Tutor />, document.getElementById('root'))
}

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
