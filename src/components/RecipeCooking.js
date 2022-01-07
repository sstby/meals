import React, { useState, useEffect } from 'react'
import { storage } from '../firebase';
import { getDownloadURL, ref } from 'firebase/storage';
import '../css/cooking.css'


const RecipeCooking = props => {
    const { steps } = props;

    const [images, setImages] = useState([])
    
    useEffect(() => {
        const getImages = async () => {
            let step_images = []
            for (let i = 1; i < Object.keys(steps).length + 1; i++) {
                step_images.push( await getDownloadURL(ref(storage, steps[`step${i}`].image)))
            }
            setImages(step_images)
        }
        getImages();
    }, [steps])

    return (
        <>
            <h3>Cooking Instruction</h3>
            <div className='instruction-container'>
                {Object.keys(steps).map((key, index) => {
                    return (
                        <div className='instruction-step' key={key}>
                            <div className='instruction-step-image' >
                                <img src={images[index]} alt='recipe instruction'></img>
                            </div>
                            <div className='instruction-step-text' >
                                <p><b>{index + 1}. </b>{steps[key].text}</p>
                            </div>
                        </div>
                        
                    )
                })}
            </div>
                {/* {Object.keys(ingridients).map(key => {
                    return (
                        <li key={key}>
                            <span className='text'>{ingridients[key].ingridient}</span>
                            <span className='space'></span>
                            <span className='count'>{`${ingridients[key].count} ${ingridients[key].measure}`} </span>
                        </li>
                    )
                })} */}
        </>
    )
}

export default RecipeCooking