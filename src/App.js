import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Recipes from './pages/Recipes';
<<<<<<< Updated upstream
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
=======
import Shoplist from './components/ShopList';
import React from 'react';
import Header from './components/Header'
import Sidebar from './components/Sidebar';
import RecipePage from './pages/RecipePage'
import NewRecipe from './pages/NewRecipe';
import { UserAuthContextProvider } from "./context/UserAuthContext";

class App extends React.Component {

  state = {
    user: '',
    modalSignIn: false,
    recipes: {},
    shoplist: {},
    sidebar: false
  }

  showSidebar = () => {
    const sidebar = this.state.sidebar 
    this.setState({ sidebar: !sidebar })
  }

  showSignInModal = () => {
    const { modalSignIn } = this.state;
    this.setState({ modalSignIn: !modalSignIn });
  }

  //Нужно ли оно вообще??
  loadRecipes = (loadedRecipes) => {
    console.log('loading recipes to state')
  }

  addToShoplist = (ingridients) => {
 
    //Делаем копию объекта shoplist в state
    const shoplist = { ...this.state.shoplist };

    //Перебираем каждый ингридиент и добавляем новые объекты или прибавляем
    Object.keys(ingridients).forEach(key => {
      const { ingridient, count, measure} = ingridients[key];
      shoplist[`${ingridients[key].ingridient}`] = { 
        ingridient, 
        count: shoplist[`${ingridients[key].ingridient}`] ? shoplist[`${ingridients[key].ingridient}`].count + count : count,
        measure
      };
    })

    //Устанавливаем новый state
    this.setState({shoplist})
  }

  updateShopList = (item, count) => {
    //Делаем копию объекта shoplist в state
    const shoplist = { ...this.state.shoplist };
    
    //Перезаписываем новое количество продукта
    shoplist[item].count = count;

    //Устанавливаем новый state
    this.setState({ shoplist });
  }
  
  removeFromShoplist = (key) => {
    //Делаем копию объекта shoplist в state
    const shoplist = { ...this.state.shoplist };

    delete shoplist[key];

    this.setState({ shoplist });
  }


  render() {
    return (
        <Router>
        <UserAuthContextProvider>
          <Header user={this.state.user} modalSignIn={this.state.modalSignIn} showSignInModal={this.showSignInModal} showSidebar={this.showSidebar} />
            <div className='content'>
              <Sidebar sidebar={this.state.sidebar} />
              <div className={ this.state.sidebar ? 'main' : 'main main-max'}>
              <div className='main-content'>
                
                  <Routes>
                    <Route exact path='/' element={<Home  />} />
                    <Route path='/recipes' element={<Recipes
                                                    updateShopList={this.updateShopList}
                                                    removeFromShoplist={this.removeFromShoplist}
                                                    addToShoplist={this.addToShoplist}
                                                    loadRecipes={this.loadRecipes} 
                                                    recipes={this.state.recipes} 
                                                    shoplist={this.state.shoplist} 
                                                    />} />
                    <Route path='/recipes/:recipeID' element={<RecipePage />} />
                    <Route path='/newrecipe' element={<NewRecipe />} />
                  </Routes>
                
              </div>
              <div className='main-shoplist'>
                <Shoplist 
                removeFromShoplist={this.removeFromShoplist} 
                updateShopList={this.updateShopList}
                shoplist={this.state.shoplist} 
                />
              </div>
              </div>
            </div>
            </UserAuthContextProvider>
        </Router>
    );
  }
>>>>>>> Stashed changes
}

export default App;
