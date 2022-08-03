import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import Chart from './Chart';
import { getData, parseData } from './utils';

import { TypeChooser } from 'react-stockcharts/lib/helper';

const ChartComponent = ({ fibonacciData = [] }) => {
    const [data, setData] = useState();

    useEffect(() => {
        console.log('Fibonacci data', fibonacciData?.slice(fibonacciData?.length - 1, fibonacciData?.length));
        let newData = fibonacciData?.slice(fibonacciData?.length - 90, fibonacciData?.length)?.map((item) => parseData(item));
        console.log('sadas', newData?.slice(newData?.length - 1, newData?.length));
        setData(newData);
        // getData().then((data) => {
        //     setData(data);
        // });
    }, []);

    if (data == null) {
        return <div>Loading...</div>;
    }
    return <Chart data={data} />;
};

export default ChartComponent;
