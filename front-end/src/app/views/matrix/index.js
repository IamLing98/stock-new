import { lazy } from "react";

const Root = lazy(() => import("./root"));

const route = [
  {
    path: "/matrix/list",
    exact: true,
    component: Root,
  },
];

export default route;
