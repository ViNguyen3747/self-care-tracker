import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Report from "./components/Report";
import TodayTasks from "./components/TodayTasks";
import UpcomingTasks from "./components/UpcomingTasks";
import UserGuide from "./components/UserGuide";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import NoMatchPage from "./components/404";
import {
  Register,
  Signin,
  Activation,
  ResetPassword,
  ForgotPassword,
} from "./components/Authentication";
const Window = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Router>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <Switch>
        <Route path="/" exact component={UserGuide} />
        <Route path="/today" component={TodayTasks} />
        <Route path="/upcoming" component={UpcomingTasks} />
        <Route path="/report" component={Report} />
        <Route path="/register" component={Register} />
        <Route path="/signin" component={Signin} />
        <Route path="/user/activate/:activation_token" component={Activation} />
        <Route path="/user/forgotPassword" component={ForgotPassword} />
        <Route path="/user/reset/:reset_token" component={ResetPassword} />
        <Route component={NoMatchPage} />
      </Switch>
    </Router>
  );
};

export default Window;
