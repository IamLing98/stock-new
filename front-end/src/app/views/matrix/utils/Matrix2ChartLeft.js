import React, { useState, useEffect } from "react";
import * as ReactDom from "react-dom";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import HC_more from "highcharts/highcharts-more"; //modul
import Skeleton from "react-loading-skeleton";

HC_more(Highcharts); //init modu

const options = {
  chart: {
    type: "bubble",
    plotBorderWidth: 1,
    zoomType: "xy",
  },

  legend: {
    enabled: false,
  },

  title: {
    text: " ",
  },

  subtitle: {
    text: " ",
  },

  accessibility: {
    point: {
      valueDescriptionFormat: "{index}. {point.name}, fat: {point.x}, sugar: {point.y}, obesity: {point.z}.",
    },
  },
  credits: {
    enabled: false,
  },

  xAxis: {
    gridLineWidth: 1,
    title: {
      text: "MK Control",
    },
    labels: {
      format: "{value}",
    },
    plotLines: [
      {
        color: "black",
        dashStyle: "dot",
        width: 2,
        value: 0,
        label: {
          rotation: 0,
          y: 15,
          style: {
            fontStyle: "italic",
          },
          // text: "Safe fat intake 65g/day",
        },
        zIndex: 3,
      },
    ],
    accessibility: {
      rangeDescription: "Range: 60 to 100 grams.",
    },
  },

  yAxis: {
    startOnTick: false,
    endOnTick: false,
    title: {
      text: "Score",
    },
    labels: {
      format: "{value}",
    },
    maxPadding: 0.2,
    plotLines: [
      {
        color: "black",
        dashStyle: "dot",
        width: 2,
        value: 0,
        label: {
          align: "right",
          style: {
            fontStyle: "italic",
          },
          // text: "Safe sugar intake 50g/day",
          x: -10,
        },
        zIndex: 3,
      },
    ],
    accessibility: {
      rangeDescription: "Range: 0 to 160 grams.",
    },
  },

  tooltip: {
    useHTML: true,
    headerFormat: "<table>",
    pointFormat:
      '<tr><th colspan="2"><h3>{point.ticker}</h3></th></tr>' +
      "<tr><th>Score:</th><td>{point.x}</td></tr>" +
      "<tr><th>MK Control:</th><td>{point.y}</td></tr>" +
      "<tr><th>Score*Volume:</th><td>{point.z}</td></tr>",
    footerFormat: "</table>",
    followPointer: true,
  },

  plotOptions: {
    series: {
      dataLabels: {
        enabled: true,
        format: "{point.name}",
      },
    },
  },

  series: [
    {
      data: [],
    },
  ],
};

const fakeData = [
  { x: 95, y: 95, z: 13.8, name: "BE", country: "Belgium" },
  { x: 86.5, y: 102.9, z: 14.7, name: "DE", country: "Germany" },
  { x: 80.8, y: 91.5, z: 15.8, name: "FI", country: "Finland" },
  { x: 80.4, y: 102.5, z: 12, name: "NL", country: "Netherlands" },
  { x: 80.3, y: 86.1, z: 11.8, name: "SE", country: "Sweden" },
  { x: 78.4, y: 70.1, z: 16.6, name: "ES", country: "Spain" },
  { x: 74.2, y: 68.5, z: 14.5, name: "FR", country: "France" },
  { x: 73.5, y: 83.1, z: 10, name: "NO", country: "Norway" },
  { x: 71, y: 93.2, z: 24.7, name: "UK", country: "United Kingdom" },
  { x: 69.2, y: 57.6, z: 10.4, name: "IT", country: "Italy" },
  { x: 68.6, y: 20, z: 16, name: "RU", country: "Russia" },
  { x: 65.5, y: 126.4, z: 35.3, name: "US", country: "United States" },
  { x: 65.4, y: 50.8, z: 28.5, name: "HU", country: "Hungary" },
  { x: 63.4, y: 51.8, z: 15.4, name: "PT", country: "Portugal" },
  { x: 64, y: 82.9, z: 31.3, name: "NZ", country: "New Zealand" },
];
const Matrix2ChartLeft = ({ data }) => {
  const [initOption, setInitOption] = useState(options);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      let newInitOption = { ...initOption };
      newInitOption.series = [{ data: data }];
      setInitOption(newInitOption);
      setLoading(false);
    }
  }, [JSON.stringify(data)]);

  const chartComponentRef = React.useRef(null);

  return (
    <>
      {loading ? (
        <Skeleton />
      ) : (
        <HighchartsReact highcharts={Highcharts} options={initOption} ref={chartComponentRef} />
      )}
    </>
  );
};

export default Matrix2ChartLeft;
