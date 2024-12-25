import React, { createContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { Toaster } from 'react-hot-toast';
import app from '../components/firebase/firebase.config';
import axios from 'axios';

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Create User
    const createUser = async (email, password) => {
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            await signOut(auth);
        } finally {
            setLoading(false);
        }
    };

    // Login User
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Google Login
    const logInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    };

    // Logout User
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    // Persist User on Reload
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            console.log('state captured', currentUser?.email)

            if (currentUser?.email) {
                const user = { email: currentUser.email }

                axios.post('http://localhost:5000/jwt', user, { withCredentials: true })
                    .then(res => {
                        console.log(res.data)})
                        setLoading(false);
            }
            else {
                axios.post('http://localhost:5000/logout', {}, {
                    withCredentials: true
                })
                    .then(res => {
                        console.log('logout', res.data)
                    })
                setLoading(false);

            }



        });


        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        setUser,
        createUser,
        loginUser,
        logOut,
        loading,
        logInWithGoogle,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            <Toaster />
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
