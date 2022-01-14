import React, { useState } from "react";
import ModalSignIn from "../components/ModalSignIn";
import { useAuthContext } from "../context/AuthContext";

const NewRecipe = () => {
  const [modalActive, setModalActive] = useState(true);
  const { user } = useAuthContext();
  return (
    <div>
      make ur own recipe
      {user ? null : (
        <ModalSignIn
          active={modalActive}
          setActive={setModalActive}
          importand={true}
        />
      )}
    </div>
  );
};

export default NewRecipe;
