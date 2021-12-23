import React from 'react'
import { NavbarData } from './NavbarData'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';

class Sidebar extends React.Component {
    render() {
        return (
            <div >
                <nav className={this.props.sidebar ? 'sidebar' : 'sidebar sidebar-mini'}>
                    <ul className='nav-menu-items'>
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
            </div>
        )
    }
    
}

export default Sidebar
