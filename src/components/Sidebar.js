import React from 'react'
import { NavbarData } from './NavbarData'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';

class Sidebar extends React.Component {
    render() {
        return (
            <nav className={this.props.sidebar ? 'navbar' : 'navbar navbar-mini'}>
                <ul className='navbar-nav'>
                    {NavbarData.map((item, index) => {
                        return (
                            <li key={index} className={item.class}>
                                <Link to={item.path} className='nav-link'>
                                    {item.icon}
                                    <span className='link-text'>{item.title}</span> 
                                </Link>
                            </li>
                        )
                    })}
                    <li className='nav-item'>
                        <Link to='#' className='nav-link'>
                            <FaIcons.FaSun />
                            <span className='link-text'>Theme</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        )
    }
    
}

export default Sidebar
