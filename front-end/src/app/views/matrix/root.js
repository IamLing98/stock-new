import React from "react";

// material-ui
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

import Detail from "./DetailPage";

import axios from "axios";
import DataTable from "./DataTable";

import "./table.css";

const Matrix = (props) => {
  const [type, setType] = useState("list");

  const [ticker, setTicker] = useState();

  const [loading, setLoading] = useState(false);

  const [defaultMaxtrixData, setDefaultMaxtrixData] = useState([]);

  const [matrixData, setMatrixData] = useState([]);

  const getMaxtrixData = async () => {
    await setLoading(true);
    await axios
      .get(`stock/matrix`)
      .then(async (res) => {
        await setDefaultMaxtrixData(res?.data?.payload?.data);
        await setMatrixData(JSON.parse(res?.data?.payload?.data));
        await setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    getMaxtrixData();
  }, []);

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
      <DataTable defaultData={defaultMaxtrixData} data={matrixData} setData={setMatrixData} />
    );
  else {
    return loading ? <Skeleton /> : <Detail ticker={ticker} />;
  }
};

export default Matrix;
