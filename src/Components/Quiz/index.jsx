import React, { Component } from 'react';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';
import { QuizMarvel } from '../quizMarvel';

class QUiz extends Component {

    state = {
        levelsName: ["debutant", "moyen", "expert"],
        quizLevel: 0,
        maxQuestions: 10,
        storedQuestions: [],
        question: null,
        options: [],
        idQuestion: 0,
        btnDisabled: true,
        userAnswer: null
    }

    loadQuestions = quizz => {
        const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];
        if (fetchedArrayQuiz.length >= this.state.maxQuestions) {

            const newArray = fetchedArrayQuiz.map(({ answer, ...keepRest }) => keepRest);
            this.setState({ storedQuestions: newArray })
        }
    }


    componentDidMount() {
        this.loadQuestions(this.state.levelsName[this.state.quizLevel])
    }

    componentDidUpdate(prevPropos, prevState) {
        if (this.state.storedQuestions !== prevState.storedQuestions) {
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options
            })
        }
    }

    submitAnswer = selectedAnswer => {
        this.setState({
            btnDisabled: false,
            userAnswer: selectedAnswer
        })
    }

    render() {
        //const { pseudo } = this.props.userdata
        const displayOptions = this.state.options.map((option, index) => {
            return (
                <p key={index}
                    className={`answerOptions ${this.state.userAnswer === option ? "selected" : null}`}
                    onClick={() => this.submitAnswer(option)}>
                    {option}
                </p>
            )
        })
        return (
            <div>
                {/*   <h2>Joueur : {pseudo}</h2> */}
                <Levels />
                <ProgressBar />
                <h2>{this.state.question} </h2>
                {displayOptions}
                <button className="btnSubmit" disabled={this.state.btnDisabled}>Suivant</button>
            </div>
        )
    }
}

export default QUiz;