import React, { useEffect, useState, useLayoutEffect } from "react";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";

export default function Matrix2ChartRight({ dataChart }) {
  const [option, setOption] = useState();

  const chartID = "chartdivv";

  useLayoutEffect(() => {
    if (dataChart?.length > 2) {
      let root = am5.Root.new("chartdivv");

      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      root.setThemes([am5themes_Animated.new(root)]);

      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: false,
          panY: false,
          wheelX: "panY",
          wheelY: "zoomY",
          layout: root.verticalLayout,
        })
      );

      // Add scrollbar
      // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
      chart.set(
        "scrollbarY",
        am5.Scrollbar.new(root, {
          orientation: "vertical",
        })
      );

      let data = [
        dataChart[2],
        // {
        //   year: "2021",
        //   europe: 2.5,
        //   namerica: 2.5,
        //   asia: 2.1,
        //   lamerica: 1,
        //   meast: 0.8,
        //   africa: 0.4,
        // },
        // {
        //   year: "2022",
        //   europe: 2.6,
        //   namerica: 2.7,
        //   asia: 2.2,
        //   lamerica: 0.5,
        //   meast: 0.4,
        //   africa: 0.3,
        // },
        // {
        //   year: "2023",
        //   europe: 2.8,
        //   namerica: 2.9,
        //   asia: 2.4,
        //   lamerica: 0.3,
        //   meast: 0.9,
        //   africa: 0.5,
        // },
      ];

      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      let yAxis = chart.yAxes.push(
        am5xy.CategoryAxis.new(root, {
          categoryField: "label",
          renderer: am5xy.AxisRendererY.new(root, {}),
          tooltip: am5.Tooltip.new(root, {}),
        })
      );

      yAxis.data.setAll(data);

      let xAxis = chart.xAxes.push(
        am5xy.ValueAxis.new(root, {
          min: 0,
          renderer: am5xy.AxisRendererX.new(root, {}),
        })
      );

      // Add legend
      // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
      let legend = chart.children.push(
        am5.Legend.new(root, {
          centerX: am5.p50,
          x: am5.p50,
        })
      );

      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      function makeSeries(name, fieldName) {
        let series = chart.series.push(
          am5xy.ColumnSeries.new(root, {
            name: name,
            stacked: true,
            xAxis: xAxis,
            yAxis: yAxis,
            baseAxis: yAxis,
            valueXField: fieldName,
            categoryYField: "label",
          })
        );

        series.columns.template.setAll({
          tooltipText: "{name}, {categoryY}: {valueX}",
          tooltipY: am5.percent(90),
        });
        series.data.setAll(data);

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear();

        series.bullets.push(function () {
          return am5.Bullet.new(root, {
            sprite: am5.Label.new(root, {
              text: "{valueX}",
              fill: root.interfaceColors.get("alternativeText"),
              centerY: am5.p50,
              centerX: am5.p50,
              populateText: true,
            }),
          });
        });

        legend.data.push(series);
      }

      makeSeries("Giảm mạnh", "strongDown");
      makeSeries("Giảm vừa", "mediumDown");
      makeSeries("Giảm nhẹ", "softDown");
      makeSeries("Tham chiếu", "refer");
      makeSeries("Tăng nhẹ", "softUp");
      makeSeries("Tăng vừa", "mediumUp");
      makeSeries("Tăng mạnh", "strongUp");

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      chart.appear(1000, 100);
    }
  }, [JSON.stringify(dataChart)]);

  return <div id="chartdivv"></div>;
}
