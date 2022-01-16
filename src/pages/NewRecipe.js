import React, { useState } from "react";
import ModalSignIn from "../components/ModalSignIn";
import { useAuthContext } from "../context/AuthContext";
import "../css/new_recipe.css";

const NewRecipe = () => {
  const [modalActive, setModalActive] = useState(true);
  const { user } = useAuthContext();

  const handleLoadPhoto = (e) => {
    console.log(e.target.files[0]);
    console.log("update");
  };

  return (
    <>
      <h1>New Recipe</h1>
      <div className="new-recipe">
        <form>
          <div className="new-recipe-info">
            <div className="new-recipe-info-left">
              <h3>Recipe info</h3>

              <label>
                Title
                <input type="text" />
              </label>

              <label>
                Description
                <textarea />
              </label>
              <label>
                Consist
                <div className="recipe-row">
                  <label>
                    Calories
                    <input type="number" />
                  </label>
                  <label>
                    Proteins
                    <input type="number" />
                  </label>
                  <label>
                    Fats
                    <input type="number" />
                  </label>
                  <label>
                    Carbons
                    <input type="number" />
                  </label>
                </div>
              </label>
              <div className="recipe-row">
                <label>
                  Portions
                  <input type="number" />
                </label>
                <label>
                  Cooking time
                  <input type="number" />
                </label>
              </div>
            </div>
            <div className="new-recipe-info-right">
              <div className="new-recipe-photo">
                <label>
                  <div className="recipe-file">Recipe photo</div>
                  <input type="file" onChange={handleLoadPhoto} />
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
      {user ? null : (
        <ModalSignIn
          active={modalActive}
          setActive={setModalActive}
          importand={true}
        />
      )}
    </>
  );
};

export default NewRecipe;
