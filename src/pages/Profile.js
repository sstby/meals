import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { auth, database } from "../firebase";
import "../css/profile.css";

const Profile = () => {
  const activityTypes = [
    "",
    "Sedentary lifestyle without stress",
    "Workout 1-3 times a week",
    "Workout 3-5 times a week",
    "Intensive training 6-7 times a week",
    "Athletes who exercise more than once a day",
  ];
  const activityMultipliers = [1, 1.2, 1.375, 1.55, 1.725, 1.9];
  const [settings, setSettings] = useState("data");
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [activityMultiplier, setActivity] = useState(1);
  const [goals, setGoals] = useState({});

  const { userID } = useParams();

  useEffect(() => {
    const getUserData = async () => {
      const docRef = doc(database, "Users", userID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const { data, goals } = docSnap.data();
        setAge(data.age);
        setWeight(data.weight);
        setHeight(data.height);
        setActivity(data.activityMultiplier);
        setGoals(goals);
      }
    };
    getUserData();
  }, [userID]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userRef = doc(database, "Users", userID);
    setDoc(
      userRef,
      { data: { age, weight, height, activityMultiplier } },
      { merge: true }
    );
  };

  return (
    <>
      {auth.currentUser?.uid === userID ? (
        <div className="profile-page">
          <form onSubmit={handleFormSubmit}>
            <label>
              <span>Age, years</span>
              <input
                type="number"
                name="age"
                min={0}
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value))}
              />
            </label>

            <label>
              <span>Weight, kg</span>
              <input
                type="number"
                name="weight"
                min={0}
                value={weight}
                onChange={(e) => setWeight(parseInt(e.target.value))}
              />
            </label>

            <label>
              <span>Height, cm</span>
              <input
                type="number"
                name="height"
                min={0}
                value={height}
                onChange={(e) => setHeight(parseInt(e.target.value))}
              />
            </label>

            <label>
              <span>Activity</span>
              <select
                value={activityMultiplier}
                onChange={(e) => setActivity(parseFloat(e.target.value))}
              >
                {activityTypes.map((activity, index) => {
                  return (
                    <option key={activity} value={activityMultipliers[index]}>
                      {activity}
                    </option>
                  );
                })}
              </select>
            </label>
            <input type="submit" value="Save" />
          </form>
        </div>
      ) : (
        auth.currentUser && <h1>Acces Denied</h1>
      )}
    </>
  );
};

export default Profile;
