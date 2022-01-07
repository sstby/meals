import React, { useState, useEffect } from 'react';
import { doc, getDoc } from "firebase/firestore"
import { ref, getDownloadURL } from "firebase/storage";
import { database, storage } from '../firebase'
import { useParams } from 'react-router-dom';
import Consist from '../components/Consist';
import RecipeIngridients from '../components/RecipeIngridients';
import RecipeCooking from '../components/RecipeCooking';
import '../css/recipe_page.css'

function RecipePage () {

    const params = useParams();
    const { recipeID } = params;


    const [recipe, setRecipe] = useState()
    const [recipeImage, setRecipeImage] = useState('')
    const [isExist, setExist] = useState(true);

    

    useEffect(() => {
        const getRecipe = async () => {
            const docRef = doc(database, 'Recipes', recipeID)
            const docSnap = await getDoc(docRef)
    
            const data = docSnap.exists() ? docSnap.data() : null
    
            if (data == null || data === undefined) setExist(false);
    
            setRecipe(data)
            setRecipeImage(await getDownloadURL(ref(storage, data.image)));
        }
        getRecipe()
    }, [recipeID])

    return (
        <div className='recipe-page-wrapper'>
            { recipe ? 
            <div className='recipe-page'>
                <div className='recipe-page-info'>
                    <div className='recipe-page-info-left'>
                        {/* <img src={`/${storageRef.fullPath}`}alt={storageRef.name}></img> */}
                        <img src={recipeImage} alt={recipe.name}></img>
                    </div>
                    <div className='recipe-page-info-right'>
                        <h1>{recipe.name}</h1>
                        <span>Portions: {recipe.portions}</span>
                        <span>Cooking time: 20 min</span>
                    </div>
                </div>
                <div className='recipe-page-body'>
                    <div className='recipe-desc'>
                        <h3>Description</h3>
                        <p>{recipe.desc}</p>
                    </div>
                    <div className='recipe-consist'>
                        <Consist consist={recipe.consist} />
                    </div>
                    <div className='recipe-ingridients'>
                        <RecipeIngridients ingridients={recipe.Ingridients} />
                    </div>
                    <div className='recipe-cooking'>
                        <RecipeCooking storage={storage} steps={recipe.cooking} />
                    </div>
                </div>
            </div>

            //Показывать загрузку, пока загружаются данные из БД
            : isExist ? <h2>Loading...</h2> : <h2>No such recipe</h2> }
        </div>
    )
}

export default RecipePage