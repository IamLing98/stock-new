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
import chartData from '../chart-data/multi-tree-chart';

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

function HNIndexChart(props) {
    const classes = useStyles();
    const chartID = props.chartID;

    useLayoutEffect(() => {
        var root = am5.Root.new(chartID);

        const myTheme = am5.Theme.new(root);

        var stockChart = root.container.children.push(am5stock.StockChart.new(root, {}));

        root.numberFormatter.set('numberFormat', '#,###.00');

        var mainPanel = stockChart.panels.push(
            am5stock.StockPanel.new(root, {
                wheelY: 'zoomX',
                panX: true,
                panY: true
            })
        );
        // Create value axis
        // -------------------------------------------------------------------------------
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        var valueAxis = mainPanel.yAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {
                    pan: 'zoom'
                }),
                extraMin: 0.1, // adds some space for for main series
                tooltip: am5.Tooltip.new(root, {}),
                numberFormat: '#,###.00',
                extraTooltipPrecision: 2
            })
        );

        var dateAxis = mainPanel.xAxes.push(
            am5xy.GaplessDateAxis.new(root, {
                baseInterval: {
                    timeUnit: 'minute',
                    count: 1
                },
                renderer: am5xy.AxisRendererX.new(root, {}),
                tooltip: am5.Tooltip.new(root, {})
            })
        );

        // add range which will show current value
        var currentValueDataItem = valueAxis.createAxisRange(valueAxis.makeDataItem({ value: 0 }));
        var currentLabel = currentValueDataItem.get('label');
        if (currentLabel) {
            currentLabel.setAll({
                fill: am5.color(0xffffff),
                background: am5.Rectangle.new(root, { fill: am5.color(0x000000) })
            });
        }

        var currentGrid = currentValueDataItem.get('grid');
        if (currentGrid) {
            currentGrid.setAll({ strokeOpacity: 0.5, strokeDasharray: [2, 5] });
        }

        // Add series
        // -------------------------------------------------------------------------------
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        var valueSeries = mainPanel.series.push(
            am5xy.CandlestickSeries.new(root, {
                name: 'AMCH',
                clustered: false,
                valueXField: 'Date',
                valueYField: 'Close',
                highValueYField: 'High',
                lowValueYField: 'Low',
                openValueYField: 'Open',
                calculateAggregates: true,
                xAxis: dateAxis,
                yAxis: valueAxis,
                legendValueText:
                    'open: [bold]{openValueY}[/] high: [bold]{highValueY}[/] low: [bold]{lowValueY}[/] close: [bold]{valueY}[/]',
                legendRangeValueText: ''
            })
        );

        // Set main value series
        // -------------------------------------------------------------------------------
        // https://www.amcharts.com/docs/v5/charts/stock-chart/#Setting_main_series
        stockChart.set('stockSeries', valueSeries);

        // Add a stock legend
        // -------------------------------------------------------------------------------
        // https://www.amcharts.com/docs/v5/charts/stock-chart/stock-legend/
        var valueLegend = mainPanel.plotContainer.children.push(
            am5stock.StockLegend.new(root, {
                stockChart: stockChart
            })
        );

        // Set main series
        // -------------------------------------------------------------------------------
        // https://www.amcharts.com/docs/v5/charts/stock-chart/#Setting_main_series
        valueLegend.data.setAll([valueSeries]);

        // Add cursor(s)
        // -------------------------------------------------------------------------------
        // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        mainPanel.set(
            'cursor',
            am5xy.XYCursor.new(root, {
                yAxis: valueAxis,
                xAxis: dateAxis,
                snapToSeries: [valueSeries],
                snapToSeriesBy: 'y!'
            })
        );

        // Add scrollbar
        // -------------------------------------------------------------------------------
        // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
        var scrollbar = mainPanel.set(
            'scrollbarX',
            am5xy.XYChartScrollbar.new(root, {
                orientation: 'horizontal',
                height: 50
            })
        );
        stockChart.toolsContainer.children.push(scrollbar);

        var sbDateAxis = scrollbar.chart.xAxes.push(
            am5xy.GaplessDateAxis.new(root, {
                baseInterval: {
                    timeUnit: 'minute',
                    count: 1
                },
                renderer: am5xy.AxisRendererX.new(root, {})
            })
        );

        var sbValueAxis = scrollbar.chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {})
            })
        );

        var sbSeries = scrollbar.chart.series.push(
            am5xy.LineSeries.new(root, {
                valueYField: 'Close',
                valueXField: 'Date',
                xAxis: sbDateAxis,
                yAxis: sbValueAxis
            })
        );

        sbSeries.fills.template.setAll({
            visible: true,
            fillOpacity: 0.3
        });

        // Set up series type switcher
        // -------------------------------------------------------------------------------
        // https://www.amcharts.com/docs/v5/charts/stock/toolbar/series-type-control/
        var seriesSwitcher = am5stock.SeriesTypeControl.new(root, {
            stockChart: stockChart
        });

        seriesSwitcher.events.on('selected', function (ev) {
            setSeriesType(ev.item.id);
        });

        function getNewSettings(series) {
            var newSettings = [];
            am5.array.each(
                [
                    'name',
                    'valueYField',
                    'highValueYField',
                    'lowValueYField',
                    'openValueYField',
                    'calculateAggregates',
                    'valueXField',
                    'xAxis',
                    'yAxis',
                    'legendValueText',
                    'stroke',
                    'fill'
                ],
                function (setting) {
                    newSettings[setting] = series.get(setting);
                }
            );
            return newSettings;
        }

        function setSeriesType(seriesType) {
            // Get current series and its settings
            var currentSeries = stockChart.get('stockSeries');
            var newSettings = getNewSettings(currentSeries);

            // Remove previous series
            var data = currentSeries.data.values;
            mainPanel.series.removeValue(currentSeries);

            // Create new series
            var series;
            switch (seriesType) {
                case 'line':
                    series = mainPanel.series.push(am5xy.LineSeries.new(root, newSettings));
                    break;
                case 'candlestick':
                case 'procandlestick':
                    newSettings.clustered = false;
                    series = mainPanel.series.push(am5xy.CandlestickSeries.new(root, newSettings));
                    if (seriesType == 'procandlestick') {
                        series.columns.template.get('themeTags').push('pro');
                    }
                    break;
                case 'ohlc':
                    newSettings.clustered = false;
                    series = mainPanel.series.push(am5xy.OHLCSeries.new(root, newSettings));
                    break;
            }

            // Set new series as stockSeries
            if (series) {
                valueLegend.data.removeValue(currentSeries);
                series.data.setAll(data);
                stockChart.set('stockSeries', series);
                var cursor = mainPanel.get('cursor');
                if (cursor) {
                    cursor.set('snapToSeries', [series]);
                }
                valueLegend.data.insertIndex(0, series);
            }
        }

        // Data generator
        var firstDate = new Date();
        var lastDate;
        var value = 1200;

        // data
        function generateChartData() {
            var chartData = [];

            for (var i = 0; i < 50; i++) {
                var newDate = new Date(firstDate);
                newDate.setMinutes(newDate.getMinutes() - i);

                value += Math.round((Math.random() < 0.49 ? 1 : -1) * Math.random() * 10);

                var open = value + Math.round(Math.random() * 16 - 8);
                var low = Math.min(value, open) - Math.round(Math.random() * 5);
                var high = Math.max(value, open) + Math.round(Math.random() * 5);

                chartData.unshift({
                    Date: newDate.getTime(),
                    Close: value,
                    Open: open,
                    Low: low,
                    High: high
                });

                lastDate = newDate;
            }
            return chartData;
        }

        var data = generateChartData();

        // set data to all series
        valueSeries.data.setAll(data);
        sbSeries.data.setAll(data);

        // update data
        var previousDate;

        setInterval(function () {
            var date = Date.now();
            var lastDataObject = valueSeries.data.getIndex(valueSeries.data.length - 1);
            if (lastDataObject) {
                var previousDate = lastDataObject.Date;
                var previousValue = lastDataObject.Close;

                value = am5.math.round(previousValue + (Math.random() < 0.5 ? 1 : -1) * Math.random() * 2, 2);

                var high = lastDataObject.High;
                var low = lastDataObject.Low;
                var open = lastDataObject.Open;

                if (am5.time.checkChange(date, previousDate, 'minute')) {
                    open = value;
                    high = value;
                    low = value;

                    var dObj1 = {
                        Date: date,
                        Close: value,
                        Open: value,
                        Low: value,
                        High: value
                    };

                    valueSeries.data.push(dObj1);
                    sbSeries.data.push(dObj1);
                    previousDate = date;
                } else {
                    if (value > high) {
                        high = value;
                    }

                    if (value < low) {
                        low = value;
                    }

                    var dObj2 = {
                        Date: date,
                        Close: value,
                        Open: open,
                        Low: low,
                        High: high
                    };

                    valueSeries.data.setIndex(valueSeries.data.length - 1, dObj2);
                    sbSeries.data.setIndex(sbSeries.data.length - 1, dObj2);
                }
                // update current value
                if (currentLabel) {
                    currentValueDataItem.animate({ key: 'value', to: value, duration: 500, easing: am5.ease.out(am5.ease.cubic) });
                    currentLabel.set('text', stockChart.getNumberFormatter().format(value));
                    var bg = currentLabel.get('background');
                    if (bg) {
                        if (value < open) {
                            bg.set('fill', root.interfaceColors.get('negative'));
                        } else {
                            bg.set('fill', root.interfaceColors.get('positive'));
                        }
                    }
                }
            }
        }, 1000);
    }, [chartID]);

    return (
        <React.Fragment>
            <MainCard border={false} className={classes.card} contentClass={classes.content}>
                <Grid container direction="column">
                    <Grid style={{ height: 300 }} id={chartID}></Grid>
                </Grid>
            </MainCard>
        </React.Fragment>
    );
}
export default HNIndexChart;
