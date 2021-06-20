import React, {Component} from "react";
import SignUpLogIn from "./SignUpLogIn";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Quiz from "./Quiz";

class App extends Component {

    setUsernameToken = (username, token) => {
        localStorage.setItem('Username', username)
        localStorage.setItem('Token', token)
        setTimeout(() => window.location.pathname = "/quiz", 500)
    }

    checkSession() {
        if (window.location.pathname !== "/login") {
            if (localStorage.getItem("Username") === null || localStorage.getItem("Token") === null ) {
                window.location = "http://localhost:3000/login"
            } else if (window.location.pathname !== "/quiz") {
                window.location.href = "/quiz"
            }
        } else if (window.location.pathname !== "/login" && window.location.pathname !== "/quiz") {
            window.location = "http://localhost:3000/login"
        } else {
            if (localStorage.getItem("Username") !== null && localStorage.getItem("Token") !== null ) {
                window.location = "http://localhost:3000/quiz"
            }
        }
    }

    render() {
        return (
            <Router>
                <Switch>
                    {this.checkSession()}
                    <Route path={"/login"}>

                        <SignUpLogIn onAuth={this.setUsernameToken}/>
                    </Route>
                    <Route path={"/quiz"}>
                        {this.checkSession()}
                        <Quiz />
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default App