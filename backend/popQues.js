const axios = require('axios').default;

const topics = [
    "linux",
    "devops",
    "bash",
    "docker"
]

function filter_incoming_data(data) {
    return {
        question: data.question,
        optionA: data.answers.answer_a,
        optionB: data.answers.answer_b,
        optionC: data.answers.answer_c,
        optionD: data.answers.answer_d,
        answerA: data.correct_answers.answer_a_correct === 'true',
        answerB: data.correct_answers.answer_b_correct === 'true',
        answerC: data.correct_answers.answer_c_correct === 'true',
        answerD: data.correct_answers.answer_d_correct === 'true',
        topic: data.category.toLowerCase()
    }
}

function create_ques(topic, number) {
    axios.get(
        "https://quizapi.io/api/v1/questions",
        {
            params: {
                apiKey: "opMGtSY2Yz2Iumcp87gYE5XurjvAgM6H82Sy1bHF",
                category: topic,
                limit: number
            }
        }
    ).then(res => {
        for (let data of res.data) {
            axios.post(
                "http://localhost:8080/createQues",
                filter_incoming_data(data),
                {
                    params: {
                        Token: "rakUPSTybdUdIRERcwpGvpzPMvqMVoPL",
                        Username: "abh799@gmail.com"
                    }
                }
            ).then(res => console.log(res.data))
                .catch(err => console.log(err))
        }
    }).catch(err => console.log(err))
}

for (let topic of topics) {
    create_ques(topic, 5)
}

