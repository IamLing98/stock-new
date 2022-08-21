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
        text: 'Tổng tài sản/Nợ phải trả'
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
            min: 0,
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
    credits: {
        enabled: false
    },
    series: [
        {
            type: 'column',
            name: 'Tổng tài sản',
            data: [3, 2, 1, 3]
        },
        {
            type: 'column',
            name: 'Nợ phải trả',
            data: [4, 3, 3, 9]
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
            let newValues = [];
            // eslint-disable-next-line no-unused-expressions
            data[0].data?.forEach((element, index) => {
                newValues.push((data[1].data[index] / element) * 100);
            });
            setOptions({
                ...options,
                xAxis: newXAxis,
                series: [
                    ...data,
                    {
                        type: 'spline',
                        name: 'Nợ/tài sản',
                        data: newValues,
                        marker: {
                            lineWidth: 2,
                            lineColor: Highcharts.getOptions().colors[3],
                            fillColor: 'white'
                        },
                        size: 400,
                        yAxis: 1
                    }
                ]
            });
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
