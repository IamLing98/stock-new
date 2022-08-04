import React, { useLayoutEffect } from 'react';
import fetch from 'node-fetch';

// material-ui
import { Grid, Card, Box, MenuItem, TextField, Typography, useTheme } from '@material-ui/core';
const dataCrawler = null;
const MarketLeadingGroup = () => {
    // San : HNX | VNINDEX | VN30

    //q=index:VNIndex~avgVol20p:gte:10000~changePrice1dPct:gt:0&size=10&sort=changePrice1dPct => search tăng
    //q=index:VNIndex~avgVol20p:gte:10000~changePrice1dPct:lt:0&size=10&sort=changePrice1dPct:asc => search giảm
    //q=index:VNIndex~accumulatedVal:gt:0&size=10&sort=accumulatedVal => giá trị giao dịch lớn nhất
    //q=index:VNIndex~avgVol20p:gte:10000~changeVol20p:gte:100&size=10&sort=changeVol20p => Đột biến KLGD
    //size=10&q=index:VNIndex~avgVol20p:gte:10000&sort=changeVolPt1p => Thoả thuận đột bến


    const crawler = () => {
        fetch('https://finfo-api.vndirect.com.vn/v4/top_of_stocks?q=index:VNIndex~avgVol20p:gte:10000~changePrice1dPct:gt:0&size=10&sort=changePrice1dPct')
    .then(res => res.json())
    .then(json => {
        if(json != null) {
            console.log(json);
        }
    })
    };
    useLayoutEffect(() => {
        crawler();
    }, []);

    return <React.Fragment>

    </React.Fragment>;
};
export default MarketLeadingGroup;
