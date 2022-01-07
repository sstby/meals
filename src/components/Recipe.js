import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase'

const Recipe = (props) => {
    const details = props.details;
    
    const [image, setImage] = useState('')

    const handleAddToShoplist = (ingridients) => {
        props.addToShoplist(ingridients)
    }
    
    useEffect(() => {
        const storageRef = ref(storage, details.image)
        const getImage = async () => {
            await getDownloadURL(storageRef).then((url) => {
                setImage(url);
            })
        }
        getImage();
        
    }, [details.image])

    return(
        <div className='recipe'>
            <img src={image} alt='recipe'></img>
            <div className='recipe-info'>
                <div className='recipe-info-row1'>
                    <Link to={{
                        pathname: `/recipes/${details.id}`,
                        state: {
                            recipe: 'details'
                        }
                    }}>
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
                    <button onClick={() => handleAddToShoplist(details.Ingridients)}>Add ingridients to shoplist</button>
                </div>
            </div>
        </div>   
    )
    
}
export default Recipe;