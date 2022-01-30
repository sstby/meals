import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { auth, database } from "../firebase";
import ProfileData from "../components/ProfileData";
import ProfileGoals from "../components/ProfileGoals";
import "../css/profile.css";

const Profile = () => {
  const [settings, setSettings] = useState("data");
  const [userData, setUserData] = useState({
    age: 0,
    weight: 0,
    height: 0,
    activityMultiplier: 1,
    targetMultiplier: 1,
  });
  const [userGoals, setUserGoals] = useState({
    calories: 0,
    proteins: 0,
    carbons: 0,
    fats: 0,
  });

  const { userID } = useParams();

  useEffect(() => {
    const getUserData = async () => {
      const docRef = doc(database, "Users", userID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserData(data.data);
        setUserGoals(data.goals);
      }
    };
    getUserData();
  }, [userID]);

  useEffect(() => {
    const calculateGoals = () => {
      let calories =
        (9.99 * userData.weight +
          6.25 * userData.height -
          (4.92 * userData.age + 5)) *
        userData.activityMultiplier *
        userData.targetMultiplier;
      calories = parseInt(calories);
      let proteins = parseInt((calories * 0.4) / 4);
      let carbons = parseInt((calories * 0.4) / 4);
      let fats = parseInt((calories * 0.2) / 9);
      let water = 40 * userData.weight;
      setUserGoals({ calories, proteins, carbons, fats, water });
    };

    let noZeros = true;
    Object.keys(userData).forEach((data) => {
      console.log(data);
      if (userData[data] === 0) noZeros = false;
    });
    if (noZeros) calculateGoals();
  }, [userData]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userRef = doc(database, "Users", userID);
    setDoc(userRef, { data: userData, goals: userGoals }, { merge: true });
  };

  const handleDataFormChange = (e) => {
    let newData = Object.assign({}, userData);
    newData = {
      ...newData,
      [e.target.name]: parseFloat(e.target.value),
    };
    setUserData(newData);
  };

  return (
    <>
      {auth.currentUser?.uid === userID ? (
        <div className="profile-page">
          <div className="profile-page__sidebar">
            <ul>
              <li onClick={() => setSettings("data")}>Data</li>
              <li onClick={() => setSettings("goals")}>Goals</li>
            </ul>
          </div>
          <div className="profile-page__content">
            {settings === "data" && (
              <ProfileData
                userData={userData}
                setUserData={handleDataFormChange}
                handleFormSubmit={handleFormSubmit}
              />
            )}
            {settings === "goals" && <ProfileGoals userGoals={userGoals} />}
          </div>
        </div>
      ) : (
        auth.currentUser && <h1>Acces Denied</h1>
      )}
    </>
  );
};

export default Profile;
