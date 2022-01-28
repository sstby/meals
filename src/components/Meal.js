import React from "react";
import "../css/meal.css";

const Meal = (props) => {
  let temp_cals = 369;
  //Здесь нужно загружать данные о приеме пищи по пользователю, типу(завтрак...) и дню
  return (
    <div className="meals-plan__meal">
      <div className="meals-plan-row1">
        <div className="meals-image">
          <img src={`./${props.type}_meal.png`} alt={props.type}></img>
        </div>
        <div className="meals-info">
          <span className="meals-info__header">{props.type}</span>
        </div>
      </div>

      <div className="meals-cals">
        <span>{temp_cals} kkal</span>
      </div>
    </div>
  );
};

export default Meal;
