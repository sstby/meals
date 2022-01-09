import React, { useState } from "react";
import ModalSignIn from "../components/ModalSignIn";
import { useMyContext } from "../context/MyContext";

const NewRecipe = () => {
  const [modalActive, setModalActive] = useState(true);
  const { user } = useMyContext();
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
