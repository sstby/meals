import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { storage } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Ingridients from "./Ingridients";
import Loading from "./Loading";

const Recipe = (props) => {
  const details = props.details;
  const recipe_link = `/recipes/${details.id}`;
  const [image, setImage] = useState("");
  const [portions, setPortions] = useState(details.portions);
  const [ingridientsExtend, setIngridientsExtend] = useState(false);
  const [controlsModal, showControlsModal] = useState(false);

  const handleSetPortions = (portions) => {
    portions !== 0 && setPortions(portions);
  };
  document.addEventListener("click", () => {
    showControlsModal(false);
  });
  useEffect(() => {
    console.log("mounted");
    let mounted = true;
    document.addEventListener("click", () => {
      mounted && showControlsModal(false);
    });
    return () => {
      mounted = false;
      console.log("unmounted");
    };
  }, []);

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

  const handleOpenModal = (event) => {
    event.stopPropagation();
    let mousePosition = {};
    let menuPositio = {};
    let menuDimension = {};

    showControlsModal(!controlsModal);
  };

  return (
    <>
      <div className="recipe" id={details.id}>
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
              <h3>{details.name}</h3>
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
                <span>
                  {Object.keys(details.ingridients).length} Ingridients
                </span>
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
            onClick={handleOpenModal}
          />
          {controlsModal && (
            <div className="recipe-controls__menu">
              <div className="menu_choice">
                <span className="menu_choice">Add ingridients to Shoplist</span>
              </div>
              <div className="menu_choice">
                <span className="menu_choice">Add recipe to Favorites</span>
              </div>
            </div>
          )}
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
            ingridients={details.ingridients}
            portions={portions}
            setPortions={handleSetPortions}
            addToShoplist={props.addToShoplist}
          />
        )}
      </div>
    </>
  );
};
export default Recipe;
