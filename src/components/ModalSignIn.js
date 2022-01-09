import React from "react";
import Auth from "./Auth";
import { useNavigate } from "react-router-dom";
import "../css/modal.css";

const ModalSignIn = ({ active, setActive, importand }) => {
  const navigate = useNavigate();
  const handleCloseModal = () => {
    if (importand) {
      navigate("/");
    } else {
      setActive(false);
    }
  };

  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={handleCloseModal}
    >
      <div
        className={active ? "modal-content active" : "modal-content"}
        onClick={(e) => e.stopPropagation()}
      >
        <Auth type="login" setModalActive={setActive} />
      </div>
    </div>
  );
};

export default ModalSignIn;
