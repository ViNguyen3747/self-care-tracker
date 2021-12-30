import React from "react";
import { NavLink } from "react-router-dom";
import "./link.scss";

const Link = ({ to, routeName }) => (
  <li className="link">
    <NavLink to={to} activeClassName="active" exact>
      {routeName}
    </NavLink>
  </li>
);

export default Link;
