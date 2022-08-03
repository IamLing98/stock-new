import * as React from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import moment from 'moment';

function MenuPopupState({ selectedItem, setSelectedItem }) {
    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
                <React.Fragment>
                    <Button variant="contained" {...bindTrigger(popupState)}>
                        {selectedItem?.title}
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                        <MenuItem
                            onClick={() => {
                                setSelectedItem({ type: 0, title: 'BCTC Tóm tắt' });
                                popupState.close();
                            }}
                        >
                            BCTC Tóm tắt
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                setSelectedItem({ type: 1, title: 'Cân đối kế toán' });
                                popupState.close();
                            }}
                        >
                            Cân đối kế toán
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                setSelectedItem({ type: 2, title: 'Kết quả kinh doanh' });
                                popupState.close();
                            }}
                        >
                            Kết quả kinh doanh
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                setSelectedItem({ type: 3, title: 'Lưu chuyển tiền tệ' });
                                popupState.close();
                            }}
                        >
                            Lưu chuyển tiền tệ
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                setSelectedItem({ type: 4, title: 'Chỉ số tài chính' });
                                popupState.close();
                            }}
                        >
                            Chỉ số tài chính
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                setSelectedItem({ type: 5, title: 'Chỉ tiêu kế hoạch' });
                                popupState.close();
                            }}
                        >
                            Chỉ tiêu kế hoạch
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                setSelectedItem({ type: 6, title: 'Tải BCTC' });
                                popupState.close();
                            }}
                        >
                            Tải BCTC
                        </MenuItem>
                    </Menu>
                </React.Fragment>
            )}
        </PopupState>
    );
}

export default function FinanceReport({ financeReport }) {
    const [dataSource, setDataSource] = useState([]);

    var formatter = new Intl.NumberFormat('en-US', {});

    const [dataCombine, setDataCombine] = useState([]);

    const [page, setPage] = React.useState(0);

    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataSource.length) : 0;

    const [columns, setColumns] = useState([]);

    const [selectedItem, setSelectedItem] = React.useState({
        type: 0,
        title: 'BCTC Tóm tắt'
    });

    const getFirstRowData = (timeInfo) => {
        console.log('time info:', timeInfo);
        let firstRow = {};
        // eslint-disable-next-line no-unused-expressions
        timeInfo?.forEach((item, index) => {
            firstRow[`Value${index + 1}`] = (
                <b style={{ color: 'blue' }}>
                    <p style={{ margin: '0px' }}>{`${item?.TermName} ${item?.YearPeriod}`}</p>
                    <p style={{ margin: '0px' }}>{`${moment(item?.PeriodBegin + '01', 'YYYYMMDD')?.format('DD/MM')}-${moment(
                        item?.PeriodEnd + '31',
                        'YYYYMMDD'
                    )?.format('DD/MM')}`}</p>
                    <p style={{ margin: '0px' }}>{item?.United ? `${item?.AuditedStatus}/${item?.United} ` : ``}</p>
                </b>
            );
        });
        console.log('firstRow', firstRow);
        return firstRow;
    };

    const getColumns = (reportSource) => {
        console.log(reportSource);
        let timeInfo = reportSource?.data[0];
        let resource = reportSource?.data[1];
        let firstRow = getFirstRowData(timeInfo);
        console.log('resource: ', Object.keys(resource));
        let keys = Object.keys(resource);
        let newDataCombine = [];
        // eslint-disable-next-line no-unused-expressions
        keys?.forEach((item) => {
            let dataSource = [];
            dataSource.push({ ...firstRow, Name: <b style={{ color: 'blue' }}>{item}</b> });
            dataSource = dataSource?.concat(resource[item]);
            console.log('DataSource', item, dataSource);
            newDataCombine.push(dataSource);
        });
        setDataCombine(newDataCombine);
        console.log(firstRow);
    };

    React.useEffect(() => {
        getColumns(financeReport[selectedItem?.type]);
    }, [selectedItem?.type]);

    const cssStyle = {
        NormalB: {
            fontWeight: 'bold'
        },
        Normal: {
            fontWeight: '500'
        },
        LargeB: {
            fontWeight: 'bold',
            color: 'blue',
            fontSize: '16px'
        },
        MaxB: {
            fontWeight: 'bold',
            color: 'blue',
            fontSize: '16px'
        }
    };

    return (
        <div>
            <MenuPopupState setSelectedItem={setSelectedItem} selectedItem={selectedItem} />
            {dataCombine?.map((dataSource, index) => {
                return (
                    <TableContainer component={Paper} style={{ marginTop: '32px', borderRadius: '0px', color: 'black' }}>
                        <Table size="small" aria-label="custom pagination table" stickyHeader>
                            <TableBody style={{ maxHeight: '300px', overflow: 'scroll' }}>
                                {dataSource?.slice(0, 1).map((row) => (
                                    <TableRow style={{ backgroundColor: '#edf5ed' }} key={row.name}>
                                        <TableCell align="left">{row.Name}</TableCell>
                                        <TableCell align="center">{row?.Value1}</TableCell>
                                        <TableCell align="center">{row?.Value2}</TableCell>
                                        <TableCell align="center">{row?.Value3}</TableCell>
                                        <TableCell align="center">{row?.Value4}</TableCell>
                                    </TableRow>
                                ))}
                                {dataSource?.slice(1, dataSource?.length).map((row) => (
                                    <TableRow hover key={row.name}>
                                        <TableCell align="left" style={{ ...cssStyle[row?.CssStyle] }}>
                                            {row.Name}
                                            <span style={{ float: 'right' }}>{row?.Unit}</span>
                                        </TableCell>
                                        <TableCell align="right" style={{ ...cssStyle[row?.CssStyle] }}>
                                            {formatter?.format(row.Value1)}
                                        </TableCell>
                                        <TableCell align="right" style={{ ...cssStyle[row?.CssStyle] }}>
                                            {formatter?.format(row.Value2)}
                                        </TableCell>
                                        <TableCell align="right" style={{ ...cssStyle[row?.CssStyle] }}>
                                            {formatter?.format(row.Value3)}
                                        </TableCell>
                                        <TableCell align="right" style={{ ...cssStyle[row?.CssStyle] }}>
                                            {formatter?.format(row.Value4)}
                                        </TableCell>
                                    </TableRow>
                                ))}

                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                );
            })}
        </div>
    );
}
