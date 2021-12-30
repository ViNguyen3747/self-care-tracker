import React from "react";
import { Button } from "semantic-ui-react";
import "./navbar.scss";
import Auth from "../../utils/auth";
import useAuth from "../../utils/Hooks/useAuth";
import Link from "../common/Link";
const Navbar = ({ toggle }) => {
  const [client, logout, authUser] = useAuth();
  return (
    <div className="navContainer">
      {authUser && (
        <div className="userName">Hi {authUser.authUser.username}</div>
      )}
      <div id="mobileicon">
        <Button
          icon="content"
          color="black"
          size="big"
          onClick={() => toggle()}
        />
      </div>
      <ul className="linkContainer">
        <Link to="/" routeName="Home" />
        <Link to="/today" routeName="Today Tasks" />
        <Link to="/upcoming" routeName="Future Tasks" />
        <Link to="/report" routeName="Report" />
        {Auth.loggedIn() ? (
          <Button
            color="purple"
            onClick={logout}
            style={{ margin: "-10px 20px" }}
          >
            Logout
          </Button>
        ) : (
          <Link to="/signin" routeName="Sign In" />
        )}
      </ul>
    </div>
  );
};

export default Navbar;
