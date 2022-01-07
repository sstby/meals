import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";

export const NavbarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        class: 'nav-item'
    },
    {
        title: 'Recipes',
        path: '/recipes',
        icon: <BiIcons.BiFoodMenu />,
        class: 'nav-item'
    },
    {
        title: 'ShopList',
        path: '/shoplist',
        icon: <FaIcons.FaCartPlus />,
        class: 'nav-item'
    },
]