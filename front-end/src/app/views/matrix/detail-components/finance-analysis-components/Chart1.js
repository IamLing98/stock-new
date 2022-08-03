import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const defaultOptions = {
    chart: {
        type: 'spline'
    },
    title: {
        text: 'Biên lợi nhuận[Quý]'
    },
    // subtitle: {
    //     text: 'Biên lợi nhuận'
    // },
    xAxis: {
        categories: ['Q1', 'Q2', 'Q3', 'Q4'],
        accessibility: {
            description: 'Quý'
        }
    },
    yAxis: {
        title: {
            text: '%'
        },
        labels: {
            formatter: function () {
                return this.value + '%';
            }
        }
    },
    tooltip: {
        crosshairs: true,
        shared: true,
        valueSuffix: '{value}'
    },
    plotOptions: {
        spline: {
            marker: {
                radius: 4,
                lineColor: '#666666',
                lineWidth: 1
            }
        }
    },
    series: [
        {
            name: 'Tăng trưởng doanh thu thuần',
            marker: {
                symbol: 'square'
            },
            data: [
                7.0,
                6.9,
                9.5,

                {
                    y: 26.5,
                    marker: {
                        symbol: 'url(https://www.highcharts.com/samples/graphics/sun.png)'
                    },
                    accessibility: {
                        description: 'Sunny symbol, this is the warmest point in the chart.'
                    }
                }
            ]
        },
        {
            name: 'Tăng trưởng lợi nhuận ròng',
            marker: {
                symbol: 'diamond'
            },
            data: [
                {
                    y: 3.9,
                    marker: {
                        symbol: 'url(https://www.highcharts.com/samples/graphics/snow.png)'
                    },
                    accessibility: {
                        description: 'Snowy symbol, this is the coldest point in the chart.'
                    }
                },
                4.2,
                5.7,
                8.5
            ]
        }
    ]
};
export default function Chart({ data, termList }) {
    const [options, setOptions] = React.useState(defaultOptions);

    React.useEffect(() => {
        if (termList) {
            let newXAxis = {
                categories: termList.map((item) => `Q${item?.ReportTermID - 1}/${item?.YearPeriod}`),
                accessibility: {
                    description: 'Quý'
                }
            };
            setOptions({ ...options, xAxis: newXAxis, series: data });
        }
    }, [JSON.stringify(termList)]);

    return (
        <Card>
            <CardContent className="chart-wrapper">
                <HighchartsReact
                    container={<div style={{ witdh: '100%' }}></div>}
                    highcharts={Highcharts}
                    options={options}
                    credits={{ enabled: false }}
                />
            </CardContent>
        </Card>
    );
}
