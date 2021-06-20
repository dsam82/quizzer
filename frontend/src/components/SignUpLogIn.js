import React, {Component} from "react";
import $ from 'jquery';
import axios from "axios";


class SignUpLogIn extends Component {

    state = { first_name: '', last_name: '', email: '', password: '', signup: 'Get Started', login: 'Log In' }

    signup_login = (event) => {
        if (event === "signup") {
            axios.post(
                "http://localhost:8080/signup",
                {
                    name: `${this.state.first_name} ${this.state.last_name}`,
                    username: `${this.state.email}`,
                    email: `${this.state.email}`,
                    password: `${this.state.password}`
                }
            ).then(res => {
                    if (res.status === 200) {
                        this.setState({signup: 'Signed Up!'})
                        this.props.onAuth(this.state.email, res.data)
                    } else {
                        if (res.status === 201 || res.status === 202) {
                            this.setState({signup: "User Exists"})
                            setTimeout(() => {
                                this.setState({signup: 'Get Started'})
                            }, 1500)
                        } else {
                            this.setState({signup: "Oops!, error occured try again"})
                            setTimeout(() => {
                                this.setState({signup: 'Get Started'})
                            }, 1500)
                        }
                    }
                }
            ).catch(err => console.log(err))
            this.setState({signup: 'Please Wait'})
        } else {
            axios.post(
                "http://localhost:8080/signin",
                {
                    username: `${this.state.email}`,
                    password: `${this.state.password}`
                }
            ).then(res => {
                    if (res.status === 200) {
                        this.setState({login: 'Logged In!'})
                        this.props.onAuth(this.state.email, res.data)
                    } else {
                        if (res.status === 201) {
                            this.setState({login: "Please Signup!"})
                            setTimeout(() => {
                                this.setState({login: 'Log In'})
                            }, 1500)
                        } else if (res.status === 202) {
                            this.setState({login: "Incorrect Password, try again"})
                            setTimeout(() => {
                                this.setState({login: 'Log In'})
                            }, 1500)
                        } else {
                            this.setState({login: "Oops!, error occured try again"})
                            setTimeout(() => {
                                this.setState({login: 'Log In'})
                            }, 1500)
                        }
                    }
                }
            ).catch(err => console.log(err))
            this.setState({login: 'Please Wait'})
        }
    }

    componentDidMount () {

        $('.form').find('input, textarea').on('keyup blur focus', function (e) {
            var $this = $(this),
                label = $this.prev('label');

            if (e.type === 'keyup') {
                if ($this.val() === '') {
                    label.removeClass('active highlight');
                } else {
                    label.addClass('active highlight');
                }
            } else if (e.type === 'blur') {
                if( $this.val() === '' ) {
                    label.removeClass('active highlight');
                } else {
                    label.removeClass('highlight');
                }
            } else if (e.type === 'focus') {

                if( $this.val() === '' ) {
                    label.removeClass('highlight');
                }
                else if( $this.val() !== '' ) {
                    label.addClass('highlight');
                }
            }

        });

        $('.tab a').on('click', function (e) {

            e.preventDefault();

            $(this).parent().addClass('active');
            $(this).parent().siblings().removeClass('active');

            var target = $(this).attr('href');

            $('.tab-content > div').not(target).hide();

            $(target).fadeIn(600);

        });
    }

    render() {

        return (
                <div className={"form"}>
                    <link rel="stylesheet" type="text/css" href={'./SignUpLogin.css'} />
                    <ul className={"tab-group"}>
                        <li className={"tab active"}><a href={"#signup"}>Sign Up</a></li>
                        <li className="tab"><a href={"#login"}>Log In</a></li>
                    </ul>
                    <div className="tab-content">
                        <div id="signup">
                            <h1>Sign Up for Free</h1>
                            <form onSubmit={event => {
                                event.preventDefault()
                                this.signup_login("signup")
                            }
                            }>
                                <div className="top-row">
                                    <div className="field-wrap">
                                        <label>
                                            First Name<span className="req">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            autoComplete="off"
                                            value={ this.state.first_name }
                                            onChange={(event) => (this.setState({first_name: event.target.value}))}
                                        />
                                    </div>
                                    <div className="field-wrap">
                                        <label>
                                            Last Name<span className="req">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            autoComplete="off"
                                            value={ this.state.last_name }
                                            onChange={(event) => (this.setState({last_name: event.target.value}))}
                                        />
                                    </div>
                                </div>
                                <div className="field-wrap">
                                    <label>
                                        Email Address<span className="req">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        autoComplete="off"
                                        value={ this.state.email }
                                        onChange={(event) => (this.setState({email: event.target.value}))}
                                    />
                                </div>
                                <div className="field-wrap">
                                    <label>
                                        Set A Password<span className="req">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        required
                                        autoComplete="off"
                                        value={ this.state.password }
                                        onChange={(event) => (this.setState({password: event.target.value}))}
                                    />
                                </div>
                                <button type="submit" className="button button-block">{this.state.signup}</button>
                            </form>
                        </div>
                        <div id="login">
                            <h1>Welcome Back!</h1>
                            <form onSubmit={event => {
                                event.preventDefault()
                                this.signup_login("signin")
                            }}>
                                <div className="field-wrap">
                                    <label>
                                        Email Address<span className="req">*</span>
                                    </label>
                                    <input type="email"
                                           required
                                           autoComplete="off"
                                           value={ this.state.email }
                                           onChange={(event) => (this.setState({email: event.target.value}))}
                                    />
                                </div>
                                <div className="field-wrap">
                                    <label>
                                        Password<span className="req">*</span>
                                    </label>
                                    <input type="password"
                                           required
                                           autoComplete="off"
                                           value={ this.state.password }
                                           onChange={(event) => (this.setState({password: event.target.value}))}
                                    />
                                </div>
                                <p className="forgot"> <a href={"#forgot"}>Forgot Password?</a> </p>
                                <button className="button button-block" type="submit" >{this.state.login}</button>
                            </form>
                        </div>
                    </div>
                </div>
        );
    }
}

export default SignUpLogIn