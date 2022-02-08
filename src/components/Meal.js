import React, { useState, useEffect } from "react";

import "../css/meal.css";

const Meal = (props) => {
  let temp_cals = 369;
  const { type, data } = props;

  useEffect(() => {}, []);

  //Здесь нужно загружать данные о приеме пищи по пользователю, типу(завтрак...) и дню
  return (
    <div className="meals-plan__meal">
      <div className="meals-plan-row1">
        <div className="meals-image">
          <img src={`./${type}_meal.png`} alt={type}></img>
        </div>
        <div className="meals-info">
          <span className="meals-info__header">{type}</span>
          <div className="meals-info__data">
            {/* {data_array.length === 0 ? (
              <span className="add_meal">Add meal</span>
            ) : null} */}
          </div>
        </div>
      </div>

      <div className="meals-cals">
        <span>{temp_cals} kkal</span>
      </div>
    </div>
  );
};

export default Meal;
