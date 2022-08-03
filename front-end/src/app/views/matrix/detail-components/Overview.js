import * as React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";

export default function FinanceReport({ overview, dataRefByCode }) {
  const [dataSource, setDataSource] = useState([]);

  var formatter = new Intl.NumberFormat("en-US", {});

  const [dataCombine, setDataCombine] = useState([]);

  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataSource.length) : 0;

  const getFirstRowData = (timeInfo) => {
    console.log("time info:", timeInfo);
    let firstRow = {};
    // eslint-disable-next-line no-unused-expressions
    timeInfo?.forEach((item, index) => {
      firstRow[`Value${index + 1}`] = (
        <b style={{ color: "blue" }}>
          <p style={{ margin: "0px" }}>{`${item?.TermName} ${item?.YearPeriod}`}</p>
          <p style={{ margin: "0px" }}>{`${moment(item?.PeriodBegin + "01", "YYYYMMDD")?.format(
            "DD/MM"
          )}-${moment(item?.PeriodEnd + "31", "YYYYMMDD")?.format("DD/MM")}`}</p>
          <p style={{ margin: "0px" }}>{item?.United ? `${item?.AuditedStatus}/${item?.United} ` : ``}</p>
        </b>
      );
    });
    console.log("firstRow", firstRow);
    return firstRow;
  };

  const getColumns = (reportSource) => {
    console.log(reportSource);
    let timeInfo = reportSource?.data[0];
    let resource = reportSource?.data[1];
    let firstRow = getFirstRowData(timeInfo);
    console.log("resource: ", Object.keys(resource));
    let keys = Object.keys(resource);
    let newDataCombine = [];
    // eslint-disable-next-line no-unused-expressions
    keys?.forEach((item) => {
      let dataSource = [];
      dataSource.push({ ...firstRow, Name: <b style={{ color: "blue" }}>{item}</b> });
      dataSource = dataSource?.concat(resource[item]);
      console.log("DataSource", item, dataSource);
      newDataCombine.push(dataSource);
    });
    setDataCombine(newDataCombine);
    console.log(firstRow);
  };

  React.useEffect(() => {
    console.log("dataRefByCode: ", dataRefByCode);
    if (overview) {
      console.log("Overview: ", overview);
      getColumns(overview);
    }
  }, [overview]);

  const cssStyle = {
    NormalB: {
      fontWeight: "bold",
    },
    Normal: {
      fontWeight: "500",
    },
    LargeB: {
      fontWeight: "bold",
      color: "blue",
      fontSize: "16px",
    },
    MaxB: {
      fontWeight: "bold",
      color: "blue",
      fontSize: "16px",
    },
  };
  function parseJsonDate(jsonDateString) {
    return new Date(parseInt(jsonDateString.replace("/Date(", "")));
  }
  return (
    <div>
      <h2 style={{ color: "blue" }}>Thống kê giao dịch</h2>
      <TableContainer component={Paper} style={{ marginTop: "32px", borderRadius: "0px", color: "black" }}>
        <Table size="small" aria-label="custom pagination table" stickyHeader>
          <TableHead>
            <TableRow style={{ backgroundColor: "#edf5ed" }}>
              {["Ngày", "Giá đóng cửa", "Thay đổi", "Khối lượng", "BQ mua", "BQ bán", "NN mua", "NN bán"].map(
                (item, index) => {
                  return (
                    <TableCell
                      align="center"
                      style={{ fontWeight: "bold", color: "blue", backgroundColor: "#edf5ed" }}
                    >
                      {item}
                    </TableCell>
                  );
                }
              )}
            </TableRow>
          </TableHead>{" "}
          <TableBody style={{ maxHeight: "300px", overflow: "scroll" }}>
            {dataRefByCode?.stockColor?.map((row) => (
              <TableRow hover key={row.name}>
                <TableCell align="left" style={{ ...cssStyle[row?.CssStyle] }}>
                  {moment(parseJsonDate(row.TradingDate)).format("DD/MM/YYYY")}
                  <span style={{ float: "right" }}>{row?.Unit}</span>
                </TableCell>
                <TableCell align="right" style={{ ...cssStyle[row?.CssStyle] }}>
                  {formatter?.format(row.LastPrice)}
                </TableCell>
                <TableCell align="right" style={{ ...cssStyle[row?.CssStyle] }}>
                  {`${formatter?.format(row.Change)} (${formatter?.format(row.PerChange)}%)    `}
                </TableCell>
                <TableCell align="right" style={{ ...cssStyle[row?.CssStyle] }}>
                  {formatter?.format(row.TotalVol)}
                </TableCell>
                <TableCell align="right" style={{ ...cssStyle[row?.CssStyle] }}>
                  {formatter?.format(row.BuyAvg)}
                </TableCell>
                <TableCell align="right" style={{ ...cssStyle[row?.CssStyle] }}>
                  {formatter?.format(row.SellAvg)}
                </TableCell>
                <TableCell align="right" style={{ ...cssStyle[row?.CssStyle] }}>
                  {formatter?.format(row.ForeignBuyVol)}
                </TableCell>
                <TableCell align="right" style={{ ...cssStyle[row?.CssStyle] }}>
                  {formatter?.format(row.ForeignSellVol)}
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
      <h2 style={{ color: "blue" }}>Tài chính</h2>
      {dataCombine?.map((dataSource, index) => {
        return (
          <TableContainer
            component={Paper}
            style={{ marginTop: "32px", borderRadius: "0px", color: "black" }}
          >
            <Table size="small" aria-label="custom pagination table" stickyHeader>
              <TableBody style={{ maxHeight: "300px", overflow: "scroll" }}>
                {dataSource?.slice(0, 1).map((row) => (
                  <TableRow style={{ backgroundColor: "#edf5ed" }} key={row.name}>
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
                      <span style={{ float: "right" }}>{row?.Unit}</span>
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
