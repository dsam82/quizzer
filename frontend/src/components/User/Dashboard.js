import React, {Component} from "react";

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            topics: [],
            username: '',
            isLoggedIn: false
        };
    }

    componentDidMount() {
        var user = JSON.parse(localStorage.getItem("user"));

        console.log(user, "ubt");
        this.setState({username: user.username});
        this.setState({isLoggedIn: user.isLoggedIn});

        if (this.state.username !== "") {
            fetch('http://127.0.0.1/topics/')
            .then(response => response.json())
            .then(topics => this.setState({topics: topics}));
        }

        console.log(this.state.topics);
    }

    render() {
        return(
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome</h1>
                </header>
                {JSON.parse(localStorage.getItem("user")).isLoggedIn && (
                    <div className="container">
                        <h3>Hey, <b>{this.state.username}</b> Choose a topic to give quiz:</h3>
                    <ul>
                        {
                            this.state.topics.map(function(item,key) {
                                return (
                                    <li>item.topic</li>
                                );
                        })}
                    </ul>
                    </div>
                )}
                {!this.state.isLoggedIn && (
                    <h2>Create an account or Log In!</h2>
                )}
            </div>
        );
    }
}

export default Dashboard;