import React from "react";
import { Switch, Route } from "react-router-dom";

import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";

import Dashboard from "../components/dashboard/Dashboard";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/signup" exact component={SignUp} />

      {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
      <Route component={SignIn} />
    </Switch>
  );
}
