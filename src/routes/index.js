import React from "react";
import { routes } from "./routes";
import { Switch, Route } from "react-router-dom";

import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";

import Dashboard from "../components/dashboard/Dashboard";
import ListDelete from "../components/dashboard/Lists/ListDelete";

export function Routes() {
  return (
    <Switch>
      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
    </Switch>
  );

  // return (
  //   <Switch>
  //     <Route path="/signin" exact component={SignIn} />
  //     <Route path="/dashboard" exact component={Dashboard} />
  //     <Route path="/signup" exact component={SignUp} />
  //     <Route path="/list/new" exact component={Dashboard} />
  //     <Route path="/dashboard/delete/:id" exact component={Dashboard} />

  //     {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
  //     <Route component={SignIn} />
  //   </Switch>
  // );
}

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
export function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}
