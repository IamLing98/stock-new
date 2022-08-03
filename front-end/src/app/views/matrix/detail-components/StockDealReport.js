import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page">
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page">
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired
};

export default function CustomPaginationActionsTable({ dataSource = [] }) {
    var formatter = new Intl.NumberFormat('en-US', {});
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataSource.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <Table aria-label="custom pagination table" size="small" aria-label="custom pagination table" stickyHeader stickyHeader>
                <TableHead>
                    <TableRow style={{ backgroundColor: '#edf5ed' }}>
                        <TableCell align="center" style={{ fontWeight: 'bold', color: 'blue', backgroundColor: '#edf5ed' }}>
                            Thời gian
                        </TableCell>
                        <TableCell align="center" style={{ fontWeight: 'bold', color: 'blue', backgroundColor: '#edf5ed' }}>
                            Giá
                        </TableCell>
                        <TableCell align="center" style={{ fontWeight: 'bold', color: 'blue', backgroundColor: '#edf5ed' }}>
                            KL Lô
                        </TableCell>
                        <TableCell align="center" style={{ fontWeight: 'bold', color: 'blue', backgroundColor: '#edf5ed' }}>
                            KL Tích luỹ
                        </TableCell>
                        <TableCell align="center" style={{ fontWeight: 'bold', color: 'blue', backgroundColor: '#edf5ed' }}>
                            Tỷ trọng
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody style={{ maxHeight: '300px', overflow: 'scroll' }}>
                    {(rowsPerPage > 0 ? dataSource.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : dataSource).map((row) => (
                        <TableRow key={row.name}>
                            <TableCell align="center">{moment(row.Package, 'HHmmss')?.format('HH:mm:ss')}</TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {`${formatter?.format(row?.Price)} ${row?.Change} (${row?.PerChange})`}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {formatter?.format(row.Vol)}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {formatter?.format(row.TotalVol)}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {(row.TotalVol * 100) / row.TotalVal}
                            </TableCell>
                        </TableRow>
                    ))}

                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={5} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 50, 100, { label: 'Tất cả', value: -1 }]}
                            colSpan={5}
                            count={dataSource.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            labelRowsPerPage="Số bản ghi mỗi trang"
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'Số bản ghi mỗi trang'
                                },
                                native: true
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}
