import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import ModalSignIn from "./ModalSignIn";
import { RiUser3Fill } from "react-icons/ri";
import { useAuthContext } from "../context/AuthContext";
import "../css/header.css";

const Header = (props) => {
  const [modalActive, setModalActive] = useState(false);
  const { user, logOut } = useAuthContext();

  return (
    <>
      <header>
        <Link to="/" className="logo">
          <h2>MyMeals</h2>
        </Link>
        <div className="header-user">
          <RiUser3Fill />
        </div>
      </header>
    </>
  );
};

export default Header;
