import React from "react";
import "../css/progress.css";

const Progress = (props) => {
  return (
    <div className={props.class}>
      <span className="progress-title">{props.title}</span>
      <div className="progress-bar">
        <div
          className="progress-bar__progress"
          style={{ width: (props.consumed * 100) / props.normal + "%" }}
        ></div>
      </div>
      <span className="progress-consumed">
        {props.consumed}/{props.normal} g
      </span>
    </div>
  );
};

export default Progress;
