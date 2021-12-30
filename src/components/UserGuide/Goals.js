import React from "react";

const goals = [
  {
    value: "Task Management",
  },
  {
    value: "Project Goals",
  },
  {
    value: "Priorities tasks",
  },
  {
    value: "Reports",
  },
];

const Goals = () => {
  return (
    <div
      className="info-container"
      style={{ backgroundColor: "rgba(143, 103, 114, 0.576)" }}
    >
      <div className="header">App Goals</div>
      <div className="info-wrapper">
        {goals.map((g) => (
          <div className="Card" key={g.value}>
            {g.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Goals;
