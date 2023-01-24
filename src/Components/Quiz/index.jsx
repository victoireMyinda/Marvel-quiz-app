import React, { Component } from 'react';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';
import { QuizMarvel } from '../quizMarvel';
import QuizOver from '../quizOver';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'

toast.configure();
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
        userAnswer: null,
        score: 0,
        quizEnd: false
    }


    storedDataRef = React.createRef()
    loadQuestions = quizz => {
        const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];
        if (fetchedArrayQuiz.length >= this.state.maxQuestions) {
            this.storedDataRef.current = fetchedArrayQuiz

            const newArray = fetchedArrayQuiz.map(({ answer, ...keepRest }) => keepRest);
            this.setState({ storedQuestions: newArray })
        }
    }

    showToastMsg = pseudo => {
        if (!this.state.showWelcomeMsg) {

            this.setState({ showWelcomeMsg: true })

            toast.warn(`Bienvenue ${pseudo}, et bonne chance!`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                bodyClassName: "toastify-color-welcome"
            });
        }
    }

    componentDidMount() {
        this.loadQuestions(this.state.levelsName[this.state.quizLevel])
    }

    nextQuestion = () => {
        if (this.state.idQuestion === this.state.maxQuestions - 1) {

            this.setState({ quizEnd: true })

        } else {

            this.setState(prevState => ({ idQuestion: prevState.idQuestion + 1 }))
        }

        const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;
        if (this.state.userAnswer === goodAnswer) {

            this.setState(prevState => ({ score: prevState.score + 1 }))

            toast.success('Bravo +1', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                bodyClassName: "toastify-color"
            });
        } else {
            toast.error('Raté 0', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                bodyClassName: "toastify-color"
            });
        }
    }

    componentDidUpdate(prevPropos, prevState) {
        if (this.state.storedQuestions !== prevState.storedQuestions) {
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options
            })
        }

        if (this.state.idQuestion !== prevState.idQuestion) {
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options,
                userAnswer: null,
                btnDisabled: true
            })
        }
    }

    submitAnswer = selectedAnswer => {
        this.setState({
            btnDisabled: false,
            userAnswer: selectedAnswer
        })
    }

    gameOver = () => {
        this.setState({
            quizEnd: true
        })
    }

    render() {
        // const { pseudo } = this.props.userdata
        const displayOptions = this.state.options.map((option, index) => {
            return (
                <p key={index}
                    className={`answerOptions ${this.state.userAnswer === option ? "selected" : null}`}
                    onClick={() => this.submitAnswer(option)}>
                    {option}
                </p>
            )
        })
        return this.state.quizEnd ? (
            <QuizOver />
        ) : (
            <>
                {/* <h2>Joueur : {pseudo}</h2> */}
                <Levels />
                <ProgressBar />
                <h2>{this.state.question} </h2>
                {displayOptions}
                <button className="btnSubmit"
                    disabled={this.state.btnDisabled}
                    onClick={this.nextQuestion}>
                    Suivant
                </button>
            </>
        )
    }
}

export default QUiz;