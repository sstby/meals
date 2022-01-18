import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { database, storage } from "../firebase";
import { useParams } from "react-router-dom";

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

  return (
    <div>
      <h2>{recipe.name}</h2>
      <img src={recipeImage} alt="" />
    </div>
  );
};

export default RecipePage;
