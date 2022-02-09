import React from "react";
import Auth from "./Auth";
import "../css/modal.css";

const ModalSignIn = ({ active, setActive }) => {
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
