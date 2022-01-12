import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Shoplist from "./components/ShopList";
import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import RecipePage from "./pages/RecipePage";
import { MyContextProvider } from "./context/MyContext";
import NewRecipe from "./pages/NewRecipe";

class App extends React.Component {
  state = {
    modalSignIn: false,
    recipes: {},
    shoplist: {},
    sidebar: false,
  };

  showSidebar = () => {
    const sidebar = this.state.sidebar;
    this.setState({ sidebar: !sidebar });
  };

  showSignInModal = () => {
    this.setState({ modalSignIn: true });
  };

  addToShoplist = (ingridients, portions) => {
    //Делаем копию объекта shoplist в state
    const shoplist = { ...this.state.shoplist };

    //Перебираем каждый ингридиент и добавляем новые объекты или прибавляем
    Object.keys(ingridients).forEach((key) => {
      const { ingridient, count, measure } = ingridients[key];
      shoplist[`${ingridients[key].ingridient}`] = {
        ingridient,
        count: shoplist[`${ingridients[key].ingridient}`]
          ? shoplist[`${ingridients[key].ingridient}`].count + count * portions
          : count * portions,
        measure,
      };
    });

    //Устанавливаем новый state
    this.setState({ shoplist });
  };

  updateShopList = (item, count) => {
    //Делаем копию объекта shoplist в state
    const shoplist = { ...this.state.shoplist };

    //Перезаписываем новое количество продукта
    shoplist[item].count = count;

    //Устанавливаем новый state
    this.setState({ shoplist });
  };

  removeFromShoplist = (key) => {
    //Делаем копию объекта shoplist в state
    const shoplist = { ...this.state.shoplist };

    delete shoplist[key];

    this.setState({ shoplist });
  };

  render() {
    return (
      <Router>
        <MyContextProvider>
          <Header
            modalSignIn={this.state.modalSignIn}
            showSignInModal={this.showSignInModal}
            showSidebar={this.showSidebar}
          />
          <div className="content">
            <Sidebar sidebar={this.state.sidebar} />
            <div className={this.state.sidebar ? "main" : "main main-max"}>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route
                  exact
                  path="/recipes"
                  element={
                    <Recipes
                      addToShoplist={this.addToShoplist}
                      shoplist={this.state.shoplist}
                    />
                  }
                />
                <Route path="/recipes/:recipeID" element={<RecipePage />} />
                <Route exact path="/newrecipe" element={<NewRecipe />} />
              </Routes>
              <div className="main-shoplist">
                <Shoplist
                  removeFromShoplist={this.removeFromShoplist}
                  updateShopList={this.updateShopList}
                  shoplist={this.state.shoplist}
                />
              </div>
            </div>
          </div>
        </MyContextProvider>
      </Router>
    );
  }
}

export default App;
