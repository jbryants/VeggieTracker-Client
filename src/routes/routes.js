import React from "react";

import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";

import Tacos from "../components/Tacos";
import Bus from "../components/Bus";
import Cart from "../components/Cart";
import Dashboard from "../components/dashboard/Dashboard";
import Lists from "../components/dashboard/Lists";
import ListCreateFab from "../components/dashboard/Lists/ListCreateFab";
import ListDelete from "../components/dashboard/Lists/ListDelete";

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
  // {
  //   path: "/",
  //   component: Tacos,
  //   routes: [
  //     {
  //       path: "/bus",
  //       component: Bus,
  //     },
  //     {
  //       path: "/cart",
  //       component: Cart,
  //     },
  //   ],
  // },
  {
    path: "/",
    component: Dashboard,
    routes: [
      {
        path: "/lists",
        component: Lists,
        routes: [
          {
            path: "/new",
            component: Lists,
          },
          {
            path: "/edit/:id",
            component: Lists,
          },
          {
            path: "/delete/:id",
            component: ListDelete,
          },
        ],
      },
      // {
      //   path: "/analytics",
      //   component: Analytics,
      // },
      // {
      //   path: "/messaging"
      //   component: Messaging,
      // }
    ],
  },
  // {
  //   path: "/lists",
  //   component: Lists,
  //   routes: [
  //     {
  //       path: "/new",
  //       component: Lists,
  //     },
  //     {
  //       path: "/edit/:id",
  //       component: Lists,
  //     },
  //     {
  //       path: "/delete/:id",
  //       component: Lists,
  //     },
  //   ],
  // },
];
