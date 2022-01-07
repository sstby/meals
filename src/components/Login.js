import React, { useState } from 'react'
import GoogleButton from 'react-google-button';
import { useUserAuth } from "../context/UserAuthContext";
import '../css/login.css'

const Login = (props) => {
    
    const [signin, toggleSignIn] = useState(props.signin)
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const { signUp, logIn } = useUserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('');
        try {
            if (signin) {
                await signUp(email, pass);
            }
            else {
                await logIn(email, pass);
            }
        } catch (err) {
            console.log('olo')
            setError(err.message)
        }
    }

    return (
            <div className='login-form'>
                <h1>{ signin ? 'Sign up' : 'Log In'}</h1>
                { error ? error : null}
                <form onSubmit={handleSubmit}>
                    <input type='text' name='login' onChange={(event) => setEmail(event.target.value)}></input>
                    <input type='password' name='password' onChange={(event) => setPass(event.target.value)}></input>
                    <input type='submit' value={signin ? 'Sign Up' : 'Log In'}/>
                </form>
                {
                    signin ? 
                    <span>Already have an account? <span className='link' onClick={() => toggleSignIn(false)}>Log In</span></span>
                    :   <>
                        <hr />
                        <GoogleButton className='g-btn' type='dark' />
                        <span>Don't have an account?<span className='link' onClick={() => toggleSignIn(true)}>Sign Up</span></span>
                        </>
                }
            </div>
    )
}

export default Login;