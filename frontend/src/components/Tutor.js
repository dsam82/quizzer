import React, {Component} from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Dashboard from "./User/Dashboard";

class Tutor extends Component {
    Signout = () => {
        var user = {
            username : '',
            isadmin : false,
            isLoggedIn : false
        };

        localStorage.setItem('user', JSON.stringify(user));
        console.log(user);
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
                        <Link className="navbar-brand" to={'/'}>Quiz App</Link>

                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNav">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        </div>
                        <div className="collapse-navbar-collapse" id="myNav">
                        <ul className="nav navbar-nav">
                            <li><Link to={'/'}>Home</Link></li>
                            {/* <li><Link to={'/CreateQuestion'}>Create Quiz</Link></li> */}
                            {/* <li><Link to={'/DeleteQuiz'}>Delete Quiz</Link></li> */}
                            {/* <li><Link to={'/PlayQuiz'}>Play Quiz</Link></li> */}
                        </ul>

                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <b>{JSON.parse(localStorage.getItem('user')).username.toUpperCase()}</b>
                                <button className="btn btn-danger" onClick={this.SignOut}>Sign Out</button>
                            </li>
                        </ul>
                        </div>
                    </div>
                    </nav>
                    <Switch>
                        <Route exact path='/' component={Dashboard} />
                        {/* <Route exact path ='/CreateQuestion' component={CreateQuestion}/> */}
                        {/* <Route exact path ='/DeleteQuiz' component={DeleteQuiz}/> */}
                        {/* <Route exact path ='/PlayQuiz' component={PlayQuiz}/> */}
                    </Switch>
                </div>
                </Router>
            </div>
        )
    }
}

export default Tutor;