import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Progress from "../components/Progress";
import Meal from "../components/Meal";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { AiOutlinePlus } from "react-icons/ai";
import { useAuthContext } from "../context/AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { database } from "../firebase";
import "react-circular-progressbar/dist/styles.css";
import "../css/home.css";

const meals = ["breakfast", "lunch", "dinner", "supper"];
const days = ["Prev", "Today", "Next"];

function Home() {
  const [selectedDay, selectDay] = useState(() => new Date());
  const [userGoals, setUserGoals] = useState();
  const [userMeals, setUserMeals] = useState();
  const { user } = useAuthContext();

  const getFormatedDate = () => {
    return (
      selectedDay.getFullYear() +
      "-" +
      (selectedDay.getMonth() + 1) +
      "-" +
      selectedDay.getDate()
    );
  };
  //Получить цели  пользователя
  useEffect(() => {
    //Функция вносит в бд день с пустыми значениями
    const createDay = async (date) => {
      const userRef = doc(database, "Users", user.uid);
      let dailyMeals = {
        breakfast: {},
        lunch: {},
        dinner: {},
        supper: {},
        water: 0,
      };
      setDoc(
        userRef,
        {
          meals: {
            [date]: dailyMeals,
          },
        },
        { merge: true }
      );
      setUserMeals(dailyMeals);
    };

    //Если есть текущий пользователь
    if (Object.keys(user).length !== 0) {
      let date = getFormatedDate();
      const getUserData = async () => {
        const docRef = doc(database, "Users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserGoals(data.goals);
          const meals = data.meals[date];
          if (meals === undefined) {
            //Создать день в бд
            await createDay(date);
          } else {
            //Вписать данные
            setUserMeals(meals);
          }
        }
      };
      getUserData();
    }
  }, [user, selectedDay]);

  //Обновление Meals в бд
  useEffect(() => {
    const updateMeals = async () => {
      const date = getFormatedDate();
      const { breakfast, lunch, dinner, supper, water } = userMeals;
      const userRef = doc(database, "Users", user.uid);
      setDoc(
        userRef,
        {
          meals: {
            [date]: {
              breakfast,
              lunch,
              dinner,
              supper,
              water,
            },
          },
        },
        { merge: true }
      );
    };
    if (userMeals) {
      updateMeals();
    }
  }, [userMeals]);

  const changeDay = (e) => {
    const day = e.target.dataset.day;
    let date = new Date(selectedDay);
    if (day === "Prev") {
      date.setDate(date.getDate() - 1);
    } else if (day === "Next") {
      date.setDate(date.getDate() + 1);
    }
    selectDay(date);
  };

  const handleAddWater = () => {
    let meals = Object.assign({}, userMeals);
    meals = {
      ...meals,
      water: meals.water + 250,
    };
    setUserMeals(meals);
  };

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
              goal={2059}
            />
            <Progress
              class="protein-consumed"
              title={"proteins"}
              consumed={34}
              goal={103}
            />
          </div>
          <div
            className="dashboard-stats__water"
            style={{ width: 160, height: 160 }}
          >
            <CircularProgressbarWithChildren
              className="water-circle"
              value={
                userMeals && userGoals
                  ? (userMeals.water / userGoals.water) * 100
                  : 0
              }
            >
              <span id="text">Water</span>
              <span id="water-consumed">
                <span>
                  {userMeals ? (userMeals.water / 1000).toString() : null}
                </span>
                <span>/</span>
                <span>
                  {userGoals ? (userGoals.water / 1000).toString() : null}
                </span>
                <span>L</span>
              </span>
              <div id="water-btn" onClick={handleAddWater}>
                <AiOutlinePlus />
              </div>
            </CircularProgressbarWithChildren>
          </div>
          <div className="dashboard-stats__right">
            <Progress
              class="carbons-consumed"
              title={"carbons"}
              consumed={150}
              goal={257}
            />
            <Progress
              class="fats-consumed"
              title={"fats"}
              consumed={45}
              goal={69}
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
                data-day={day}
                className={`day-btn ${day === selectedDay && "active"}`}
                onClick={changeDay}
              >
                {day}
              </span>
            );
          })}
        </div>
        <div className="meals-plan">
          {meals.map((meal) => {
            return (
              <Meal
                key={meal}
                type={meal}
                data={userMeals && userMeals[meal]}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
