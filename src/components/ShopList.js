import React from 'react'

const Shoplist = props => {
    const shoplistItems = Object.keys(props.shoplist)

    const handleChange = (event) => {
        const updatedItem = props.shoplist[event.currentTarget.name].ingridient;
        const updatedCount = parseFloat(event.currentTarget.value) || '';
        props.updateShopList(updatedItem, updatedCount)
    }

    const renderShoplist = (key) => {
        const item = props.shoplist[key];
        return (
            <tr key={key}>
                <td>{item.ingridient}:</td>
                <td>
                    <input 
                    name={key}
                    type='text' 
                    value={item.count} 
                    onChange={handleChange}

                    />


                </td>
                <td>{item.measure}</td>
                <td >
                    <button 
                    onClick={() => props.removeFromShoplist(key)}
                    className='cancellItem'>
                        &times;
                    </button>
                </td>
            </tr>
        )
    }

    return (
            <div className='shoplist'>
                <h1>Shoplist</h1>
                <table className='shoplist-items'>
                    <tbody>
                        {shoplistItems.map(renderShoplist)}
                    </tbody>
                </table>
            </div>
        
    )
}

export default Shoplist