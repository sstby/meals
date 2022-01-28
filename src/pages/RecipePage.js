import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { database, storage } from "../firebase";
import { useParams } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import "../css/recipe-page.css";

const RecipePage = () => {
  const [recipe, setRecipe] = useState({});
  const [recipeImage, setRecipeImage] = useState("");
  const { recipeID } = useParams();

  useEffect(() => {
    const getRecipe = async () => {
      const docRef = doc(database, "Recipes", recipeID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setRecipe(docSnap.data());
        setRecipeImage(
          await getDownloadURL(ref(storage, docSnap.data().image))
        );
      } else {
        console.log("No such document!");
      }
    };
    getRecipe();
  }, [recipeID]);

  useEffect(() => {
    const image_div = document.querySelector(".recipe-image");
    image_div.style.backgroundImage = `url(${recipeImage})`;
  }, [recipeImage]);

  return (
    <div className="recipe-page_wrapper">
      <div className="recipe-image-wrapper">
        <div className="recipe-image">
          <div className="recipe-image_border"></div>
        </div>
      </div>
      <div className="recipe-info_wrapper">
        <h1>{recipe.name}</h1>
        <p>{recipe.desc}</p>

        <p>
          {recipe.consist &&
            Object.keys(recipe.consist)
              .sort()
              .map((key, index) => {
                return (
                  <span key={key}>
                    {recipe.consist[key]} {key}
                    {index === 3 ? "" : " | "}
                  </span>
                );
              })}
        </p>
        <p>
          {recipe.portions} portions | {recipe.cookingTime} minutes
        </p>
        <div className="recipe-info_ingridients">
          {recipe.ingridients &&
            Object.keys(recipe.ingridients).map((key) => {
              return (
                <>
                  <span className="grid-item">
                    <AiOutlinePlus className="add-ingr" />
                  </span>
                  <span className="grid-item ingr">
                    {`${recipe.ingridients[key].count} 
                    ${
                      recipe.ingridients[key].measure === "unit"
                        ? ""
                        : recipe.ingridients[key].measure
                    } 
                    ${recipe.ingridients[key].name}`}
                  </span>
                </>
              );
            })}
        </div>
        <button className="add-ingridients">To Shoplist</button>
      </div>
    </div>
  );
};

export default RecipePage;
