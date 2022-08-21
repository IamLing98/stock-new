import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import moment from "moment";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import CardHeader from "@mui/material/CardHeader";
import { useSelector } from "react-redux";
// import Plot from 'react-plotly.js';

var x = [
  "day 1",
  "day 1",
  "day 1",
  "day 1",
  "day 1",
  "day 1",
  "day 2",
  "day 2",
  "day 2",
  "day 2",
  "day 2",
  "day 2",
];

var trace1 = {
  y: [0.2, 0.2, 0.6, 1.0, 0.5, 0.4, 0.2, 0.7, 0.9, 0.1, 0.5, 0.3],
  x: x,
  name: "kale",
  marker: { color: "#3D9970" },
  type: "box",
};

var trace2 = {
  y: [0.6, 0.7, 0.3, 0.6, 0.0, 0.5, 0.7, 0.9, 0.5, 0.8, 0.7, 0.2],
  x: x,
  name: "radishes",
  marker: { color: "#FF4136" },
  type: "box",
};

var trace3 = {
  y: [0.1, 0.3, 0.1, 0.9, 0.6, 0.6, 0.9, 1.0, 0.3, 0.6, 0.8, 0.5],
  x: x,
  name: "carrots",
  marker: { color: "#FF851B" },
  type: "box",
};

var data = [trace1, trace2, trace3];

var layout = {
  yaxis: {
    title: "normalized moisture",
    zeroline: false,
  },
  boxmode: "group",
};

