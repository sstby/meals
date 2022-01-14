import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import ModalSignIn from "./ModalSignIn";
import { useAuthContext } from "../context/AuthContext";

const Header = (props) => {
  const [modalActive, setModalActive] = useState(false);
  const { user, logOut } = useAuthContext();

  return (
    <div className="header-wrapper">
      <header className="header">
        <div className="header-left">
          <Link to="#" className="menu-bar">
            <FaIcons.FaBars onClick={() => props.showSidebar()} />
          </Link>
          <Link to="/" className="logo">
            <h2>MyMeals</h2>
          </Link>
        </div>
        {user ? (
          <div className="header-user">
            <span>TEMP {user.email}</span>
            <button className="signin-btn" onClick={() => logOut()}>
              Log Out
            </button>
          </div>
        ) : (
          <button className="signin-btn" onClick={() => setModalActive(true)}>
            Sign In
          </button>
        )}
      </header>
      <ModalSignIn active={modalActive} setActive={setModalActive} />
    </div>
  );
};

export default Header;
