import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Shoplist from './pages/ShopList';
import React from 'react';

import Header from './components/Header'
import Sidebar from './components/Sidebar';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sidebar: true
    }
  }

  showSidebar = () => {
    const sidebar = this.state.sidebar 
    
    this.setState({ sidebar: !sidebar })
    console.log(this.state.sidebar)
  }

  render() {
    return (
      <>
        <Router>
          {/* <Navbar /> */}
            <Header showSidebar={this.showSidebar} />
            <div className='container'>
              <Sidebar sidebar={this.state.sidebar} />
              <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/recipes' element={<Recipes />} />
                <Route path='/shoplist' element={<Shoplist />} />
              </Routes>
            </div>
        </Router>
      </>
    );
  }
  
}

export default App;
