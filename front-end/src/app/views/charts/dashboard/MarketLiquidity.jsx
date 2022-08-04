import React, { useLayoutEffect } from 'react';

// material-ui
import { Grid, Card, Box, MenuItem, TextField, Typography, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import MainCard from '../../../../ui-component/cards/MainCard';
import { gridSpacing } from '../../../../store/constant';

import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

//chart type
import * as am5hierarchy from '@amcharts/amcharts5/hierarchy';
import * as am5stock from '@amcharts/amcharts5/stock';
import * as am5xy from '@amcharts/amcharts5/xy';

// project imports
import chartData from '../chart-data/MarketBreadth-data';

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

function MarketLiquidity(props) {
    const classes = useStyles();
    const chartID = props.chartID;

    useLayoutEffect(() => {
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
  var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
    behavior: "none"
  }));
  cursor.lineY.set("visible", false);
  
  
  // The data
  var data = chartData;
  
  
  // Create axes
  // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
  var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
    categoryField: "time",
    startLocation: 1,
    endLocation: 1,
    renderer: am5xy.AxisRendererX.new(root, {}),
    tooltip: am5.Tooltip.new(root, {})
  }));
  
  xAxis.data.setAll(data);
  
  var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  }));
  
  // Add series
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
  
  function createSeries(name, field) {
    var series = chart.series.push(am5xy.LineSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      stacked:true,
      valueYField: field,
      categoryXField: "time",
      tooltip: am5.Tooltip.new(root, {
        pointerOrientation: "horizontal",
        labelText: "[bold]{name}[/]\n{categoryX}: {valueY}"
      })
    }));
  
    series.fills.template.setAll({
      fillOpacity: 0.5,
      visible: true
    });
  
    series.data.setAll(data);
    series.appear(1000);
  }
  
  createSeries("Phiên trước", "noChange");
  createSeries("Phiên sau", "decline");
//   createSeries("Bicycles", "bicycles");
  
  // Add scrollbar
  // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
  chart.set("scrollbarX", am5.Scrollbar.new(root, {
    orientation: "horizontal"
  }));
  
  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  chart.appear(1000, 100);
    }, [chartID]);

    return (
        <React.Fragment>
            <MainCard title="Thanh khoản thị trường" border={false} className={classes.card} contentClass={classes.content}>
                <Grid container direction="column">
                    <Grid style={{ height: 300 }} id={chartID}>
                        {' '}
                    </Grid>{' '}
                </Grid>{' '}
            </MainCard>{' '}
        </React.Fragment>
    );
}
export default MarketLiquidity;
