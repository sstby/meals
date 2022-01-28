import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import ModalSignIn from "./ModalSignIn";
import { RiUser3Fill } from "react-icons/ri";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../css/header.css";

const Header = (props) => {
  const navigate = useNavigate();
  const [modalActive, setModalActive] = useState(false);
  const [userMenu, showUserMenu] = useState(false);
  const { user, logOut } = useAuthContext();

  const handleUserClick = (e) => {
    e.stopPropagation();
    if (user) {
      showUserMenu(true);
    } else {
      setModalActive(true);
    }
  };

  useEffect(() => {
    const handleCloseControls = () => {
      showUserMenu(false);
    };
    document.addEventListener("click", handleCloseControls);
    return () => document.removeEventListener("click", handleCloseControls);
  }, [userMenu]);

  return (
    <header>
      <Link to="/" className="logo">
        <h2>MyMeals</h2>
      </Link>
      <div className="header-user">
        <RiUser3Fill onClick={handleUserClick} />
        {userMenu && user && (
          <ul className="user-menu">
            <li key="profile" onClick={() => navigate(`/profile/${user.uid}`)}>
              <span>Edit Profile</span>
            </li>
            <li key={"logout"} onClick={() => logOut()}>
              <span>Log Out</span>
            </li>
          </ul>
        )}
      </div>
      {modalActive && (
        <ModalSignIn active={modalActive} setActive={setModalActive} />
      )}
    </header>
  );
};

export default Header;
