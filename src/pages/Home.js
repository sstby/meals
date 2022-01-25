import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/home.css";

function Home() {
  const days = ["Yesterday", "Today", "Tomorrow"];
  const [selectedDay, selectDay] = useState(days[1]);
  return (
    <div className="home-page">
      <div className="home-logo">
        <div className="logo-items">
          <p>
            With us you can find out the recipe of an intresting dish and use it
            to easily make a shopping list for your next trip to the store. If
            you do not find the dush you need in our proposed list of recipes,
            you can easily add it to the site and use it in the future. You will
            also be able to control the number of calories consumed.
          </p>
          <Link to="/recipes" className="shoppinglist-btn">
            Shopping List
          </Link>
        </div>
      </div>
      <div className="meals-dashboard"></div>
      <div className="meals-plan-container">
        <div className="meals-plan-days">
          {days.map((day) => {
            return (
              <span
                key={day}
                className={`day-btn ${day === selectedDay && "active"}`}
                onClick={() => selectDay(day)}
              >
                {day}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
