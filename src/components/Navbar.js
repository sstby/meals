import React, {useState} from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from 'react-router-dom';
import { NavbarData } from './NavbarData';
import { IconContext } from 'react-icons';
import './Navbar.css';

function Navbar() {
    const [sidebar, toggleSidebar] = useState(false);

    const showSidebar = () => {
        toggleSidebar(!sidebar);
        
    }

    return (
        <>
        <IconContext.Provider value={{color: 'rgb(194, 241, 223)'}}>
            <div className='navbar'>
                <Link to="#" className='menu-bar'>
                    <FaIcons.FaBars onClick={showSidebar} />
                    
                </Link>
                <span>MyMeals</span>
            </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items'>
                        <li className='navbar-toggle' onClick={showSidebar}>
                            <Link to="#" className='menu-bar'>
                                <AiIcons.AiOutlineClose />
                                <span>MyMeals</span>
                            </Link>
                        </li>
                        {NavbarData.map((item, index) => {
                            return (
                                <li key={index} className={item.class}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span> 
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    )
}

export default Navbar
