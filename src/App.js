import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Shoplist from './pages/ShopList';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className='conteiner'>
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

export default App;
