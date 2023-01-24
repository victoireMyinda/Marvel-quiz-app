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
        idQuestion: 0
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

    render() {
        //const { pseudo } = this.props.userdata
        const displayOptions = this.state.options.map((option, index) => {
            return (
                <p key={index} className="answerOptions">{option}</p>
            )
        })
        return (
            <div>
                {/*   <h2>Joueur : {pseudo}</h2> */}
                <Levels />
                <ProgressBar />
                <h2>{this.state.question} </h2>
                {displayOptions}
                <button className="btnSubmit">Suivant</button>
            </div>
        )
    }
}

export default QUiz;