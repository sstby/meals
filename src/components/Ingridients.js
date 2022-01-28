import React from "react";
import "../css/ingridients.css";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";

const Ingridients = ({ ingridients, portions, setPortions, addToShoplist }) => {
  return (
    <div className="ingridients-container">
      <div className="ingridients-header">
        <h4>Ingridients:</h4>
        <div className="portions">
          <AiOutlineMinus onClick={() => setPortions(portions - 1)} />
          <div className="portions-count">
            <b>{portions}</b>
          </div>
          <AiOutlinePlus onClick={() => setPortions(portions + 1)} />
        </div>
      </div>
      <ul className="ingridients-list">
        {Object.keys(ingridients)
          .sort()
          .map((key) => {
            return (
              <li key={key}>
                <span className="ingridient-name">{ingridients[key].name}</span>
                <span className="ingridient-spacer"></span>
                <span className="ingridient-count">
                  {`${ingridients[key].count * portions} ${
                    ingridients[key].measure
                  }`}
                  <BsCartPlus
                    onClick={() =>
                      addToShoplist({ ing: ingridients[key] }, portions)
                    }
                  />
                </span>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Ingridients;
