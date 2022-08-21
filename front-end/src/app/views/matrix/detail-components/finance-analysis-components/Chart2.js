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
    title: {
        text: 'Tỷ suất lợi nhuận'
    },
    xAxis: {
        categories: ['Q2', 'Q3', 'Q4', 'Q1']
    },
    yAxis: [
        {
            // Primary yAxis
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: 'tỷ VND',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            }
        },
        {
            // Secondary yAxis
            title: {
                text: '%',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite: true
        }
    ],
    labels: {
        items: [
            {
                // html: 'Total fruit consumption',
                style: {
                    left: '50px',
                    top: '18px',
                    color:
                        // theme
                        (Highcharts.defaultOptions.title.style && Highcharts.defaultOptions.title.style.color) || 'black'
                }
            }
        ]
    },
    series: [
        {
            type: 'column',
            name: 'Doanh thu thuần',
            data: [3, 2, 1, 3],
            color: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                    [0, '#90ED7D'],
                    [1, '#90ED7D']
                ]
            }
        },
        {
            type: 'column',
            name: 'Lợi nhuận ròng',
            data: [2, 3, 5, 7],
            color: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                    [0, '#0A9574'],
                    [1, '#0A9574']
                ]
            }
        },
        {
            type: 'column',
            name: 'Lợi nhuận gộp',
            data: [4, 3, 3, 9],
            color: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                    [0, '#E07924'],
                    [1, '#E07924']
                ]
            }
        },
        {
            type: 'spline',
            name: 'Tỷ suẩt lợi nhuận gộp biên',
            data: [3, 2.67, 3, 6.33],
            marker: {
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[3],
                fillColor: 'white'
            },
            yAxis: 1,
            color: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                    [0, '#EABD10'],
                    [1, '#EABD10']
                ]
            },
            size: 400
        }
        // {
        //     type: 'pie',
        //     name: 'Total consumption',
        //     data: [
        //         {
        //             name: 'Jane',
        //             y: 13,
        //             color: Highcharts.getOptions().colors[0] // Jane's color
        //         },
        //         {
        //             name: 'John',
        //             y: 23,
        //             color: Highcharts.getOptions().colors[1] // John's color
        //         },
        //         {
        //             name: 'Joe',
        //             y: 19,
        //             color: Highcharts.getOptions().colors[2] // Joe's color
        //         }
        //     ],
        //     center: [100, 80],
        //     size: 100,
        //     showInLegend: false,
        //     dataLabels: {
        //         enabled: false
        //     }
        // }
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
