import React, { useLayoutEffect, useEffect, useState } from 'react';

// material-ui
import { Grid, Card, Box, MenuItem, TextField, Typography, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import MainCard from '../../../../ui-component/cards/MainCard';

import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

//chart type
import * as am5xy from '@amcharts/amcharts5/xy';
import moment from 'moment';

// style constant
const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: '#fff',
        color: '#fff',
        overflow: 'hidden',
        position: 'relative'
    },
    content: {
        padding: '20px !important'
    },
    avatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.largeAvatar,
        backgroundColor: theme.palette.secondary[800],
        marginTop: '8px'
    },
    avatarRight: {
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.secondary[200],
        zIndex: 1
    },
    cardHeading: {
        fontSize: '2.125rem',
        fontWeight: 500,
        marginRight: '8px',
        marginTop: '14px',
        marginBottom: '6px'
    },
    subHeading: {
        fontSize: '1rem',
        fontWeight: 500,
        color: theme.palette.secondary[200]
    },
    avatarCircle: {
        cursor: 'pointer',
        ...theme.typography.smallAvatar,
        backgroundColor: theme.palette.secondary[200],
        color: theme.palette.secondary.dark
    },
    circleIcon: {
        transform: 'rotate3d(1, 1, 1, 45deg)'
    },
    menuItem: {
        marginRight: '14px',
        fontSize: '1.25rem'
    }
}));

const TopMarketInfluence = (props) => {
    const classes = useStyles();
    const chartID = props.chartID;
    const [dataChart, setDataChart] = useState([]);

    //tạo chart

    function createChart() {
        var root = am5.Root.new(chartID);

        const myTheme = am5.Theme.new(root);
        root.numberFormatter.set('numberFormat', '#,###');
        var chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: true,
                panY: true,
                wheelX: 'panX',
                wheelY: 'zoomX',
                pinchZoomX: true
            })
        );
        chart.numberFormatter = {
            decimalSeparator:",",thousandsSeparator:""
          };

        // Add cursor
        // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        var cursor = chart.set('cursor', am5xy.XYCursor.new(root, {}));
        cursor.lineY.set('visible', false);

        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
        xRenderer.labels.template.setAll({
            rotation: -90,
            centerY: am5.p50,
            centerX: am5.p100,
            paddingRight: 15
        });

        var xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                maxDeviation: 0.3,
                categoryField: 'code',
                renderer: xRenderer,
                tooltip: am5.Tooltip.new(root, {})
            })
        );

        var yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                maxDeviation: 0.3,
                renderer: am5xy.AxisRendererY.new(root, {})
            })
        );

        // Create series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        var series = chart.series.push(
            am5xy.ColumnSeries.new(root, {
                name: 'Series 1',
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: 'value',
                sequencedInterpolation: true,
                categoryXField: 'code',
                tooltip: am5.Tooltip.new(root, {
                    labelText: 'Điểm: '+'[bold]{value} [/]\n' + 'Volume: '+'[bold]{vol} [/]\n' + 'Giá: '+'[bold]{price} [/]\n'
                })
            })
        );

        series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5 });
        series.columns.template.adapters.add('fill', function (fill, target) {
            if(target.dataItem.dataContext.value > 0) {
                return am5.color(0x50b300);
            } else {
                return am5.color(0xb30000)
            }
        });

        var data = processData();
        xAxis.data.setAll(data);
        series.data.setAll(data);

        series.appear(1000);
        chart.appear(1000, 100);
    }

    useEffect(() => {
        crawlerData();
        if (dataChart && dataChart?.length > 0) {
            createChart();
        }
    }, [chartID, JSON.stringify(dataChart)]);

    const crawlerData = () => {
        //Set data buy
        fetch(
            'https://mkw-socket.vndirect.com.vn/mkwsocket/leaderlarger?index='+chartID
        )
            .then((res) => res.json())
            .then((json) => {
                if (json != null) {
                    setDataChart(json.data);
                }
            });
    };

    //Process data
    const processData = () => {
        const data = [];

        dataChart?.sort((f, s) => s.point - f.point).slice(0,20).forEach((item) => {
            var obj = { type: 'Positive', code: item.symbol, value: item.point, vol: item.vol, price: item.price };
            data.push(obj);
        });
        dataChart?.sort((f, s) => s.point - f.point).slice(dataChart.length-20,dataChart.length).forEach((item) => {
            var obj = { type: 'Minus', code: item.symbol, value: item.point, vol: item.vol, price: item.price };
            data.push(obj);
        });
        return data;
    };

    return (
        <React.Fragment>
                <Grid container direction="column">
                    <Grid style={{ height: 450 }} id={chartID}></Grid>
                </Grid>
        </React.Fragment>
    );
};
export default TopMarketInfluence;
