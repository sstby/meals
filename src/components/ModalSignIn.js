import React from 'react'
import '../css/modal.css'

const ModalSignIn = ({active, setActive, children}) => {

    return (
        <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
            <div className={active ? 'modal-content active' : 'modal-content'} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default ModalSignIn