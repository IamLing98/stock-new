import React from "react";
import { lazy } from "react";

const Root = lazy(() => import("./root"));

const route = [
  {
    path: "/matrix/view",
    exact: true,
    component: Root,
  },
];

export default route;
