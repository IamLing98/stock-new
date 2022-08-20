import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AppBar from '@mui/material/AppBar';

import MultilevelTreeMap from '../MultilevelTreeMap';

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

export default function Main({ height }) {
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
                            <Tab label="Ngành" {...a11yProps(0)}/>
                            <Tab label="Sàn" {...a11yProps(1)}/>
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0} className="finance-overview">
                        <MultilevelTreeMap chartID="nganh" height={height} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <MultilevelTreeMap chartID="san" height={height} />
                    </TabPanel>
                </Box>
            </CardContent>
        </Card>
    );
}
