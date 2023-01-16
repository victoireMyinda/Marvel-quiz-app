import app from 'firebase/compat/app';
import 'firebase/compat/auth'

const firebaseConfig = {
    apiKey: "AIzaSyA4037GNHU6czsSoBiZ0sSTxO4P-sO72G0",
    authDomain: "marvel-quiz-b7b80.firebaseapp.com",
    projectId: "marvel-quiz-b7b80",
    storageBucket: "marvel-quiz-b7b80.appspot.com",
    messagingSenderId: "569393940666",
    appId: "1:569393940666:web:3b5758d36885ea07cf9a83"
};


class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);

        this.auth = app.auth()
    }

    // inscription
    signupUser = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    // Connexion
    loginUser = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    // Déconnexion
    signoutUser = () => this.auth.signOut();

    // Récupérer le mot de passe
    passwordReset = email => this.auth.sendPasswordResetEmail(email);
}

export default Firebase