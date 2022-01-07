import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { storage } from '../firebase'
import { ref, getDownloadURL } from 'firebase/storage'


const Recipe = (props) => {
    const details = props.details;
    const recipe_link = `/recipes/${details.id}`;
    const [image, setImage] = useState('');

    useEffect(() => {
        const getImage = async () => {
            setImage(await getDownloadURL(ref(storage, details.image)))
        }
        getImage();
    }, [details.image])

    return(
        <div className='recipe'>
            <Link to={recipe_link}>
                <img src={image} alt='recipe'></img>
            </Link>
            
            <div className='recipe-info'>
                <div className='recipe-info-row1'>
                    <Link to={recipe_link}>
                        <h3>{details.name}</h3>
                    </Link>
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
                    <button onClick={() => props.addToShoplist(details.Ingridients)}>Add ingridients to shoplist</button>
                </div>
            </div>
        </div>   
    )
    
}
export default Recipe;