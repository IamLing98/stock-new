import React, { useEffect, useState } from "react";

import { Row, Col } from "react-bootstrap";

import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

//chart type
import * as am5xy from "@amcharts/amcharts5/xy";
import { SimpleCard } from "@gull";

// style constant

const TopBuyAndSell = (props) => {
  const chartID = props.chartID;
  const dateNow = new Date().toISOString().split("T")[0].toString().trim();

  const [dataBuy, setDataBuy] = useState([]);
  const [dataSell, setDataSell] = useState([]);

  //tạo chart

  // function createChart() {
  //   console.log("vô đây")
  //   let root = am5.Root.new(chartID);

  //   const myTheme = am5.Theme.new(root);
  //   root.numberFormatter.set("numberFormat", "#,###");
  //   let chart = root.container.children.push(
  //     am5xy.XYChart.new(root, {
  //       panX: true,
  //       panY: true,
  //       wheelX: "panX",
  //       wheelY: "zoomX",
  //       pinchZoomX: true,
  //     })
  //   );

  //   // Add cursor
  //   // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
  //   let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
  //   cursor.lineY.set("visible", false);

  //   // Create axes
  //   // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
  //   let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
  //   xRenderer.labels.template.setAll({
  //     rotation: -90,
  //     centerY: am5.p50,
  //     centerX: am5.p100,
  //     paddingRight: 15,
  //   });

  //   let xAxis = chart.xAxes.push(
  //     am5xy.CategoryAxis.new(root, {
  //       maxDeviation: 0.3,
  //       categoryField: "code",
  //       renderer: xRenderer,
  //       tooltip: am5.Tooltip.new(root, {}),
  //     })
  //   );

  //   let yAxis = chart.yAxes.push(
  //     am5xy.ValueAxis.new(root, {
  //       maxDeviation: 0.3,
  //       renderer: am5xy.AxisRendererY.new(root, {}),
  //     })
  //   );

  //   // Create series
  //   // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
  //   let series = chart.series.push(
  //     am5xy.ColumnSeries.new(root, {
  //       name: "Series 1",
  //       xAxis: xAxis,
  //       yAxis: yAxis,
  //       valueYField: "value",
  //       sequencedInterpolation: true,
  //       categoryXField: "code",
  //       tooltip: am5.Tooltip.new(root, {
  //         labelText: "{value}",
  //       }),
  //     })
  //   );

  //   series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5 });
  //   series.columns.template.adapters.add("fill", function (fill, target) {
  //     if (target.dataItem.dataContext.value > 0) {
  //       return am5.color(0x50b300);
  //     } else {
  //       return am5.color(0xb30000);
  //     }
  //   });

  //   let data = processData();
  //   xAxis.data.setAll(data);
  //   series.data.setAll(data);

  //   series.appear(1000);
  //   chart.appear(1000, 100);
  // }
  // useEffect(() => {
  //   crawlerSell();
  // }, [chartID, JSON.stringify(dataSell)]);

  // useEffect(() => {
  //   crawlerBuy();
  //   if (dataBuy && dataBuy?.length > 0) {
  //     createChart();
  //   }
  // }, [chartID, JSON.stringify(dataBuy)]);

  // const crawlerBuy = () => {
  //   //Set data buy
  //   fetch(
  //     "https://finfo-api.vndirect.com.vn/v4/foreigns?q=type:STOCK,IFC,ETF~netVal:gt:0~tradingDate:" +
  //       dateNow +
  //       "&sort=tradingDate~netVal:desc&size=10&fields=code,netVal,tradingDate"
  //   )
  //     .then((res) => res.json())
  //     .then((json) => {
  //       if (json != null) {
  //         setDataBuy(json.data);
  //       }
  //     });
  // };
  // const crawlerSell = () => {
  //   fetch(
  //     "https://finfo-api.vndirect.com.vn/v4/foreigns?q=type:STOCK,IFC,ETF~netVal:lt:0~tradingDate:" +
  //       dateNow +
  //       "&sort=tradingDate~netVal:asc&size=10&fields=code,netVal,tradingDate"
  //   )
  //     .then((res) => res.json())
  //     .then((json) => {
  //       if (json != null) {
  //         setDataSell(json.data);
  //       }
  //     });
  // };

  // //Process data
  // const processData = () => {
  //   console.log("vô đây");
  //   const data = [];

  //   dataBuy.forEach((item) => {
  //     let obj = { type: "Buy", code: item.code, value: item.netVal };
  //     data.push(obj);
  //   });
    
  //   dataSell.forEach((item) => {
  //     let obj = { type: "Sell", code: item.code, value: item.netVal };
  //     data.push(obj);
  //   });
  //   return data;
  // };

  useEffect(() => {
    // Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new(chartID);


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: true,
  panY: true,
  wheelX: "panX",
  wheelY: "zoomX",
  pinchZoomX:true
}));

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
cursor.lineY.set("visible", false);


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
xRenderer.labels.template.setAll({
  rotation: -90,
  centerY: am5.p50,
  centerX: am5.p100,
  paddingRight: 15
});

var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  maxDeviation: 0.3,
  categoryField: "country",
  renderer: xRenderer,
  tooltip: am5.Tooltip.new(root, {})
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0.3,
  renderer: am5xy.AxisRendererY.new(root, {})
}));


// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  name: "Series 1",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  sequencedInterpolation: true,
  categoryXField: "country",
  tooltip: am5.Tooltip.new(root, {
    labelText:"{valueY}"
  })
}));

series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5 });
series.columns.template.adapters.add("fill", function(fill, target) {
  return chart.get("colors").getIndex(series.columns.indexOf(target));
});

series.columns.template.adapters.add("stroke", function(stroke, target) {
  return chart.get("colors").getIndex(series.columns.indexOf(target));
});


// Set data
var data = [{
  country: "USA",
  value: 2025
}, {
  country: "China",
  value: 1882
}, {
  country: "Japan",
  value: 1809
}, {
  country: "Germany",
  value: 1322
}, {
  country: "UK",
  value: 1122
}, {
  country: "France",
  value: 1114
}, {
  country: "India",
  value: 984
}, {
  country: "Spain",
  value: 711
}, {
  country: "Netherlands",
  value: 665
}, {
  country: "South Korea",
  value: 443
}, {
  country: "Canada",
  value: 441
}];

xAxis.data.setAll(data);
series.data.setAll(data);


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000);
chart.appear(1000, 100);
  }, []);

  return (
    <div>
      <div style={{height:250}} id={chartID}></div>
    </div>
  );
};
export default TopBuyAndSell;
