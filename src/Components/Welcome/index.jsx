import React, { useState, useContext, useEffect } from 'react';
import Logout from '../Logout';
import QUiz from '../Quiz';
import { FirebaseContext } from '../Firebase';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const navigate = useNavigate()
    const [sessionUser, setsessionUser] = useState(null);
    const firebase = useContext(FirebaseContext)

    useEffect(() => {
        let listernner = firebase.auth.onAuthStateChanged(user => {
            user ? setsessionUser(user) : navigate("/")
        })

        return () => {
            listernner()
        }
    }, [])

    return sessionUser === null ?
        (
            <>
                <div className="loader">
                    <p>Loading...</p>
                </div>
            </>
        ) :
        (
            <>
                <div className='quiz-bg'>
                    <div className="container">
                        <Logout />
                        < QUiz />
                    </div >

                </div >
            </>
        )
};

export default Welcome;