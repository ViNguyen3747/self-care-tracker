import React from "react";
import { Button } from "semantic-ui-react";
import Link from "../common/Link";
import useAuth from "../../utils/Hooks/useAuth";
import "./Sidebar.scss";
import Auth from "../../utils/auth";

const Sidebar = ({ isOpen, toggle }) => {
  const [client, logout] = useAuth();

  return (
    <aside
      className="SidebarContainer"
      onClick={() => toggle()}
      style={{ opacity: isOpen ? "97%" : 0, top: isOpen ? "0" : "-100%" }}
    >
      <div id="Icon">
        <Button
          icon="close"
          color="purple"
          size="big"
          onClick={() => toggle()}
        />
      </div>
      <div className="sidebarwrapper">
        <ul className="sidebarMenu">
          <Link to="/" routeName="User Guide" />
          <Link to="/today" routeName="Today Tasks" />
          <Link to="/upcoming" routeName="Future Tasks" />
          <Link to="/report" routeName="Report" />
          {Auth.loggedIn() ? (
            <Button color="purple" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Link to="/signin" routeName="Sign In" />
          )}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
