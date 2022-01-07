import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from "react-icons/fa";
import ModalSignIn from './ModalSignIn'
import Login from './Login';

const Header = (props) => {
    const [modalActive, setModalActive] = useState(false)
    
    return (
        <div className='header-wrapper'>
            <header className='header'>
                <div className='header-left'>
                    <Link to="#" className='menu-bar' >
                        <FaIcons.FaBars onClick={() => props.showSidebar()} />     
                    </Link>
                    <Link to='/' className='logo'>
                        <h2>MyMeals</h2>
                    </Link>
                </div>
    
                <button 
                className='signin-btn'
                onClick={() => setModalActive(true)}
                >Sign In</button>
                  
            </header>      
            <ModalSignIn active={modalActive} setActive={setModalActive}>
                <Login signin={false} />
            </ModalSignIn>
        </div> 
    )
}

export default Header;
