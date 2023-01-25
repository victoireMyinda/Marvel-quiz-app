import React, { Fragment, useEffect, useState } from 'react';

const QuizOver = React.forwardRef((props, ref) => {

    const [asked, setAsked] = useState([])

    useEffect(() => {
        //console.log(asked)
        setAsked(ref.current)
    }, [ref])

    const questionAnswer = asked.map((question) => {
        return (
            <tr key={question.id}>
                <td>{question.question}</td>
                <td>{question.answer}</td>
                <td> <button className='btnInfo'> Infos</button></td>
            </tr>
        )
    })

    return (
        <Fragment>
            <div className="stepsBtnContainer">
                <p className="successMsg">Bravo, vous etes expert !</p>
                <button className="btnResult success">Niveau Suivant</button>
            </div>
            <div className="percentage">
                <div className="progressPercent"> reussite : 10%</div>
                <div className="progressPercent"> note : 10/10</div>
            </div>

            <hr />
            <p>Les reponses aux questions posées :</p>
            <div className="answerContainer">
                <table className="answers">
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Reponses</th>
                            <th>Infos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questionAnswer}
                    </tbody>
                </table>
            </div>

        </Fragment>
    )
})

export default React.memo(QuizOver);