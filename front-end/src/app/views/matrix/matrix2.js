import React from "react";

// material-ui
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

import Detail from "./DetailPage";

import axios from "axios";
import DataTable3 from "./DataTable3";

import { columnsMatrix1, columnsMatrix21, columnsMatrix22, columnsMatrix3 } from "./utils/columns";

import { matrixIndexes } from "./index";
import "./table.css";

const Matrix = (props) => {
  const [type, setType] = useState("list");

  const [ticker, setTicker] = useState();

  const [loading, setLoading] = useState(false);

  const [defaultMaxtrixData, setDefaultMaxtrixData] = useState([]);

  const [matrixData, setMatrixData] = useState([]);

  const [matrix2Data, setMatrix2Data] = useState({
    table1Data: [],
    table2Data: [],
  });

  const [matrixIndex, setMatrixIndex] = useState(matrixIndexes[1]);

  const [realtime, handleChangeRealtime] = useState(false);

  const getMaxtrixData = async () => {
    await setLoading(true);
    await axios
      .get(`stock/matrix?type=${matrixIndex.value}`)
      .then(async (res) => {
        if (matrixIndex?.value === 2) {
          setMatrix2Data(res.data?.payload);
        } else {
          await setDefaultMaxtrixData(res?.data?.payload?.data);
          await setMatrixData(res?.data?.payload?.data);
        }
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

  if (type === "list")
    return loading ? (
      <Skeleton />
    ) : (
      <DataTable3
        defaultData={defaultMaxtrixData}
        data={matrixData}
        setData={setMatrixData}
        matrixIndex={matrixIndex}
        setMatrixIndex={setMatrixIndex}
        matrixIndexes={matrixIndexes}
        handleChangeRealtime={handleChangeRealtime}
        realtime={realtime}
        matrix2Data={matrix2Data}
      />
    );
  else {
    return loading ? <Skeleton /> : <Detail ticker={ticker} />;
  }
};

export default Matrix;
