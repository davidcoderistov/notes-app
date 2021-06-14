import firebase from '../app/config';

const defaultAuth = firebase.auth();

const authAPI = {
    login(email, password) {
        return defaultAuth.signInWithEmailAndPassword(email, password);
    },
    signup(email, password) {
        return defaultAuth.createUserWithEmailAndPassword(email, password);
    }
};

export { authAPI }
