import React, {Component} from "react";
import SignUpLogIn from "./SignUpLogIn";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Quiz from "./Quiz";
import Ques from "./Ques";

class App extends Component {

    setUsernameToken = (username, token) => {
        localStorage.setItem('Username', username)
        localStorage.setItem('Token', token)
        setTimeout(() => window.location.pathname = "/quiz", 500)
    }

    checkSession() {
        if (localStorage.getItem("Username") === null || localStorage.getItem("Token") === null ) {
            if(window.location.pathname !== "/login") {
                window.location = "http://localhost:3000/login"
            }
        } else if (window.location.pathname === "/login") {
            window.location = "http://localhost:3000/quiz"
        } else if (window.location.pathname !== "/quiz" && window.location.pathname !== "/admin") {
            window.location = "http://localhost:3000/quiz"
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
                        <Quiz />
                    </Route>
                    <Route path={"/admin"}>
                        <Ques />
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default App