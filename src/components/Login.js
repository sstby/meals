import React, { useState } from 'react'
import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged,
    signInWithEmailAndPassword
 } from "firebase/auth"
import { auth } from '../firebase'
import '../css/login.css'

const Login = (props) => {

    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }
        
    }

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className='login-container'>
            <div className='login-form'>
                <h1>Log In</h1>
                <input type='text' name='login' onChange={(event) => setLoginEmail(event.target.value)}></input>
                <input type='password' name='password' onChange={(event) => setLoginPassword(event.target.value)}></input>
                <button onClick={login}>Log In</button>
            </div>
            <div className='signup-form'>
                <h1>Sign Up</h1>
                <input type='text' name='login' onChange={(event) => setRegisterEmail(event.target.value)}></input>
                <input type='password' name='password'  onChange={(event) => setRegisterPassword(event.target.value)}></input>
                <button onClick={register}>Sign Up</button>
            </div>
        </div>
    )
}

export default Login;