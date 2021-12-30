import React from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Image } from "semantic-ui-react";
import Authentication from "../images/Authentication.svg";

const Signin = () => {
  return (
    <div
      className="info-container"
      style={{ backgroundColor: "rgba(21, 10, 14, 0.671)" }}
    >
      <div className="InfoRow">
        <div className="Column1">
          <div className="TextWrapper">
            <p className="header" style={{ color: "rgb(252, 240, 227)" }}>
              Join us
            </p>
            <p className="Subtitle">
              Easy to access, easy to understand. Join us now to exprience the
              best way to develope your healthy lifestyle!
            </p>
            <Link to="/signin">
              <Button color="violet" size="medium">
                Sign in
              </Button>
            </Link>
          </div>
        </div>
        <div className="Column2">
          <div className="ImgWrap">
            <Image size="large" src={Authentication} alt="authentication" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
