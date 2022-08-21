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
        value: 65,
        label: {
          rotation: 0,
          y: 15,
          style: {
            fontStyle: "italic",
          },
          text: "Safe fat intake 65g/day",
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
        value: 50,
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

const Matrix2ChartLeft = ({ data }) => {
  const [initOption, setInitOption] = useState(options);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      console.log("Prepare data: ", data);
      console.log("parseFloat( ", parseFloat("00"));
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
