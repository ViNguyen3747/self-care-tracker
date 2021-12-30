import React from "react";
import { Image } from "semantic-ui-react";
import Ghost from "../images/ghost.png";
import "./NotFound.scss";
const NoMatchPage = () => {
  return (
    <div className="errorContainer">
      <div className="imageWrapper">
        <Image src={Ghost} size="large" />
        <div className="textWrapper">PAGE NOT FOUND</div>
      </div>
    </div>
  );
};

export default NoMatchPage;
