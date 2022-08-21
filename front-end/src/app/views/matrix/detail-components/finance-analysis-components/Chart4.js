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

const options = {
    title: {
        text: 'Dòng tiền thuần'
    },
    xAxis: {
        categories: ['Q2', 'Q3', 'Q4', 'Q1']
    },
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
            name: 'Dòng tiền thuần',
            data: [3, 2, 1, 3, 4]
        },
        {
            type: 'spline',
            name: 'Dòng tiền kinh doanh',
            data: [3, 2.67, 3, 6.33, 3.33],
            marker: {
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[3],
                fillColor: 'white'
            },
            size: 400
        },
        {
            type: 'spline',
            name: 'Dòng tiền đầu tư',
            data: [3, 2.67, 3, 6.33, 3.33],
            marker: {
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[3],
                fillColor: 'white'
            },
            size: 400
        },
        {
            type: 'spline',
            name: 'Dòng tiền tài chính',
            data: [3, 2.67, 3, 6.33, 3.33],
            marker: {
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[3],
                fillColor: 'white'
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

export default function Chart() {
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
