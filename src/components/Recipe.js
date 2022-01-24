import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { storage } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Ingridients from "./Ingridients";
import Loading from "./Loading";
import { doc } from "firebase/firestore";

const Recipe = (props) => {
  const details = props.details;
  const recipe_link = `/recipes/${details.id}`;
  const [image, setImage] = useState("");
  const [portions, setPortions] = useState(details.portions);
  const [ingridientsExtend, setIngridientsExtend] = useState(false);
  const [recipeMenu, showRecipeMenu] = useState(false);

  const handleSetPortions = (portions) => {
    portions !== 0 && setPortions(portions);
  };

  useEffect(() => {
    const ingridients = details.ingridients;
    Object.keys(ingridients).forEach((key) => {
      let { count } = ingridients[key];
      ingridients[key].count = count / portions;
    });
  }, [details.ingridients]);

  useEffect(() => {
    const getImage = async () => {
      setImage(await getDownloadURL(ref(storage, details.image)));
    };
    getImage();
  }, [details.image]);

  const handleExtend = (e) => {
    setIngridientsExtend(!ingridientsExtend);
    const parent = e.target.closest(".recipe-ingridients-text");
    parent
      .querySelector(".recipe-ingridients-arrow")
      .setAttribute(
        "class",
        ingridientsExtend
          ? "recipe-ingridients-arrow"
          : "recipe-ingridients-arrow active"
      );
  };

  useEffect(() => {
    if (recipeMenu) {
      document.addEventListener("click", handleClick);
    } else {
      document.removeEventListener("click", handleClick);
    }
  }, [recipeMenu]);

  const handleClick = (e) => {
    console.log("2");
    showRecipeMenu(false);
  };

  const handleOpenMenu = (e) => {
    console.log("1");
    e.stopPropagation();
    showRecipeMenu(true);
  };

  return (
    <div className={ingridientsExtend ? "recipe recipe-extended" : "recipe"}>
      <div className="recipe-image">
        {image ? (
          <Link to={recipe_link}>
            <img src={image} alt="recipe"></img>
          </Link>
        ) : (
          <Loading />
        )}
      </div>
      <div className="recipe-info">
        <div className="recipe-info-row1">
          <Link to={recipe_link}>
            <span className="recipe-header">{details.name}</span>
          </Link>
        </div>
        <div className="recipe-info-row2">
          {Object.keys(details.consist)
            .sort()
            .map((key, index) => {
              return (
                <span key={key}>
                  {details.consist[key]} {key}
                  {index === 3 ? "" : " | "}
                </span>
              );
            })}
        </div>
        <div className="recipe-info-row3">
          <div className="recipe-ingridients">
            <div className="recipe-ingridients-text" onClick={handleExtend}>
              <span>{Object.keys(details.ingridients).length} Ingridients</span>
              <IoIosArrowDown className="recipe-ingridients-arrow" />
            </div>
            {/* <button
                onClick={() =>
                  props.addToShoplist(details.ingridients, portions)
                }
              >
                Add ingridients to shoplist
              </button> */}
          </div>
        </div>
      </div>
      <div className="recipe-controls">
        <HiOutlineDotsVertical
          className="recipe-controls__control"
          onClick={handleOpenMenu}
        />
        {recipeMenu && (
          <div className="recipe-controls__menu">
            <span>Add Ingridients to Shoplist</span>
            <span>Add Recipe to Favorites</span>
          </div>
        )}
      </div>
      <div className="recipe-ingridients-extend">
        {ingridientsExtend && (
          <Ingridients
            ingridients={details.ingridients}
            portions={portions}
            setPortions={handleSetPortions}
            addToShoplist={props.addToShoplist}
          />
        )}
      </div>
    </div>
  );
};
export default Recipe;
