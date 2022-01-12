import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { storage } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { IoIosArrowDown } from "react-icons/io";
import Ingridients from "./Ingridients";

const Recipe = (props) => {
  const details = props.details;
  const recipe_link = `/recipes/${details.id}`;
  const [image, setImage] = useState("");
  const [portions, setPortions] = useState(details.portions);
  const [ingridientsExtend, setIngridientsExtend] = useState(false);

  const handleSetPortions = (portions) => {
    portions !== 0 && setPortions(portions);
  };

  useEffect(() => {
    const ingridients = details.Ingridients;
    Object.keys(ingridients).forEach((key) => {
      let { count } = ingridients[key];
      ingridients[key].count = count / portions;
    });
  }, [details.Ingridients]);

  useEffect(() => {
    const getImage = async () => {
      setImage(await getDownloadURL(ref(storage, details.image)));
    };
    getImage();
  }, [details.image]);

  const handleExtend = (e) => {
    setIngridientsExtend(!ingridientsExtend);
    const parent = e.target.closest("span");
    parent
      .querySelector(".recipe-ingridients-arrow")
      .setAttribute(
        "class",
        ingridientsExtend
          ? "recipe-ingridients-arrow"
          : "recipe-ingridients-arrow active"
      );
  };

  return (
    <div className="recipe-wrapper">
      <div className="recipe">
        <Link to={recipe_link}>
          <img src={image} alt="recipe"></img>
        </Link>
        <div className="recipe-info">
          <div className="recipe-info-row1">
            <Link to={recipe_link}>
              <h3>{details.name}</h3>
            </Link>
            <span>{details.mealtime}</span>
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
              <span className="recipe-ingridients-text" onClick={handleExtend}>
                {Object.keys(details.Ingridients).length} Ingridients
                <IoIosArrowDown className="recipe-ingridients-arrow" />
              </span>
              <button
                onClick={() =>
                  props.addToShoplist(details.Ingridients, portions)
                }
              >
                Add ingridients to shoplist
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          ingridientsExtend
            ? "recipe-ingridients-extend active"
            : "recipe-ingridients-extend"
        }
      >
        {ingridientsExtend && (
          <Ingridients
            ingridients={details.Ingridients}
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
