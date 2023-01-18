import React, { useState, useContext, useEffect } from 'react';
import Logout from '../Logout';
import QUiz from '../Quiz';
import { FirebaseContext } from '../Firebase';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const navigate = useNavigate()
    const firebase = useContext(FirebaseContext)
    const [sessionUser, setsessionUser] = useState(null);
    const [userData, setUserData] = useState({})


    useEffect(() => {
        let listernner = firebase.auth.onAuthStateChanged(user => {
            user ? setsessionUser(user) : navigate("/")
        })

        if (!!sessionUser) {
            firebase.user(sessionUser.uid)
                .get()
                .then(doc => {
                    if (doc && doc.exists) {
                        const myData = doc.data()
                        setUserData(myData)
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }

        return () => {
            listernner()
        }
    }, [sessionUser])

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
                        < QUiz userdata={userData} />
                    </div >

                </div >
            </>
        )
};

export default Welcome;