import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import parse from 'html-react-parser';

// Tab 1, dashboard
import Dashboard from './Dashboard';

//Tab 3, Finance Analysis
import FinanceAnalysis from './FinanceAnalysis';

import Overview from './Overview';
import SotckDealReport from './StockDealReport';
import FinanceReport from './FinanceReport';
// import Fibonacci3m from './Fibonacci3m';
// import Fibonacci6m from './Fibonnaci6m';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`
    };
}

function FullWidthTabs({ ticker, stockInfo, stockDeal, financeReport, overview, dataRefByCode, industryProfile, fibonacciData }) {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <Box sx={{ bgcolor: 'background.paper' }}>
            <AppBar position="static" className="detail-tabs-header">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    aria-label="full width tabs example"
                    className="detail-tabs"
                    fullWidth
                    scrollable
                >
                    <Tab label="Dashboard" {...a11yProps(0)} />
                    <Tab label="Price Chart" {...a11yProps(1)} />
                    <Tab label="Finance Analysis" {...a11yProps(2)} />
                    <Tab label="Cổ tức" {...a11yProps(5)} />
                    <Tab label="chi tiết công ty-nội bộ dn" {...a11yProps(6)} />
                    <Tab label="gd nội bộ, news, cổ tức, tài liệu phân tích" {...a11yProps(4)} />
                    <Tab label="So sánh dn cùng ngành" {...a11yProps(4)} />
                </Tabs>
            </AppBar>
            <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex}>
                <TabPanel value={value} index={0} dir={theme.direction} className="dashboard">
                    {/* Tab 1, Dashboard */}
                    <Dashboard overview={overview} dataRefByCode={dataRefByCode} stockInfo={stockInfo} ticker={ticker} />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <SotckDealReport dataSource={stockDeal} />
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction} className="finance-analysis">
                    <FinanceAnalysis ticker={ticker} />
                </TabPanel>
                {/*    <TabPanel value={value} index={3} dir={theme.direction}>
                    <FinanceReport financeReport={financeReport} />
                </TabPanel>
                <TabPanel value={value} index={4} dir={theme.direction}>
                    <Fibonacci3m fibonacciData={fibonacciData} />
                </TabPanel>
                <TabPanel value={value} index={5} dir={theme.direction}>
                    <Fibonacci6m fibonacciData={fibonacciData} />
                </TabPanel>
                <TabPanel value={value} index={6} dir={theme.direction}>
                    {industryProfile ? parse(industryProfile) : ''}
                </TabPanel> */}
            </SwipeableViews>
        </Box>
    );
}
export default FullWidthTabs;
