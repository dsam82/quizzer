import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import Login from '../Login';
import Dashboard from './Dashboard';
import './App.css';

class App extends Component {

    Signout = () => {
        var user = {
            username: '',
            isLoggedIn: false,
            isTutor: false
        }

        localStorage.setItem('user', JSON.stringify(user))
        window.location.reload();
    }

    render() {
        return (
            <div>
              <Router>
                <div>
                  <nav id="menu-bar" className="navbar navbar-default">
                    <div className="container-fluid">
                      <div className="navbar-header">
                        <Link className="navbar-brand" to={'/'}>Quizzer</Link>

                      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNav">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                      </button>
                      </div>
                      <div className="collapse-navbar-collapse" id="myNav">
                      <ul className="nav navbar-nav">
                        <li className="active"><Link to={'/'}>Dashboard</Link></li>
                      </ul>
                      <ul className="nav navbar-nav navbar-right">
                        <li>
                            <b>{JSON.parse(localStorage.getItem('user')).username}</b>
                            <button className="btn btn-danger" onClick={this.Signout}> Signout </button>
                        </li>
                      </ul>
                      </div>
                    </div>
                  </nav>
                  <Switch>
                    <Route exact path='/' component={Dashboard} />
                  </Switch>
                </div>
              </Router>
            </div>
        );
    }
}

export default App;
