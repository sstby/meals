import React from 'react'
/* import { Link } from 'react-router-dom' */
import { ref } from "firebase/storage";
import { storage } from '../firebase'


const Recipe = (props) => {
    const details = props.details;
    const storageRef = ref(storage, details.image)

    const handleAddToShoplist = (ingridients) => {
        props.addToShoplist(ingridients)
    }

    const openRecipePage = (recipe) => {
        console.log(details.id)
    }

    return(
        <div className='recipe'>
            <img src={storageRef.fullPath} alt='recipe'></img>
            <div className='recipe-info'>
                <div className='recipe-info-row1'>
                    <h3 onClick={openRecipePage}>{details.name}</h3>
                    <span>{details.mealtime}</span>
                </div>
                <div className='recipe-info-row2'>
                {Object.keys(details.consist).sort().map((key, index) => {
                        return (<span key={key}>
                            {details.consist[key]} {key}
                            {index === 3 ? '' : ' | '}
                        </span>)
                    })}
                </div>
                <div className='recipe-info-row3'>
                    <span>{Object.keys(details.Ingridients).length} Ingridients</span>
                    <button onClick={() => handleAddToShoplist(details.Ingridients)}>Add ingridients to shoplist</button>
                </div>
            </div>
        </div>   
    )
    
}
export default Recipe;