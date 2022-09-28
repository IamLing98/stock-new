import React from "react";
import { lazy } from "react";
import { columnsMatrix1, columnsMatrix21, columnsMatrix22, columnsMatrix3 } from "./utils/columns";

const matrix1 = lazy(() => import("./matrix1"));
const matrix2 = lazy(() => import("./matrix2"));
const matrix3 = lazy(() => import("./matrix3"));

export const matrixIndexes = [
  {
    label: "Matrix 1",
    value: 1,
    columnsDefault: columnsMatrix1,
  },
  {
    label: "Matrix 2",
    value: 2,
    columnsDefault1: columnsMatrix21,
    columnsDefault2: columnsMatrix22,
  },
  {
    label: "Matrix 3",
    value: 3,
    columnsDefault: columnsMatrix3,
  },
];

const route = [
  {
    path: "/matrix1/view",
    exact: true,
    component: matrix1,
  },
  {
    path: "/matrix2/view",
    exact: true,
    component: matrix2,
  },
  {
    path: "/matrix3/view",
    exact: true,
    component: matrix3,
  },
];

export default route;
