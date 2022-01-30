import React from "react";

const ProfileGoals = ({ userGoals }) => {
  return (
    <div className="profile-goals">
      <span>Calories: {userGoals.calories}</span>
      <span>Proteins: {userGoals.proteins}</span>
      <span>Carbons: {userGoals.carbons}</span>
      <span>Fats: {userGoals.fats}</span>
      <span>Water: {userGoals.water}</span>
    </div>
  );
};

export default ProfileGoals;
