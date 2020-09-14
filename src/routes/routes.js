import React from "react";
import { Link, Switch } from "react-router-dom";
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";
import Dashboard from "../components/dashboard/Dashboard";
import ListCreateFab from "../components/lists/ListCreateFab";
import ListDelete from "../components/lists/ListDelete";
import ListEdit from "../containers/lists/ListEdit";
import ListList from "../components/lists/ListList";
import { RouteWithSubRoutes } from "../routes";

function Analytics({ routes }) {
  return (
    <div>
      <h2>Analytics</h2>
      <ul>
        <li>
          <Link to="/analytics/start">StartAnalytics</Link>
        </li>
        <li>
          <Link to="/analytics/finish">FinishAnalytics</Link>
        </li>
      </ul>
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </div>
  );
}

function StartAnalytics() {
  return <div>StartAnalytics</div>;
}

function FinishAnalytics() {
  return <div>FinishAnalytics</div>;
}

function Messaging() {
  return <div>Messaging</div>;
}

function GroupMessaging() {
  return <div>GroupMessaging</div>;
}

function FriendMessaging() {
  return <div>FriendMessaging</div>;
}
// Some folks find value in a centralized route config.
// A route config is just data. React is great at mapping
// data into components, and <Route> is a component.

// Our route config is just an array of logical "routes"
// with `path` and `component` props, ordered the same
// way you'd do inside a `<Switch>`.
export const routes = [
  {
    path: "/signin",
    component: SignIn,
  },
  {
    path: "/signup",
    component: SignUp,
  },
  {
    path: "/",
    component: Dashboard,
    routes: [
      {
        path: "/lists/edit/:id",
        component: ListEdit,
      },
      {
        path: "/lists",
        component: ListList,
        routes: [
          {
            path: "/lists/new",
            component: ListCreateFab,
          },
          {
            path: "/lists/delete/:id",
            component: ListDelete,
          },
        ],
      },
      {
        path: "/analytics",
        component: Analytics,
        routes: [
          {
            path: "/analytics/start",
            component: StartAnalytics,
          },
          {
            path: "/analytics/finish",
            component: FinishAnalytics,
          },
        ],
      },
      {
        path: "/messaging",
        component: Messaging,
        routes: [
          {
            path: "/messaging/group",
            component: GroupMessaging,
          },
          {
            path: "/messaging/friend",
            component: FriendMessaging,
          },
        ],
      },
    ],
  },
];
