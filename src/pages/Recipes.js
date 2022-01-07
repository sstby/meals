import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore"
import Recipe from '../components/Recipe';
import { database } from '../firebase'


function Recipes() {
    return (
        
            <div className='recipes-wrapper'>
                <h1>Recipes</h1>
                <div className='recipes'>
                    {recipes.map((recipe, index) => {
                        return <Recipe
                        addToShoplist={props.addToShoplist}
                        key={index}
                        index={index}
                        details={recipe}
                        />
                    })}

                </div>
            </div>
    )
}

export default Recipes