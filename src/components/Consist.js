import React from 'react'
import '../css/consist.css'

const Consist = (props) => {
    const { calories, carbons, fats, proteins } = props.consist;
    return (
        <>
            <h3>Energy Value Per Serving</h3>
            <span>Calories</span>
            <span>Proteins</span>
            <span>Carbons</span>
            <span>Fats</span>
            <b>{calories}</b>
            <b>{proteins}</b>
            <b>{carbons}</b>
            <b>{fats}</b>
            <span>CKAL</span>
            <span>GRAM</span>
            <span>GRAM</span>
            <span>GRAM</span>
        </>
    )
}

export default Consist;
