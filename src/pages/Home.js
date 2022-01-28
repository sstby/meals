import React, { useState } from "react";
import { Link } from "react-router-dom";
import Progress from "../components/Progress";
import Meal from "../components/Meal";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { AiOutlinePlus } from "react-icons/ai";
import "react-circular-progressbar/dist/styles.css";
import "../css/home.css";

const meals = ["breakfast", "lunch", "dinner", "supper"];
const days = ["Yesterday", "Today", "Tomorrow"];

function Home() {
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
      <div className="meals-dashboard">
        <div className="dashboard-container">
          <div className="dashboard-stats__left">
            <Progress
              class="calories-consumed"
              title={"kkal"}
              consumed={1156}
              normal={2059}
            />
            <Progress
              class="protein-consumed"
              title={"proteins"}
              consumed={34}
              normal={103}
            />
          </div>
          <div
            className="dashboard-stats__water"
            style={{ width: 160, height: 160 }}
          >
            <CircularProgressbarWithChildren
              className="water-circle"
              value={(0.7 * 100) / 2}
            >
              <span id="text">Water</span>
              <span id="water-consumed">0.7 L</span>
              <div id="water-btn">
                <AiOutlinePlus />
              </div>
            </CircularProgressbarWithChildren>
          </div>
          <div className="dashboard-stats__right">
            <Progress
              class="carbons-consumed"
              title={"carbons"}
              consumed={150}
              normal={257}
            />
            <Progress
              class="fats-consumed"
              title={"fats"}
              consumed={45}
              normal={69}
            />
          </div>
        </div>
      </div>
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
        <div className="meals-plan">
          {meals.map((meal) => {
            return <Meal key={meal} type={meal} day={selectedDay} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
