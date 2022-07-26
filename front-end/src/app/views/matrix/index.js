import { lazy } from "react";

const AppCalendar = lazy(() => import("./AppCalendar"));

const route = [
  {
    path: "/matrix",
    component: AppCalendar,
  },
];

export default route;
