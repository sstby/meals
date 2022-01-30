import React from "react";

const ProfileData = ({ userData, setUserData, handleFormSubmit }) => {
  const activityTypes = [
    "",
    "Sedentary lifestyle without stress",
    "Workout 1-3 times a week",
    "Workout 3-5 times a week",
    "Intensive training 6-7 times a week",
    "Athletes who exercise more than once a day",
  ];

  const activityMultipliers = [1, 1.2, 1.375, 1.55, 1.725, 1.9];
  const targetTypes = ["Weight loss", "Maintance", "Weight gain"];
  const targetMultipliers = [0.8, 1, 1.2];
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <label>
          <span>Age, years</span>
          <input
            type="number"
            name="age"
            min={0}
            value={userData.age}
            onChange={setUserData}
          />
        </label>

        <label>
          <span>Weight, kg</span>
          <input
            type="number"
            name="weight"
            min={0}
            value={userData.weight}
            onChange={setUserData}
          />
        </label>

        <label>
          <span>Height, cm</span>
          <input
            type="number"
            name="height"
            min={0}
            value={userData.height}
            onChange={setUserData}
          />
        </label>

        <label>
          <span>Activity</span>
          <select
            name="activityMultiplier"
            value={userData.activityMultiplier}
            onChange={setUserData}
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
        <label>
          <span>Target</span>
          <select
            name="targetMultiplier"
            value={userData.targetMultiplier}
            onChange={setUserData}
          >
            {targetTypes.map((target, index) => {
              return (
                <option key={target} value={targetMultipliers[index]}>
                  {target}
                </option>
              );
            })}
          </select>
        </label>
        <input type="submit" value="Save" />
      </form>
    </>
  );
};

export default ProfileData;
