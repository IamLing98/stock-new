import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import AppBar from "@mui/material/AppBar";

import Chart1 from "./Chart1";
import Chart2 from "./Chart2";
import Chart3 from "./Chart3";
import Chart4 from "./Chart4";
import Chart5 from "./Chart5";
import Chart6 from "./Chart6";
import Chart7 from "./Chart7";
import { Grid } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";

export default function Tab1({ ticker }) {
  const account = useSelector((state) => state.account);

  const [loading, setLoading] = React.useState(false);

  const [data, setData] = React.useState({});

  const getData = async (code) => {
    await setLoading(true);
    await axios
      .get(`stock/financeAnalysis/${code}?type=STOCK_INFO`, {
        headers: { Authorization: `Bearer ${account.token}` },
      })
      .then(async (res) => {
        console.log(res);
        let data = res?.data?.data;
        setData(data);
      })
      .catch((err) => err);
    await setLoading(false);
  };

  React.useEffect(() => {
    getData(ticker);
  }, []);

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2} columns={{ xs: 12, sm: 12, md: 12 }}>
          <Grid item sm={3} md={3} xs={3}>
            {loading ? <Skeleton /> : <Chart1 data={data?.chart1} termList={data?.termList} />}
          </Grid>
          <Grid item sm={3} md={3} xs={3}>
            {loading ? <Skeleton /> : <Chart2 data={data?.chart2} termList={data?.termList} />}
          </Grid>
          <Grid item sm={3} md={3} xs={3}>
            {loading ? <Skeleton /> : <Chart3 data={data?.chart3} termList={data?.termList} />}
          </Grid>
          <Grid item sm={3} md={3} xs={3}>
            {loading ? <Skeleton /> : <Chart4 />}
          </Grid>
          <Grid item sm={4} md={4} xs={4}>
            {loading ? <Skeleton /> : <Chart5 />}
          </Grid>
          <Grid item sm={4} md={4} xs={4}>
            {loading ? <Skeleton /> : <Chart6 />}
          </Grid>
          <Grid item sm={4} md={4} xs={4}>
            {loading ? <Skeleton /> : <Chart7 />}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
