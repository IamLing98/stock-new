import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { Grid, Card, Box, MenuItem, TextField, Typography, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

//chart type
import * as am5xy from '@amcharts/amcharts5/xy';
import moment from 'moment';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: '#fff',
        color: '#fff',
        overflow: 'hidden',
        position: 'relative'
    },
    content: {
        padding: '20px !important'
    }
}));
const columns = [
    { name: 'code', label: 'Mã CK' },
    { name: 'lastPrice', label: 'Giá' },
    { name: 'changePrice1d', label: 'Thay đổi' },
    { name: 'accumulatedVal', label: 'Giá trị' }
];
const Top10Stocks = (props) => {
    // const account = useSelector((state) => state.account);
    // const classes = useStyles();
    // const [chartData, setChartData] = useState({});
    
    // // const [dataAccumulatedVal, setAccumulatedVal] = useState([]);
    // const chartID = props.chartID;
    // // San : HNX | VNINDEX | VN30

    // //q=index:VNIndex~avgVol20p:gte:10000~changePrice1dPct:gt:0&size=10&sort=changePrice1dPct => search tăng
    // //q=index:VNIndex~avgVol20p:gte:10000~changePrice1dPct:lt:0&size=10&sort=changePrice1dPct:asc => search giảm
    // //q=index:VNIndex~accumulatedVal:gt:0&size=10&sort=accumulatedVal => giá trị giao dịch lớn nhất
    // //q=index:VNIndex~avgVol20p:gte:10000~changeVol20p:gte:100&size=10&sort=changeVol20p => Đột biến KLGD
    // //size=10&q=index:VNIndex~avgVol20p:gte:10000&sort=changeVolPt1p => Thoả thuận đột bến
    
    // useEffect(() => {
    //     getData(chartID);
    //     if (chartData && chartData?.length > 0) {
    //         generateChart();
    //     }
    // }, [chartID, JSON.stringify(chartData)]);

    // const getData = async (chartID) => {
    //     // var chartIndex = '';
    //     // switch (chartID) {
    //     //     case '1':
    //     //         chartIndex = 'VNIndex';
    //     //         break;
    //     //     case '2':
    //     //         chartIndex = 'HNX';
    //     //         break;
    //     //     case '3':
    //     //         chartIndex = 'VN30';
    //     //         break;
    //     // }
    //     // await axios
    //     //     .get(config.API_SERVER + `stock/topStick/`+ chartIndex, { headers: { Authorization: `Bearer ${account.token}` } })
    //     //     .then(async (res) => {
    //     //         let data = res?.data;
    //     //         await setChartData(data.data);
    //     //         console.log("chartData", chartData)
    //     //     })
    //     //     .catch((err) => err);
    // };

    // const processData = () => {
    //     const dataTmp = [];
    //     const dataPrice = [];
    //     const dataChangePrice = [];
    //     const dataChangePrecent = [];
    //     const dataAccumulatedVal = [];

    //     return dataTmp;
    // };

    // const generateChart = () => {
    //     // Create root element
    //     // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    //     var root = am5.Root.new(chartID);

    //     // Set themes
    //     // https://www.amcharts.com/docs/v5/concepts/themes/
    //     root.setThemes([am5themes_Animated.new(root)]);

    //     // Create chart
    //     // https://www.amcharts.com/docs/v5/charts/xy-chart/
    //     var chart = root.container.children.push(
    //         am5xy.XYChart.new(root, {
    //             panX: false,
    //             panY: false,
    //             wheelX: 'none',
    //             wheelY: 'none',
    //             layout: root.horizontalLayout
    //         })
    //     );

    //     // Add legend
    //     // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    //     var legendData = [];
    //     var legend = chart.children.push(
    //         am5.Legend.new(root, {
    //             nameField: 'name',
    //             fillField: 'color',
    //             strokeField: 'color',
    //             //centerY: am5.p50,
    //             marginLeft: 20,
    //             y: 20,
    //             layout: root.verticalLayout,
    //             clickTarget: 'none'
    //         })
    //     );

    //     var data = processData();

    //     // Create axes
    //     // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    //     var yAxis = chart.yAxes.push(
    //         am5xy.CategoryAxis.new(root, {
    //             categoryField: 'code',
    //             renderer: am5xy.AxisRendererY.new(root, {
    //                 minGridDistance: 10
    //             }),
    //             tooltip: am5.Tooltip.new(root, {})
    //         })
    //     );

    //     yAxis.get('renderer').labels.template.setAll({
    //         fontSize: 12,
    //         location: 0.5
    //     });

    //     yAxis.data.setAll(data);

    //     var xAxis = chart.xAxes.push(
    //         am5xy.ValueAxis.new(root, {
    //             renderer: am5xy.AxisRendererX.new(root, {}),
    //             tooltip: am5.Tooltip.new(root, {})
    //         })
    //     );

    //     // Add series
    //     // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    //     var series = chart.series.push(
    //         am5xy.ColumnSeries.new(root, {
    //             xAxis: xAxis,
    //             yAxis: yAxis,
    //             valueXField: 'val',
    //             categoryYField: 'code',
    //             tooltip: am5.Tooltip.new(root, {
    //                 pointerOrientation: 'horizontal'
    //             })
    //         })
    //     );

    //     series.columns.template.setAll({
    //         tooltipText: '{categoryY}: [bold]{valueX}[/]',
    //         width: am5.percent(90),
    //         strokeOpacity: 0
    //     });

    //     series.columns.template.adapters.add('fill', function (fill, target) {
    //         if (target.dataItem) {
    //             switch (target.dataItem.dataContext.cate) {
    //                 case 1:
    //                     return chart.get('colors').getIndex(0);
    //                     break;
    //                 case 2:
    //                     return chart.get('colors').getIndex(1);
    //                     break;
    //                 case 3:
    //                     return chart.get('colors').getIndex(2);
    //                     break;
    //                 case 4:
    //                     return chart.get('colors').getIndex(3);
    //                     break;
    //             }
    //         }
    //         return fill;
    //     });

    //     series.data.setAll(data);

    //     function createRange(label, category, color) {
    //         var rangeDataItem = yAxis.makeDataItem({
    //             category: category
    //         });

    //         var range = yAxis.createAxisRange(rangeDataItem);

    //         rangeDataItem.get('label').setAll({
    //             fill: color,
    //             text: label,
    //             location: 1,
    //             fontWeight: 'bold',
    //             dx: -130
    //         });

    //         rangeDataItem.get('grid').setAll({
    //             stroke: color,
    //             strokeOpacity: 1,
    //             location: 1
    //         });

    //         rangeDataItem.get('tick').setAll({
    //             stroke: color,
    //             strokeOpacity: 1,
    //             location: 1,
    //             visible: true,
    //             length: 130
    //         });

    //         legendData.push({ name: label, color: color });
    //     }

    //     createRange('Giá', '', chart.get('colors').getIndex(0));
    //     createRange('Thay đổi', '', chart.get('colors').getIndex(1));
    //     createRange('% Thay đổi', '', chart.get('colors').getIndex(2));
    //     createRange('Giá trị', '', chart.get('colors').getIndex(3));

    //     legend.data.setAll(legendData);

    //     // Add cursor
    //     // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    //     var cursor = chart.set(
    //         'cursor',
    //         am5xy.XYCursor.new(root, {
    //             xAxis: xAxis,
    //             yAxis: yAxis
    //         })
    //     );

    //     // Make stuff animate on load
    //     // https://www.amcharts.com/docs/v5/concepts/animations/
    //     series.appear();
    //     chart.appear(1000, 100);
    // };

    return (
        // <React.Fragment>
        //     <Grid container direction="column">
        //         <Grid style={{ height: 450 }} id={chartID}></Grid>
        //     </Grid>
        // </React.Fragment>
        <h1>This is chart top 10</h1>
    );
};
export default Top10Stocks;
