import React, {Component} from 'react';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';

class App extends Component {
    render() {
        return (
            <div>
                <h1>Welcome! <b>{JSON.parse(localStorage.getItem('user')).username.toUpperCase()}</b></h1>
            </div>
        );
    }
}

export default App;
