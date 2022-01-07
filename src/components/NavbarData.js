import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as BiIcons from "react-icons/bi";

export const NavbarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        class: 'nav-text'
    },
    {
        title: 'Recipes',
        path: '/recipes',
        icon: <BiIcons.BiFoodMenu />,
        class: 'nav-text'
    },
/*     {
        title: 'ShopList',
        path: '/shoplist',
        icon: <FaIcons.FaCartPlus />,
        class: 'nav-item'
    }, */
    {
        title: 'New recipe',
        path: '/newrecipe',
        icon: <AiIcons.AiOutlinePlus />,
        class: 'nav-item'
    },
]