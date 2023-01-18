import React, { Component } from 'react';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';

class QUiz extends Component {
    render() {
        const { pseudo } = this.props.userdata
        return (
            <div>
                <h2>Joueur : {pseudo}</h2>
                <Levels />
                <ProgressBar />
                <h2>Notre quiz question</h2>
                <p className="answerOptions">Question 1</p>
                <p className="answerOptions">Question 2</p>
                <p className="answerOptions">Question 3</p>
                <p className="answerOptions">Question 4</p>
                <button className="btnSubmit">Suivant</button>
            </div>
        )
    }
}

export default QUiz;