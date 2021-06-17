import React, { Component } from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Signup from './Signup';
import Dashboard from './User/Dashboard';
import Login from './Login';

import './Navbar.css'

class Navbar extends Component {
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
                        <li><Link to={'/Signup'}>SignUp</Link></li>
                        <li><Link to={'/Login'}>Login</Link></li>
                      </ul>
                      </div>
                    </div>
                  </nav>
                  <Switch>
                    <Route exact path='/' component={Dashboard} />
                    <Route exact path='/Signup' component={Signup} />
                    <Route exact path='/Login' component={Login} />
                  </Switch>
                </div>
              </Router>
            </div>
          );
    }
}

export default Navbar