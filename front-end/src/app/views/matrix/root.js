import React from "react";

// material-ui
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

import Detail from "./DetailPage";

import axios from "axios";
import DataTable from "./DataTable";

import { columnsMatrix1, columnsMatrix3 } from "./utils/columns";

import "./table.css";

const matrixIndexes = [
  {
    label: "Matrix 1",
    value: 1,
    columnsDefault: columnsMatrix1,
  },
  {
    label: "Matrix 2",
    value: 2,
    columnsDefault: [],
  },
  {
    label: "Matrix 3",
    value: 3,
    columnsDefault: columnsMatrix3,
  },
];
const Matrix = (props) => {
  const [type, setType] = useState("list");

  const [ticker, setTicker] = useState();

  const [loading, setLoading] = useState(false);

  const [defaultMaxtrixData, setDefaultMaxtrixData] = useState([]);

  const [matrixData, setMatrixData] = useState([]);

  const [matrixIndex, setMatrixIndex] = useState(matrixIndexes[0]);

  const getMaxtrixData = async () => {
    await setLoading(true);
    await axios
      .get(`stock/matrix?type=${matrixIndex.value}`)
      .then(async (res) => {
        await setDefaultMaxtrixData(res?.data?.payload?.data);
        await setMatrixData(res?.data?.payload?.data);
        await setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    getMaxtrixData();
    console.log("columnsMatrix3", columnsMatrix3);
  }, [matrixIndex]);

  // useEffect(() => {
  //   console.log("Props params: ", props?.match?.params);
  //   setLoading(true);
  //   const params = props?.match?.params;
  //   const type = params?.type;
  //   console.log(type);
  //   setType(type);

  //   if (type === "list") {
  //   }
  //   if (type === "new") {
  //   } else if (type === "edit") {
  //     const query = new URLSearchParams(props.location.search);
  //   } else if (type === "detail") {
  //     const query = new URLSearchParams(props.location.search);
  //     const ticker = query.get("ticker");
  //     setTicker(ticker);
  //   }
  //   setLoading(false);
  // }, [props?.match?.params]);

  if (type === "list")
    return loading ? (
      <Skeleton />
    ) : (
      <DataTable
        defaultData={defaultMaxtrixData}
        data={matrixData}
        setData={setMatrixData}
        matrixIndex={matrixIndex}
        setMatrixIndex={setMatrixIndex}
        matrixIndexes={matrixIndexes}
      />
    );
  else {
    return loading ? <Skeleton /> : <Detail ticker={ticker} />;
  }
};

export default Matrix;
