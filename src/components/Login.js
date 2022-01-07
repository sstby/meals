import React, { useState } from 'react'
import { useMyContext } from '../context/MyContext'

import '../css/login.css'

const Login = (props) => {
    const { user } = useMyContext();
    return (
        <>
            {user.email}
        </>
    )
}

export default Login;