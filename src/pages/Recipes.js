import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import Recipe from "../components/Recipe";
import { database } from "../firebase";

const Recipes = (props) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const recipesRef = collection(database, "Recipes");
    const getRecipes = async () => {
      const data = await getDocs(recipesRef);
      setRecipes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getRecipes();
  }, []);

  return (
    <>
      <h1>Recipes</h1>
      <div className="recipes">
        {recipes.map((recipe, index) => {
          return (
            <Recipe
              addToShoplist={props.addToShoplist}
              key={index}
              index={index}
              details={recipe}
            />
          );
        })}
      </div>
    </>
  );
};

export default Recipes;
