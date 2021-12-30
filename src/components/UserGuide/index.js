import React from "react";
import "./UserGuide.scss";
import Goals from "./Goals";
import { Guide } from "./Guide";
import Signin from "./Signin";

const index = () => {
  return (
    <div className="container">
      <Goals />
      <Guide />
      <Signin />
    </div>
  );
};

export default index;
