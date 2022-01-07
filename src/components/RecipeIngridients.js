import React from 'react'
import '../css/ingridients.css'


const RecipeIngridients = props => {
    const ingridients = props.ingridients;


    return (
        <>
            <h3>Ingridients</h3>
            <ul className='ingridients-list'>
                {Object.keys(ingridients).map(key => {
                    return (
                        <li key={key}>
                            <span className='text'>{ingridients[key].ingridient}</span>
                            <span className='space'></span>
                            <span className='count'>{`${ingridients[key].count} ${ingridients[key].measure}`} </span>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default RecipeIngridients