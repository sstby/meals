import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import Recipe from "../components/Recipe";
import { database } from "../firebase";
import "../css/recipes.css";

const Recipes = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [recipeControls, showRecipeControls] = useState(false);
  const [controlsPosition, setControlsPosition] = useState({});
  const [controlsRecipe, setControlsRecipe] = useState({});
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const recipesRef = collection(database, "Recipes");
    const getRecipes = async () => {
      const data = await getDocs(recipesRef);
      setRecipes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getRecipes();
  }, []);

  useEffect(() => {
    setRecipes((prev) => {
      return prev.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    /* getSearchRecipes(); */
  }, [searchText]);

  useEffect(() => {
    if (recipeControls) {
      document.addEventListener("click", handleCloseControls);
    } else {
      document.removeEventListener("click", handleCloseControls);
    }
  }, [recipeControls]);

  /* const getSearchRecipes = () => {
    const filteredRecipes = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }; */

  const handleCloseControls = (e) => {
    showRecipeControls(false);
    setControlsPosition({});
    setControlsRecipe({});
  };

  const handleOpenControls = (e, recipe) => {
    e.stopPropagation();
    const parent = e.target.closest(".recipe-controls");
    const position = parent.getBoundingClientRect();
    let yPos = position.top + window.scrollY;
    if (window.innerHeight - yPos - 80 <= 0) {
      yPos -= 63;
    }
    setControlsPosition({
      xPos: `${position.left - 190}px`,
      yPos: `${yPos}px`,
    });
    setControlsRecipe(recipe);
    showRecipeControls(true);
  };

  return (
    <>
      <div className="recipes">
        <div className="recipes-search">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.currentTarget.value)}
          ></input>
        </div>
        {recipes.map((recipe, index) => {
          return (
            <Recipe
              addToShoplist={props.addToShoplist}
              key={index}
              index={index}
              details={recipe}
              handleOpenControls={handleOpenControls}
            />
          );
        })}

        {/*Recipe control menu*/}
        {recipeControls && (
          <div
            className="recipe-controls__menu"
            style={{
              top: controlsPosition.yPos,
              left: controlsPosition.xPos,
            }}
          >
            <span
              onClick={() =>
                props.addToShoplist(
                  controlsRecipe.ingridients,
                  controlsRecipe.portions
                )
              }
            >
              Add Ingridients to Shoplist
            </span>
            <span>Add Recipe to Favorites</span>
          </div>
        )}
      </div>
    </>
  );
};

export default Recipes;
