import React, { useState } from "react";
import ModalSignIn from "../components/ModalSignIn";
import { useAuthContext } from "../context/AuthContext";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import "../css/new_recipe.css";

const NewRecipe = () => {
  const [modalActive, setModalActive] = useState(true);
  const [cookingSteps, setCookingSteps] = useState(1);
  const [cookingInstruction, setCookingInstruction] = useState([{ text: "" }]);
  const [ingridientsCount, setIngridientsCount] = useState(1);
  const [ingridients, setIngridients] = useState([
    { name: "", count: 0, measure: "" },
  ]);
  const { user } = useAuthContext();

  const handleLoadPhoto = (e) => {
    console.log(e.target.files[0]);
    console.log("update");
  };

  const handleAddIngridient = () => {
    setIngridientsCount(ingridientsCount + 1);
    let ingrs = ingridients.slice();

    const newIngridient = {
      name: "",
      count: 0,
      measure: "",
    };
    ingrs.push(newIngridient);
    setIngridients(ingrs);
  };

  const handleRemoveIngridient = (index) => {
    let ingrs = ingridients.slice();
    ingrs.splice(index, 1);
    setIngridients(ingrs);
    setIngridientsCount(ingridientsCount - 1);
  };

  const handleChangeIngridient = (event, ingridient, index) => {
    const updatedIngridient = {
      ...ingridient,
      [event.currentTarget.name]: event.currentTarget.value,
    };
    let ingrs = ingridients.slice();
    ingrs[index] = updatedIngridient;
    setIngridients(ingrs);
    console.log(ingridients);
  };

  const handleAddStep = () => {
    setCookingSteps(cookingSteps + 1);
    let instructions = cookingInstruction.slice();

    const newStep = {
      text: "",
    };
    instructions.push(newStep);
    setCookingInstruction(instructions);
  };

  const handleRemoveStep = (index) => {
    let instructions = cookingInstruction.slice();
    instructions.splice(index, 1);
    setCookingInstruction(instructions);
    setCookingSteps(cookingSteps - 1);
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
          <div className="new-recipe-ingridients">
            <h3>Ingridients</h3>
            <div className="new-recipe-ingridents-container">
              {ingridients.map((ing, index) => {
                return (
                  <div className="inridients-row" key={index}>
                    <b>
                      <span>{index + 1}</span>.
                    </b>
                    <div className="ingridient">
                      <input
                        onChange={(e) => handleChangeIngridient(e, ing, index)}
                        name="name"
                        type="text"
                        placeholder="Ingridient"
                        value={ing.name}
                      />
                      <input
                        onChange={(e) => handleChangeIngridient(e, ing, index)}
                        name="count"
                        min="0"
                        type="number"
                        placeholder="Count"
                        value={ing.count === 0 ? "" : ing.count}
                      />
                      <select
                        onChange={(e) => handleChangeIngridient(e, ing, index)}
                        name="measure"
                        value={ing.measure}
                      >
                        <option value="g.">g.</option>
                        <option value="ml.">ml.</option>
                        <option value="unit">unit</option>
                      </select>
                    </div>

                    {index + 1 === ingridientsCount ? (
                      <AiOutlinePlus
                        className="ingrideints-svg"
                        onClick={handleAddIngridient}
                      />
                    ) : (
                      <AiOutlineMinus
                        className="ingrideints-svg"
                        onClick={() => handleRemoveIngridient(index)}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="new-recipe-cooking">
            <h3>Cooking</h3>
            <div className="new-recipe-cooking-container">
              {cookingInstruction.map((step, index) => {
                return (
                  <div className="cooking-step" key={`step${index}`}>
                    <div className="cooking-step__header">
                      <h4>Step {index + 1}</h4>
                      {cookingSteps > 1 && (
                        <AiOutlineMinus
                          className="ingrideints-svg"
                          onClick={() => handleRemoveStep(index)}
                        />
                      )}
                    </div>

                    <textarea></textarea>
                    {index + 1 === cookingSteps && (
                      <AiOutlinePlus
                        className="add_step"
                        onClick={handleAddStep}
                      />
                    )}
                  </div>
                );
              })}
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
