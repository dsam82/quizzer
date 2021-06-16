import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Login from "./Login.js"

class Signup extends Component {

    constructor() {
        super();
        this.state = {
          username: "",
          password: "",
          email: "",
          message: "",
          viewMsg: false,
        }
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    onSubmit = event => {
        event.preventDefault();

        var data = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        }

        fetch('http://localhost:8080/signup', {
            method: 'POST',
            body: JSON.stringify(data),
        }).then(response => response.json().then(data => ({ status: response.status, data: data }))
        .then(res => {
            console.log("signup ", response.status)

            if (res.status === 200) {
                this.setState({ message: "Successfully Registered!"});
                this.setState({ viewMsg: true });
            } else if (res.status === 201) {
                this.setState({ message: "Username already exists. Please use another"});
                this.setState({ viewMsg: true });
            } else if (res.status === 202) {
                this.setState({ message: "Email ID already exists. Please use another"});
                this.setState({ viewMsg: true });
            }
        }));
    }

    render() {
        return (
            <div>
                <Router>
                    <div className="App">
                    <h1>Signup</h1>
                    {this.state.viewMsg &&
                        <div>
                            <h4>{this.state.message}</h4>
                        </div>
                    }
                    <form onSubmit={this.onSubmit}>
                        {/* <label>first name</label>
                        <input type="text" required placeholder="First name"
                        value={username} onChange={this.onChange}/>
                        <label>last name</label>
                        <input type="text" required placeholder="Last Name"
                        value={username} onChange={this.onChange}/> */}
                        <div className="form-group">
                            <label>username</label>
                            <input type="text" required placeholder="Username" name="username"
                            value={this.state.username} onChange={this.onChange}/>
                        </div>
                        <div className="form-group">
                            <label>password</label>
                            <input type="password" required placeholder="Password" name="password"
                            value={this.state.password} onChange={this.onChange}/>
                        </div>
                        <div className="form-group">
                            <label>email</label>
                            <input type="email" required placeholder="Email" name="email"
                            value={this.state.email} onChange={this.onChange}/>
                        </div>
                        <button type="submit">Register</button>
                    </form>
                        <p>Registered Already? <Link to={'/Login'}>Login</Link></p>
                        <Switch>

                            <Route exact path='/Login' component={Login} />
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default Signup