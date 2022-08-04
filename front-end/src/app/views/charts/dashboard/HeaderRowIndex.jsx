import React, { useEffect, useState } from 'react';
import fetch from 'node-fetch';

// material-ui
import { Grid, Card, MenuItem, TextField, Typography, useTheme } from '@material-ui/core';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import MainCard from '../../../../ui-component/cards/MainCard';
import { makeStyles } from '@material-ui/styles';
import NumberFormat from 'react-number-format';
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
const HeaderRowIndex = () => {
    const classes = useStyles();
    const [tableData, setTableData] = useState([]);
    // San : HNX | VNINDEX | VN30

    useEffect(() => {
        crawler();
    }, []);

    const crawler = () => {
        fetch('https://finfo-api.vndirect.com.vn/v4/change_prices?q=code:VNINDEX,HNX,UPCOM,VN30,VN30F1M~period:1D')
            .then((res) => res.json())
            .then((json) => {
                if (json != null) {
                    setTableData(json.data);
                }
            });
    };

    return (
        <React.Fragment>
            <MainCard border={false} className={classes.card} contentClass={classes.content}>
                <Grid container direction="row" justifyContent="center" alignItems="center">
                    {tableData.sort().map((item, index) => (
                        <Box key={index}>
                            {item ? (
                                <Box sx={{width: '100',
                                height: '100',}}>
                                    <Typography variant="h5" component="div">
                                        {item.code}
                                    </Typography>
                                    <Typography display="block" variant="caption" color="text.secondary">
                                        Điểm:{' '}
                                        <NumberFormat
                                            value={item.price}
                                            displayType={'text'}
                                            thousandSeparator={'.'}
                                            decimalSeparator={','}
                                        />
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        <NumberFormat value={item.change} displayType={'text'} format="#0.#" />
                                        <NumberFormat value={item.changePct} displayType={'text'} format="#0.#" />
                                    </Typography>
                                </Box>
                            ) : (
                                <Box sx={{ pt: 0.5 }}>
                                    <Skeleton />
                                    <Skeleton width="60%" />
                                </Box>
                            )}
                        </Box>
                    ))}
                </Grid>
            </MainCard>
        </React.Fragment>
    );
};
export default HeaderRowIndex;
