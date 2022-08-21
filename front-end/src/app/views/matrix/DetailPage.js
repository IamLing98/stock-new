import React, { useState } from "react";
// material-ui
import axios from "axios";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { useHistory } from "react-router-dom";

import FullWidthTabs from "./detail-components/Tabs";
import "react-loading-skeleton/dist/skeleton.css";
import "./table.css";

const Typography = ({ ticker }) => {
  const account = useSelector((state) => state.account);

  const [stockInfo, setStockInfo] = useState({});

  const [tradingInfo, setTradingInfo] = useState({});

  const [stockDealInfo, setStockDealInfo] = useState([]);

  const [dataRefByCode, setDataRefByCode] = useState();

  const [fibonacciData, setFibonacciData] = useState([]);

  const [financeReport, setFinanceReport] = useState({
    name: "Báo cáo tài chính",
    data: [],
  });

  const [overview, setOverview] = useState();

  const [industryProfile, setIndustryProfile] = useState();

  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const getTradingView = async (code) => {
    await setLoading(true);
    await axios
      .get(`/stock/tradingInfo/${code}`, {
        headers: { Authorization: `Bearer ${account.token}` },
      })
      .then(async (res) => {
        console.log(res);
        // setData(res?.data?.data);
        let data = res?.data?.data;
        await setOverview(data?.overview);
        await setStockInfo(data?.stockInfo);
        await setTradingInfo(data?.tradingInfo);
        await setStockDealInfo(data?.stockDeal);
        await setFinanceReport(data?.reports);
        await setDataRefByCode(data?.dataRefByCode);
        await setDataRefByCode(data?.dataRefByCode);
        await setIndustryProfile(data?.industryProfile);
        await setFibonacciData(data?.fibonacciData);
      })
      .catch((err) => err);
    await setLoading(false);
  };

  return (
    <div className="stock-detail">
      <>
        {loading ? (
          <Skeleton />
        ) : (
          <FullWidthTabs
            stockInfo={stockInfo}
            stockDeal={stockDealInfo}
            financeReport={financeReport}
            overview={overview}
            dataRefByCode={dataRefByCode}
            industryProfile={industryProfile}
            fibonacciData={fibonacciData}
            ticker={ticker}
          />
        )}
      </>
    </div>
  );
};

export default Typography;
