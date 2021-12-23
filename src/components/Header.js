import React from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from "react-icons/fa";

class Header extends React.Component {
    render() {
        return (
            <header className='header'>
                <div className='start'>
                    <Link to="#" className='menu-bar' >
                        <FaIcons.FaBars onClick={() => this.props.showSidebar()} />     
                    </Link>
                    <Link to='/' className='logo'>
                        <h2>MyMeals</h2>
                    </Link>
                </div>
            </header>
        )
    }
}

export default Header
