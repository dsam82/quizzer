import React, { Component } from 'react';
/* This is the login component */
class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            submitted: false
        }
        console.log(localStorage);
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        var data = {
            username: this.state.username,
            password: this.state.password
        }

        fetch("http://localhost:8080/signin/", {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response => {
            console.log(response.status);
            if (response.ok) {
                response.json().then(json => {
                    console.log("hello", json)
                    var user = {
                        username: json.username,
                        isloggedin: true
                    };
                    localStorage.setItem('user', JSON.stringify(user));
                    console.log(JSON.parse(localStorage.getItem('user')));
                    window.location.reload();
                });
            }
            else {
                this.setState({ submitted: true });
            }
        });
    }

    render() {

        if (JSON.parse(localStorage.getItem('user')).isLoggedIn) return (
            <h1 align="center">You have successfully logged in</h1>
        )

        return (
            <div className="App">
                    <h1>Login</h1>

                    {this.state.submitted &&
                        <div className="error">Login Failed: Check Your Credentials</div>}

                    <form name="LogIn" onSubmit={this.onSubmit}>

                            <label>Username</label>
                            <input type="text" required name="username"
                            value={this.state.username} onChange={this.onChange} />


                            <label>Password</label>
                            <input type="password" required name="password"
                            value={this.state.password} onChange={this.onChange} />

                        <button type="submit">Sign In</button>
                    </form>

            </div>
        )
    }

}

export default Login