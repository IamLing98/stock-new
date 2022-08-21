import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AppBar from '@mui/material/AppBar';

import Tab1 from './finance-analysis-components/Tab1';

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
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
export default function Main({ ticker }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Card style={{ margin: '0px', padding: '0px' }}>
            <CardContent style={{ margin: '0px', padding: '0px' }}>
                <Box sx={{ bgcolor: 'background.paper' }}>
                    <AppBar position="static">
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="secondary"
                            textColor="inherit"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                        >
                            <Tab label="Tổng quan tài chính" {...a11yProps(0)} />
                            <Tab label="Cân đối kế toán" {...a11yProps(1)} />
                            <Tab label="Kết quả kinh doanh" {...a11yProps(2)} />
                            <Tab label="Lưu chuyển tiền tệ" {...a11yProps(3)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0} className="finance-overview">
                        <Tab1 ticker={ticker} />
                    </TabPanel>
                    <TabPanel value={value} index={1}></TabPanel>
                    <TabPanel value={value} index={2}>
                        Kết quả kinh doanh
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        Lưu chuyển tiền tệ
                    </TabPanel>
                </Box>
            </CardContent>
        </Card>
    );
}
