import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../Firebase/'
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {

    const navigate = useNavigate()
    const data = {
        pseudo: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const [loginData, setLoginData] = useState(data)
    const [error, setError] = useState('')
    const firebase = useContext(FirebaseContext);

    const { pseudo, email, password, confirmPassword } = loginData

    const handleChange = e => {
        setLoginData({ ...loginData, [e.target.id]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { email, password } = loginData
        firebase.signupUser(email, password)
            .then(() => {
                setLoginData({ ...loginData })
                navigate("/welcome")
            }).catch((error) => {
                setError(error)
            })
    }

    const checkBtn = pseudo === "" || email === "" || password === "" || password !== confirmPassword ?
        <button disabled>Inscription</button> : <button>Inscription</button>

    const errorMsg = error !== '' && <span>{error.message}</span>;


    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftSignup">
                </div>
                <div className="formBoxRight">
                    <div className="formContent">
                        {errorMsg}
                        <h2>Inscription</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="inputBox">
                                <input type="text" onChange={handleChange} value={pseudo} id="pseudo" autoComplete="off" required />
                                <label htmlFor="pseudo">Pseudo</label>
                            </div>

                            <div className="inputBox">
                                <input type="email" onChange={handleChange} value={email} id="email" autoComplete="off" required />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="inputBox">
                                <input type="password" onChange={handleChange} value={password} id="password" autoComplete="off" required />
                                <label htmlFor="password">Mot de passe</label>
                            </div>

                            <div className="inputBox">
                                <input type="password" onChange={handleChange} value={confirmPassword} id="confirmPassword" autoComplete="off" required />
                                <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                            </div>
                            {checkBtn}
                        </form>
                        <div className="linkContainer">
                            <Link className="simpleLink" to="/login">Déjà inscrit? Connectez-vous.</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;