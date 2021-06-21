import React, {Component} from "react";
import axios from "axios";


class Ques extends Component {
    state = { question: '', optionA: '', optionB: '', optionC: '', optionD: '', answer_option: '', topic: '', submit_text: 'Submit'}

    sendQuestion = (event) => {
        event.preventDefault()
        let answer = [];

        for (let option of [this.state.optionA, this.state.optionB, this.state.optionC, this.state.optionD]) {
            answer.push(option === this.state.answer_option)
        }

        axios.post(
            "http://localhost:8080/createQues",
            {
                question: this.state.question,
                optionA: this.state.optionA,
                optionB: this.state.optionB,
                optionC: this.state.optionC,
                optionD: this.state.optionD,
                answerA: answer[0],
                answerB: answer[1],
                answerC: answer[2],
                answerD: answer[3],
                topic: this.state.topic.toLowerCase()
            },
            {
                params: {
                    Username: localStorage.getItem("Username"),
                    Token: localStorage.getItem("Token")
                }
            }
        ).then( res => {
            if (res.status === 201) {
                this.setState({ submit_text: 'You are not admin!' })
                setTimeout(() => this.setState({ submit_text: 'Submit' }), 1500)
            } else if (res.status === 200) {
                this.setState({ submit_text: 'Successfully Created!' })
                this.setState({ question: '', optionA: '', optionB: '', optionC: '', optionD: '', answer_option: '', topic: '' })
                setTimeout(() => this.setState({ submit_text: 'Submit' }), 1500)
            } else {
                localStorage.removeItem("Username")
                localStorage.removeItem("Token")
                window.location.href = "/login"
            }
        }).catch( err => {
            console.log(err)
            this.setState({ submit_text: 'Error Occured!' })
            setTimeout(() => this.setState({ submit_text: 'Submit' }), 1500)
        })
    }

    render() {
        return (
            <div>
                <link rel={"stylesheet"} href={"./ques.css"} type={"text/css"} />
                <form id="js-form" onSubmit={event => this.sendQuestion(event)}>
                    <div className="message">
                        <label htmlFor="textarea">Question:<br/></label>
                        <textarea cols="40"
                                  rows="8"
                                  name="textarea"
                                  id="textarea"
                                  value={this.state.question}
                                  onChange={event => this.setState({question: event.target.value})}/>
                    </div>
                    <div className="name">
                        <input type="text" name="name" placeholder="Option 1" value={this.state.optionA}
                               onChange={event => this.setState({optionA: event.target.value})}/>
                        <input type="text" name="surname" placeholder="Option 2" value={this.state.optionB}
                               onChange={event => this.setState({optionB: event.target.value})}/>
                        <input type="text" name="name" placeholder="Option 3" value={this.state.optionC}
                               onChange={event => this.setState({optionC: event.target.value})}/>
                        <input type="text" name="surname" placeholder="Option 4" value={this.state.optionD}
                               onChange={event => this.setState({optionD: event.target.value})}/>
                    </div>
                    <div className="dropdown">
                        <label htmlFor="select-choice">Correct Answer:</label>
                        <select name="select-choice" id="select-choice"
                                onChange={event => this.setState({answer_option: event.target.value})}>
                            <option value={this.state.optionA}>{this.state.optionA}</option>
                            <option value={this.state.optionB}>{this.state.optionB}</option>
                            <option value={this.state.optionC}>{this.state.optionC}</option>
                            <option value={this.state.optionD}>{this.state.optionD}</option>
                        </select>
                    </div>
                    <div className="name">
                        <input type="mail" name="email" placeholder={"Topic"} value={this.state.topic}
                               onChange={event => this.setState({ topic: event.target.value })}/>
                    </div>
                    <div className="submit">
                        <input type="submit" value={this.state.submit_text}/>
                    </div>
                </form>
            </div>
        )
    }
}

export default Ques