export default function Dashboard({ overview, dataRefByCode, ticker }) {
  const account = useSelector((state) => state.account);

  const [loading, setLoading] = useState(false);

  const [stockInfo, setStockInfo] = useState({});

  const [exchangeData, setExchangeData] = useState({});

  const [dataSource, setDataSource] = useState([]);

  var formatter = new Intl.NumberFormat("en-US", {});

  const [dataCombine, setDataCombine] = useState([]);

  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataSource.length) : 0;

  const getData = async (code) => {
    await setLoading(true);
    await axios
      .get(`stock/tradingInfo/${code}?type=STOCK_INFO`, {
        headers: { Authorization: `Bearer ${account.token}` },
      })
      .then(async (res) => {
        console.log(res);
        let data = res?.data?.payload;
        await setStockInfo(data?.stockInfo);
        await setExchangeData(data?.exchangeData);
      })
      .catch((err) => err);
    await setLoading(false);
  };

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

  React.useEffect(() => {}, []);

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
    return new Date(parseInt(jsonDateString?.replace("/Date(", "")));
  }

  React.useEffect(() => {
    if (ticker) {
      getData(ticker);
    }
  }, [ticker]);

  const getMarketCapiatalText = (value) => {
    if (value >= 1000000000 * 20000) return "Rất tốt";
    else if (value < 1000000000 * 20000 && value >= 1000000000 * 10000) return "Tốt";
    else if (value < 1000000000 * 10000 && value >= 1000000000 * 50000) return "Bình thường";
    else if (value < 1000000000 * 50000 && value >= 1000000000 * 1000) return "Trung bình";
    else if (value < 1000000000 * 1000 && value >= 1000000000 * 100) return "Kém";
    else if (value < 1000000000 * 100) return "Rất kém";
  };

  return (
    <div>
      <Card style={{ marginBottom: "24px" }}>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {loading ? (
              <Skeleton />
            ) : (
              <span>
                <b className="bold-900">{`(${stockInfo?.Exchange}: ${stockInfo?.Code})`}</b>
              </span>
            )}
          </Typography>
          <Typography gutterBottom variant="h4" component="div">
            {loading ? (
              <Skeleton />
            ) : (
              <span>
                <b className="bold-900">{`${stockInfo?.Name}`}</b>
              </span>
            )}
          </Typography>

          <Typography gutterBottom variant="h4" component="div">
            {loading ? (
              <Skeleton />
            ) : (
              <span>
                <b className="bold-900">{`Ngành: ${stockInfo?.IndustryName} `}</b>
              </span>
            )}
          </Typography>
        </CardContent>
      </Card>

      <Grid container spacing={2}>
        <Grid item={true} xs={7}>
          {/* {moment(parseJsonDate(exchangeData?.TradingDate))?.format('DD/MM/YYYY HH:mm')} */}
          {/* Fair value card */}
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Card className="bg-color-brown">
                    <CardContent>
                      <Typography gutterBottom component="div">
                        {loading ? (
                          <Skeleton />
                        ) : (
                          <span>
                            <b className="bold-900">{`Giá đóng cửa`}</b>
                          </span>
                        )}
                      </Typography>
                      <Typography gutterBottom sx="sm" component="span">
                        {loading ? (
                          <Skeleton />
                        ) : (
                          <span>
                            <b className="bold-900"> {`${formatter?.format(exchangeData?.LastPrice)} `}</b>{" "}
                            VND
                          </span>
                        )}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card className="bg-color-brown">
                    <CardContent>
                      <Typography gutterBottom component="div">
                        {loading ? (
                          <Skeleton />
                        ) : (
                          <span>
                            <b className="bold-900">{`Giá thay đổi`}</b>
                          </span>
                        )}
                      </Typography>
                      <Typography gutterBottom sx="sm" component="span">
                        {loading ? (
                          <Skeleton />
                        ) : (
                          <span className={exchangeData?.Change > 0 ? "color-green" : "color-red"}>
                            <b className="bold-900">{`${formatter?.format(exchangeData?.Change)}`}</b>
                            <b className="bold-900">{` (${exchangeData?.PerChange})% `}</b>
                          </span>
                        )}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card className="bg-color-brown">
                    <CardContent>
                      <Typography gutterBottom component="span">
                        {loading ? (
                          <Skeleton />
                        ) : (
                          <span>
                            <b className="bold-900">{`Range 52 tuần`}</b>
                          </span>
                        )}
                      </Typography>
                      <Typography gutterBottom component="div">
                        {loading ? (
                          <Skeleton />
                        ) : (
                          <span>
                            <b className="bold-900">{`${formatter?.format(exchangeData?.Min52W)}`}</b> -{" "}
                            <b className="bold-900">{`${formatter?.format(exchangeData?.Max52W)}`}</b>
                          </span>
                        )}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* {moment(parseJsonDate(exchangeData?.TradingDate))?.format('DD/MM/YYYY HH:mm')} */}
          {/* Volume card */}
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Card className="bg-color-brown">
                    <CardContent>
                      <Typography gutterBottom component="div">
                        {loading ? (
                          <Skeleton />
                        ) : (
                          <span>
                            <b className="bold-900">{`Volume`}</b>
                          </span>
                        )}
                      </Typography>
                      <Typography gutterBottom sx="sm" component="span">
                        {loading ? (
                          <Skeleton />
                        ) : (
                          <span
                            className={
                              exchangeData?.TotalVol - exchangeData?.Vol52W > 0 ? "color-green" : "color-red"
                            }
                          >
                            <b className="bold-900">{`${formatter?.format(exchangeData?.TotalVol)}`}</b>
                          </span>
                        )}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card className="bg-color-brown">
                    <CardContent>
                      <Typography gutterBottom component="div">
                        {loading ? (
                          <Skeleton />
                        ) : (
                          <span>
                            <b className="bold-900">{`Volume bq52w`}</b>
                          </span>
                        )}
                      </Typography>
                      <Typography gutterBottom sx="sm" component="span">
                        {loading ? (
                          <Skeleton />
                        ) : (
                          <span
                          // className={exchangeData?.TotalVol - exchangeData?.Vol52W > 0 ? 'color-green' : 'color-red'}
                          >
                            <b className="bold-900">{`${formatter?.format(exchangeData?.Vol52W)}`}</b>
                          </span>
                        )}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card className="bg-color-brown">
                    <CardContent>
                      <Typography gutterBottom component="div">
                        {loading ? (
                          <Skeleton />
                        ) : (
                          <span>
                            <b className="bold-900">{`Vốn hoá`}</b>
                          </span>
                        )}
                      </Typography>
                      <Typography gutterBottom component="div">
                        {loading ? (
                          <Skeleton />
                        ) : (
                          <span>
                            <b className="bold-900">{`${formatter?.format(
                              Math.round(exchangeData?.MarketCapital / 1000000000)
                            )}`}</b>{" "}
                            tỷ VND{" "}
                            <b className="bold-900">{`(${getMarketCapiatalText(
                              exchangeData?.MarketCapital
                            )})`}</b>{" "}
                          </span>
                        )}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Box plot */}
          {/* Info card */}
          <Card style={{ marginBottom: "24px" }}>
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                {loading ? (
                  <Skeleton />
                ) : (
                  <span>
                    <b className="bold-900">{`(${stockInfo?.Exchange}: ${stockInfo?.Code})`}</b>
                  </span>
                )}
              </Typography>
              <Typography gutterBottom variant="h4" component="div">
                {loading ? (
                  <Skeleton />
                ) : (
                  <span>
                    <b className="bold-900">{`${stockInfo?.Name}`}</b>
                  </span>
                )}
              </Typography>

              <Typography gutterBottom variant="h4" component="div">
                {loading ? (
                  <Skeleton />
                ) : (
                  <span>
                    <b className="bold-900">{`Ngành: ${stockInfo?.IndustryName} `}</b>
                  </span>
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item={true} xs={5}>
          {/* {moment(parseJsonDate(exchangeData?.TradingDate))?.format('DD/MM/YYYY HH:mm')} */}
          {/* Exchange card */}
          <Card>
            <CardHeader title={`Fair Value`} style={{ paddingBottom: "0px" }} />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Card className="bg-color-brown">
                    <CardContent>
                      <Typography gutterBottom component="div">
                        {loading ? (
                          <Skeleton />
                        ) : (
                          <span>
                            <b className="bold-900">{`Giá đóng cửa`}</b>
                          </span>
                        )}
                      </Typography>
                      <Typography gutterBottom sx="sm" component="span">
                        {loading ? (
                          <Skeleton />
                        ) : (
                          <span>
                            <b className="bold-900"> {`${formatter?.format(exchangeData?.LastPrice)} `}</b>{" "}
                            VND
                          </span>
                        )}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* {moment(parseJsonDate(exchangeData?.TradingDate))?.format('DD/MM/YYYY HH:mm')} */}
          {/* Volume card */}
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Card className="bg-color-brown">
                    <CardContent>
                      <Typography gutterBottom component="div">
                        {loading ? (
                          <Skeleton />
                        ) : (
                          <span>
                            <b className="bold-900">{`Volume`}</b>
                          </span>
                        )}
                      </Typography>
                      <Typography gutterBottom sx="sm" component="span">
                        {loading ? (
                          <Skeleton />
                        ) : (
                          <span
                            className={
                              exchangeData?.TotalVol - exchangeData?.Vol52W > 0 ? "color-green" : "color-red"
                            }
                          >
                            <b className="bold-900">{`${formatter?.format(exchangeData?.TotalVol)}`}</b>
                          </span>
                        )}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card className="bg-color-brown">
                    <CardContent>
                      <Typography gutterBottom component="div">
                        {loading ? (
                          <Skeleton />
                        ) : (
                          <span>
                            <b className="bold-900">{`Volume bq52w`}</b>
                          </span>
                        )}
                      </Typography>
                      <Typography gutterBottom sx="sm" component="span">
                        {loading ? (
                          <Skeleton />
                        ) : (
                          <span
                          // className={exchangeData?.TotalVol - exchangeData?.Vol52W > 0 ? 'color-green' : 'color-red'}
                          >
                            <b className="bold-900">{`${formatter?.format(exchangeData?.Vol52W)}`}</b>
                          </span>
                        )}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card className="bg-color-brown">
                    <CardContent>
                      <Typography gutterBottom component="div">
                        {loading ? (
                          <Skeleton />
                        ) : (
                          <span>
                            <b className="bold-900">{`Vốn hoá`}</b>
                          </span>
                        )}
                      </Typography>
                      <Typography gutterBottom component="div">
                        {loading ? (
                          <Skeleton />
                        ) : (
                          <span>
                            <b className="bold-900">{`${formatter?.format(
                              Math.round(exchangeData?.MarketCapital / 1000000000)
                            )}`}</b>{" "}
                            tỷ VND{" "}
                            <b className="bold-900">{`(${getMarketCapiatalText(
                              exchangeData?.MarketCapital
                            )})`}</b>{" "}
                          </span>
                        )}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Box plot */}
          {/* Info card */}
          <Card style={{ marginBottom: "24px" }}>
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                {loading ? (
                  <Skeleton />
                ) : (
                  <span>
                    <b className="bold-900">{`(${stockInfo?.Exchange}: ${stockInfo?.Code})`}</b>
                  </span>
                )}
              </Typography>
              <Typography gutterBottom variant="h4" component="div">
                {loading ? (
                  <Skeleton />
                ) : (
                  <span>
                    <b className="bold-900">{`${stockInfo?.Name}`}</b>
                  </span>
                )}
              </Typography>

              <Typography gutterBottom variant="h4" component="div">
                {loading ? (
                  <Skeleton />
                ) : (
                  <span>
                    <b className="bold-900">{`Ngành: ${stockInfo?.IndustryName} `}</b>
                  </span>
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* <div>
                <h2 style={{ color: 'blue' }}>Thống kê giao dịch</h2>
                <TableContainer component={Paper} style={{ marginTop: '32px', borderRadius: '0px', color: 'black' }}>
                    <Table size="small" aria-label="custom pagination table" stickyHeader>
                        <TableHead>
                            <TableRow style={{ backgroundColor: '#edf5ed' }}>
                                {['Ngày', 'Giá đóng cửa', 'Thay đổi', 'Khối lượng', 'BQ mua', 'BQ bán', 'NN mua', 'NN bán'].map(
                                    (item, index) => {
                                        return (
                                            <TableCell
                                                align="center"
                                                style={{ fontWeight: 'bold', color: 'blue', backgroundColor: '#edf5ed' }}
                                            >
                                                {item}
                                            </TableCell>
                                        );
                                    }
                                )}
                            </TableRow>
                        </TableHead>{' '}
                        <TableBody style={{ maxHeight: '300px', overflow: 'scroll' }}>
                            {dataRefByCode?.stockColor?.map((row) => (
                                <TableRow hover key={row.name}>
                                    <TableCell align="left" style={{ ...cssStyle[row?.CssStyle] }}>
                                        {moment(parseJsonDate(row.TradingDate)).format('DD/MM/YYYY')}
                                        <span style={{ float: 'right' }}>{row?.Unit}</span>
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
                <h2 style={{ color: 'blue' }}>Tài chính</h2>
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
            </div> */}
    </div>
  );
}
