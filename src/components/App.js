import React from 'react';
import Aside from './Aside'

class App extends React.Component {
    render() {
        return (
            <div className='content'>
                <div className='aside'>
                    <Aside />
                </div>
                <div className='main-section'>

                </div>
                <div className='right'>
                    
                </div>
            </div>
        );
    }
}

export default App;