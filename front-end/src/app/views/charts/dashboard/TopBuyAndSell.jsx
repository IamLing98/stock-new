import React, { useEffect, useState } from "react";

import { Row, Col } from "react-bootstrap";

import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

//chart type
import * as am5xy from "@amcharts/amcharts5/xy";

// style constant

const TopBuyAndSell = (props) => {
  const chartID = props.chartID;
  const dateNow = new Date().toISOString().split("T")[0].toString().trim();

  const [dataBuy, setDataBuy] = useState([]);
  const [dataSell, setDataSell] = useState([]);

  //tạo chart

  function createChart() {
    console.log("vô đây")
    let root = am5.Root.new(chartID);

    const myTheme = am5.Theme.new(root);
    root.numberFormatter.set("numberFormat", "#,###");
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
      })
    );

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
    xRenderer.labels.template.setAll({
      rotation: -90,
      centerY: am5.p50,
      centerX: am5.p100,
      paddingRight: 15,
    });

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: "code",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        sequencedInterpolation: true,
        categoryXField: "code",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{value}",
        }),
      })
    );

    series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5 });
    series.columns.template.adapters.add("fill", function (fill, target) {
      if (target.dataItem.dataContext.value > 0) {
        return am5.color(0x50b300);
      } else {
        return am5.color(0xb30000);
      }
    });

    let data = processData();
    xAxis.data.setAll(data);
    series.data.setAll(data);

    series.appear(1000);
    chart.appear(1000, 100);
  }
  useEffect(() => {
    crawlerSell();
  }, [chartID, JSON.stringify(dataSell)]);

  useEffect(() => {
    crawlerBuy();
    if (dataBuy && dataBuy?.length > 0) {
      createChart();
    }
  }, [chartID, JSON.stringify(dataBuy)]);

  const crawlerBuy = () => {
    //Set data buy
    fetch(
      "https://finfo-api.vndirect.com.vn/v4/foreigns?q=type:STOCK,IFC,ETF~netVal:gt:0~tradingDate:" +
        dateNow +
        "&sort=tradingDate~netVal:desc&size=10&fields=code,netVal,tradingDate"
    )
      .then((res) => res.json())
      .then((json) => {
        if (json != null) {
          setDataBuy(json.data);
        }
      });
  };
  const crawlerSell = () => {
    fetch(
      "https://finfo-api.vndirect.com.vn/v4/foreigns?q=type:STOCK,IFC,ETF~netVal:lt:0~tradingDate:" +
        dateNow +
        "&sort=tradingDate~netVal:asc&size=10&fields=code,netVal,tradingDate"
    )
      .then((res) => res.json())
      .then((json) => {
        if (json != null) {
          setDataSell(json.data);
        }
      });
  };

  //Process data
  const processData = () => {
    console.log("vô đây");
    const data = [];

    dataBuy?.forEach((item) => {
      let obj = { type: "Buy", code: item.code, value: item.netVal };
      data.push(obj);
    });
    
    dataSell?.forEach((item) => {
      let obj = { type: "Sell", code: item.code, value: item.netVal };
      data.push(obj);
    });
    return data;
  };

  return (
    <Row>
      {/* <Col lg={12} md={12} sm={12} xs={12} className="mb-4">
        <div id={{ chartID }}></div>
      </Col> */}
    </Row>
  );
};
export default TopBuyAndSell;
