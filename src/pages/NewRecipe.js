import React, { useState, useEffect } from "react";
import ModalSignIn from "../components/ModalSignIn";
import { useAuthContext } from "../context/AuthContext";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { ref as storage_ref, uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, database } from "../firebase";
import "../css/new_recipe.css";

const NewRecipe = () => {
  const [recipe, setRecipe] = useState({
    image: "",
    name: "",
    desc: "",
    portions: 0,
    cookingTime: 0,
    consist: {
      calories: null,
      proteins: null,
      fats: null,
      carbons: null,
    },
    ingridients: {},
    cooking: {},
  });
  const [modalActive, setModalActive] = useState(true);
  const [cookingSteps, setCookingSteps] = useState(1);
  const [cookingInstruction, setCookingInstruction] = useState([{ text: "" }]);
  const [ingridientsCount, setIngridientsCount] = useState(1);
  const [recipeImage, setRecipeImage] = useState(null);
  const [recipeImageURL, setRecipeImageURL] = useState("");
  const [ingridients, setIngridients] = useState([
    { name: "", count: 0, measure: "" },
  ]);
  const { user } = useAuthContext();

  const uploadPhotoClick = () => {
    document.querySelector("#image_upload").click();
  };

  const handleLoadPhoto = (e) => {
    const image = e.target.files[0];
    const type = image.type.split("/")[1];
    const id = `${Date.now()}.${type}`;
    if (e.target.files.length > 0) {
      setRecipeImage({ image, id });
      setRecipeImageURL(URL.createObjectURL(image));
      setRecipe({
        ...recipe,
        image: `images/${id}`,
      });
    }
  };

  //Устанавливает фон блока картинки рецепта
  useEffect(() => {
    //Загрузить превью изображения на страницу
    let div = document.querySelector(".new-recipe-photo");
    div.style.backgroundImage = `url(${recipeImageURL})`;

    //Убрать рамку ошибки
    if (div.style.border) div.style.border = "none";
  }, [recipeImageURL]);

  const handleChangeConsist = (event) => {
    let changedConsist = event.currentTarget.name;
    let element = document.querySelector(`#${changedConsist}`);
    if (element.style.border) {
      element.style.border = "none";
      element.style.borderBottom = "1px solid black";
    }

    let updatedConsist = Object.assign({}, recipe.consist);
    updatedConsist = {
      ...updatedConsist,
      [event.currentTarget.name]: parseFloat(event.currentTarget.value),
    };
    setRecipe({
      ...recipe,
      consist: updatedConsist,
    });
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
    const field = `#ingridient${index}`;
    const element = document.querySelector(field);
    if (element.firstChild.style.color === "red")
      element.firstChild.style.color = null;

    const updatedIngridient = {
      ...ingridient,
      [event.currentTarget.name]: event.currentTarget.value,
    };
    let ingrs = ingridients.slice();
    ingrs[index] = updatedIngridient;
    setIngridients(ingrs);
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

  const handleChangeStep = (event, index) => {
    const field = `#cooking${index}`;
    const element = document.querySelector(field);
    if (element.style.color === "red") element.style.color = null;

    let steps = cookingInstruction.slice();
    steps[index].text = event.currentTarget.value;
    setCookingInstruction(steps);
  };

  const handleRemoveStep = (index) => {
    let instructions = cookingInstruction.slice();
    instructions.splice(index, 1);
    setCookingInstruction(instructions);
    setCookingSteps(cookingSteps - 1);
  };

  const handleFormChange = (event) => {
    const field = event.currentTarget.name;
    let changedElement = document.querySelector(`#${field}`);
    if (field === "desc") {
      changedElement.style.border = "1px solid black";
    } else {
      changedElement.style.border = "none";
      changedElement.style.borderBottom = "1px solid black";
    }

    let updatedRecipe = Object.assign({}, recipe);
    updatedRecipe = {
      ...updatedRecipe,
      [event.currentTarget.name]:
        event.currentTarget.type === "number"
          ? parseFloat(event.currentTarget.value)
          : event.currentTarget.value,
    };
    setRecipe(updatedRecipe);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    //Проверить форму на пустые поля
    let emtyFields = [];
    Object.keys(recipe).forEach((field) => {
      if (field === "author") {
      } else if (field === "ingridients") {
        ingridients.forEach((ingr, index) => {
          if (ingr.name === "" || ingr.count === 0 || ingr.measure === "") {
            let element = document.querySelector(`#ingridient${index}`);
            element.firstChild.style.color = "red";
            emtyFields.push(element);
          }
        });
      } else if (field === "cooking") {
        cookingInstruction.forEach((instr, index) => {
          if (instr.text === "") {
            let element = document.querySelector(`#cooking${index}`);
            element.style.color = "red";
            emtyFields.push(element);
          }
        });
      } else if (field === "consist") {
        Object.keys(recipe.consist).forEach((item) => {
          if (recipe.consist[item] === null) {
            let element = document.querySelector(`#${item}`);
            element.style.border = "1px solid red";
            emtyFields.push(element);
          }
        });
      } else {
        if (recipe[field] === "" || recipe[field] === 0) {
          let element = document.querySelector(`#${field}`);
          element.style.border = "1px solid red";
          emtyFields.push(element);
        }
      }
    });
    if (emtyFields.length > 0) return;

    //Загрузить изображение в storage
    const storageRef = storage_ref(storage, `images/${recipeImage.id}`);
    uploadBytes(storageRef, recipeImage.image);

    //Добавить рецепт в database
    addDoc(collection(database, "Recipes"), {
      ...recipe,
      author: user.email,
      ingridients: ingridients,
      cooking: cookingInstruction,
    });
  };

  return (
    <>
      <h1>New Recipe</h1>
      <div className="new-recipe">
        <form onSubmit={handleFormSubmit}>
          <div className="new-recipe-info">
            <div className="new-recipe-info-left">
              <h3>Recipe info</h3>

              <label>
                Title
                <input
                  value={recipe.name && recipe.name}
                  onChange={handleFormChange}
                  name="name"
                  id="name"
                  type="text"
                />
              </label>

              <label>
                Description
                <textarea
                  value={recipe.desc}
                  onChange={handleFormChange}
                  name="desc"
                  id="desc"
                />
              </label>
              <label>
                Consist
                <div className="recipe-row">
                  <label>
                    Calories
                    <input
                      value={recipe.calories}
                      onChange={handleChangeConsist}
                      name="calories"
                      type="number"
                      id="calories"
                    />
                  </label>
                  <label>
                    Proteins
                    <input
                      value={recipe.proteins}
                      onChange={handleChangeConsist}
                      name="proteins"
                      type="number"
                      id="proteins"
                    />
                  </label>
                  <label>
                    Fats
                    <input
                      value={recipe.fats}
                      onChange={handleChangeConsist}
                      name="fats"
                      type="number"
                      id="fats"
                    />
                  </label>
                  <label>
                    Carbons
                    <input
                      value={recipe.carbons}
                      onChange={handleChangeConsist}
                      name="carbons"
                      type="number"
                      id="carbons"
                    />
                  </label>
                </div>
              </label>
              <div className="recipe-row">
                <label>
                  Portions
                  <input
                    value={recipe.portions}
                    onChange={handleFormChange}
                    name="portions"
                    type="number"
                    id="portions"
                  />
                </label>
                <label>
                  Cooking time
                  <input
                    value={recipe.cookingTime}
                    onChange={handleFormChange}
                    name="cookingTime"
                    id="cookingTime"
                    type="number"
                  />
                </label>
              </div>
            </div>
            <div className="new-recipe-info-right">
              <div
                id="image"
                className="new-recipe-photo"
                onClick={uploadPhotoClick}
              >
                {recipeImageURL ? null : <span>Recipe photo</span>}
                <input
                  id="image_upload"
                  type="file"
                  onChange={handleLoadPhoto}
                />
              </div>
            </div>
          </div>
          <div className="new-recipe-ingridients">
            <h3>Ingridients</h3>
            <div className="new-recipe-ingridents-container">
              {ingridients.map((ing, index) => {
                return (
                  <div
                    id={`ingridient${index}`}
                    className="inridients-row"
                    key={index}
                  >
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
                        <option></option>
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
                      <h4 id={`cooking${index}`}>Step {index + 1}</h4>
                      {cookingSteps > 1 && (
                        <AiOutlineMinus
                          className="ingrideints-svg"
                          onClick={() => handleRemoveStep(index)}
                        />
                      )}
                    </div>

                    <textarea
                      name={`step${index + 1}`}
                      value={cookingInstruction[index].text}
                      onChange={(e) => handleChangeStep(e, index)}
                    ></textarea>
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
          <input type="submit"></input>
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
