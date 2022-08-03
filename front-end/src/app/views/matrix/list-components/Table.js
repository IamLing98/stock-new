import React, { useState, useEffect } from "react";
import defaultData from "../data";
import "../style.scss";
import MaterialTable, { MTableToolbar } from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import Search from "@mui/icons-material/Search";
import Menu from "./Menu";
import axios from "axios";
import { useSelector } from "react-redux";

const themeX = createTheme({
  direction: "rlt",
  palette: {
    primary: {
      main: "#4caf50",
    },
    secondary: {
      main: "#ff9100",
    },
  },
});

function extractTextSearch(text) {
  text = text + "";
  if (text.start) {
  }
}

const operationsMap = {
  ">=": (valueToCompare, sourceValue) => {
    console.log("Value to compare ", valueToCompare, "sourceValue ", sourceValue);
    return sourceValue >= valueToCompare;
  },
  "<=": (valueToCompare, sourceValue) => {
    console.log("Value to compare ", valueToCompare, "sourceValue ", sourceValue);
    return sourceValue <= valueToCompare;
  },
};

const checkMap = {
  ">": (valueToCompare, sourceValue) => {
    console.log("Value to compare ", valueToCompare, "sourceValue ", sourceValue);
    return sourceValue > valueToCompare;
  },
  "<": (valueToCompare, sourceValue) => {
    console.log("Value to compare ", valueToCompare, "sourceValue ", sourceValue);
    return sourceValue < valueToCompare;
  },
  "=": (valueToCompare, sourceValue) => {
    console.log("Value to compare ", valueToCompare, "sourceValue ", sourceValue);
    return sourceValue === valueToCompare;
  },
};
function isSearchWithOperator(text, value, field) {
  if (text.length === 1) {
    return false;
  }
  let twoFirstText = text?.substring(0, 2);
  let firstText = text[0];
  let valueToCompare = 0;
  console.log(twoFirstText);
  if (operationsMap[twoFirstText]) {
    console.log("===> is ope: ", operationsMap[text]);
    if (text?.length === 2) {
      return false;
    } else {
      valueToCompare = text.slice(2, text.length)?.trim();
      console.log("Value to compare", valueToCompare);
      return operationsMap[twoFirstText](valueToCompare, Number(value));
    }
  }
  //if is one char operator
  if (checkMap[firstText]) {
    console.log("===> is ope: ", operationsMap[text]);
    if (text?.length === 1) {
      return false;
    } else {
      valueToCompare = text.slice(1, text.length)?.trim();
      console.log("Value to compare", valueToCompare);
      return checkMap[firstText](valueToCompare, Number(value));
    }
  }
}

function customFilterAndSearch(textSearch, row, field, type) {
  console.log(textSearch, row, field, type);
  if (!textSearch) return;
  if (!textSearch || textSearch === "") return "";
  let value = row[field]?.value?.toLowerCase();
  console.log("Value before lowercase: ", row[field]?.value);
  console.log("Value after lowercase: ", value);
  textSearch = textSearch?.toLowerCase().trim();
  if (type === "number") {
    try {
      value = value?.replaceAll(",", "");
    } catch (ex) {
      console.log(ex);
    }
  }
  if (type === "string") {
    let result = value?.search(textSearch?.trim());
    return result === -1 ? false : true;
  }
  let isSearchWithOperatorValue = isSearchWithOperator(textSearch, value, field);
  if (!isSearchWithOperatorValue) {
    console.log("search with string", "value: ", value, "textSearch: ", textSearch);
    if (!value) return false;
    let result = value?.search(textSearch?.trim());
    return result === -1 ? false : true;
  } else {
    return isSearchWithOperatorValue;
  }
}

function customFilterAndSearch2(textSearch, row, field, type) {
  console.log(textSearch, row, field, type);
  if (!textSearch) return;
  if (!textSearch || textSearch === "" || textSearch?.length === 0) return true;
  let value = row[field]?.value?.toLowerCase();
  console.log("Value before lowercase: ", row[field]?.value);
  console.log("Value after lowercase: ", value);
  for (let i = 0; i < textSearch?.length; i++) {
    if (value?.startsWith(textSearch[i]?.toLowerCase())) return true;
  }
  return false;
}

function customFilterAndSearchWithMultipleField(textSearch, row, fields, type) {
  let str = "";
  for (let i = 0; i < fields?.length; i++) {
    if (row[fields[i]]?.value) {
      str += row[fields[i]]?.value;
    }
  }
  let value = str?.toLowerCase();

  console.log("textSearch", textSearch, "row", row, "str", str, type);
  if (!textSearch) return;
  if (!textSearch || textSearch === "" || textSearch?.length === 0) return true;
  let textSearchMultiple = textSearch?.split(";");
  for (let index = 0; index < textSearchMultiple?.length; index++) {
    if (value?.includes(textSearchMultiple[index])) return true;
  }
  return false;
}

function CustomFilteringAlgorithm({ data, defaultData, setData }) {
  const defaultMaterialTheme = createTheme();

  return (
    <div className="report">
      <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialTable
          title={<Menu data={data} setData={setData} defaultData={defaultData} />}
          columns={[
            {
              title: "Ticker",
              field: "Ticker",
              type: "string",
              customFilterAndSearch: (term, rowData) => {
                return customFilterAndSearchWithMultipleField(term, rowData, ["Ticker"], "string");
              },

              render: (row) => {
                return (
                  <div
                    style={{
                      backgroundColor: row["Ticker"]?.background,
                      textAlign: "center",
                      color: row["Ticker"]?.color,
                    }}
                  >
                    <a
                      href={`/dashboard/reports/detail?ticker=${row?.Ticker?.value}`}
                      style={{ color: row["TICKERVN"]?.color, fontWeight: "bolder" }}
                    >
                      {" "}
                      {row?.TICKERVN?.value}
                    </a>
                  </div>
                );
              },
              customSort: (a, b) => a?.TICKERVN?.value?.localeCompare(b?.TICKERVN?.value),
            },
            {
              title: "Date",
              field: "Date/Time",
              type: "string",
              customFilterAndSearch: (term, rowData) => {
                return customFilterAndSearch(term, rowData, "Date/Time", "string");
              },
              render: (row) => {
                return (
                  <div
                    style={{
                      backgroundColor: row["Date/Time"]?.background,
                      textAlign: "center",
                      color: row["Date/Time"]?.color,
                    }}
                  >
                    <span> {row["Date/Time"]?.value}</span>
                  </div>
                );
              },
            },
            {
              title: "Exchange",
              field: "Exchange",
              type: "string",
              customSort: (a, b) => a?.ExchangeName?.value?.localeCompare(b?.ExchangeName?.value),
              lookup: { HOSE: "HOSE", HNX: "HNX", UPCOM: "UpCOM" },
              customFilterAndSearch: (term, rowData) => {
                return customFilterAndSearch2(term, rowData, "Exchange", "string");
              },
              render: (row) => {
                return (
                  <div
                    style={{
                      backgroundColor: row["Exchange"]?.background,
                      textAlign: "center",
                      color: row["Exchange"]?.color,
                    }}
                  >
                    <span> {row["Exchange"]?.value}</span>
                  </div>
                );
              },
            },
            {
              title: "Type",
              field: "Type",
              type: "string",
              customSort: (a, b) => a?.ExchangeName?.value?.localeCompare(b?.ExchangeName?.value),
              customFilterAndSearch: (term, rowData) => {
                return customFilterAndSearch2(term, rowData, "Type", "string");
              },
              lookup: {
                STOCK: "STOCK",
                CATEGORY: "CATEGORY",
                SECTOR: "SECTOR",
                FUTURE: "FUTURE",
                BOND: "BOND",
                INDEX: "INDEX",
                WARRANT: "WARRANT",
              },

              render: (row) => {
                return (
                  <div
                    style={{
                      backgroundColor: row["Type"]?.background,
                      textAlign: "center",
                      color: row["Type"]?.color,
                    }}
                  >
                    <span> {row["Type"]?.value}</span>
                  </div>
                );
              },
            },
            {
              title: "Sector",
              field: "Sector",
              type: "string",
              lookup: {
                ChungKhoan: "Chứng khoán",
                Nganhang: "Ngân hàng",
                Baohiem: "BaoHiem",
                CaoSu: "Cao su",
                BSD: "BDS",
                ThucPham: "Thực phẩm",
                HangKhong: "Hàng không",
                Thep: "Thép",
                XayDung: "Xây Dựng",
                VanTai: "Vận Tải",
                DuocPham: "Dược phẩm",
                ThuySan: "Thủy Sản",
                Nhua: "Nhựa",
                BanLe: "Bán lẻ",
                KhaiKhoang: "Khai khóa",
                HoaChat: "Hóa chất",
                DienNuoc: "Điện nước",
                CoKhi: "Cơ khí",
                DVTaiChinh: "Dịch vụ tài chính",
                HangTieuDung: "Hàng tiêu dùng",
                VienThong: "Viễn thông",
                MayMac: "May mặc",
                CongNghe: "Công nghệ",
                UNKNOWN: "UNKNOWN",
              },
              customFilterAndSearch: (term, rowData) => {
                return customFilterAndSearch2(term, rowData, "Sector", "string");
              },
              customSort: (a, b) => a?.ExchangeName?.value?.localeCompare(b?.ExchangeName?.value),
              render: (row) => {
                return (
                  <div
                    style={{
                      backgroundColor: row["Sector"]?.background,
                      textAlign: "center",
                      color: row["Sector"]?.color,
                    }}
                  >
                    <span> {row["Sector"]?.value}</span>
                  </div>
                );
              },
            },
            {
              title: "DtScore",
              field: "DeltaScore",
              type: "string",
              align: "right",
              customFilterAndSearch: (term, rowData) => {
                return customFilterAndSearch(term, rowData, "DeltaScore", "number");
              },
              render: (row) => {
                return <font color={row["DeltaScore"]?.color}>{row["DeltaScore"]?.value}</font>;
              },
              customSort: (a, b) => a["DeltaScore"].value - b["DeltaScore"].value,
            },
            {
              title: "DtMK",
              field: "DeltaMK",
              type: "string",
              align: "right",
              customFilterAndSearch: (term, rowData) => {
                return customFilterAndSearch(term, rowData, "DeltaMK", "number");
              },
              render: (row) => {
                return (
                  <font color={row["DeltaMK"]?.background ? row["DeltaMK"]?.color : "black"}>
                    {row["DeltaMK"]?.value}
                  </font>
                );
              },
              customSort: (a, b) => a["DeltaMK"].value - b["DeltaMK"].value,
            },
            {
              title: "T-9",
              field: "T-9",
              type: "string",
              customFilterAndSearch: (term, rowData) => {
                let fields = ["Column 5", "Column 6", "Column 7", "Column 8", "T-9"];
                return customFilterAndSearchWithMultipleField(term, rowData, fields, "string");
              },
              cellStyle: (values) => {
                console.log(values);
                return {};
              },
              sorting: false,
              render: (row) => {
                return (
                  <div
                    className="div-table-cell"
                    style={{
                      backgroundColor: row["T-9"]?.background,
                      textAlign: "center",
                      color: row["T-9"]?.color,
                    }}
                  >
                    <font
                      style={{
                        color: row["Column 5"]?.color,
                      }}
                    >
                      {row["Column 5"] ? row["Column 5"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["Column 6"]?.color,
                      }}
                    >
                      {row["Column 6"] ? row["Column 6"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["Column 7"]?.color,
                      }}
                    >
                      {row["Column 7"] ? row["Column 7"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["Column 8"]?.color,
                      }}
                    >
                      {row["Column 8"] ? row["Column 8"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["Column 9"]?.color,
                      }}
                    >
                      {row["Column 9"] ? row["Column 9"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["T-9"]?.color,
                      }}
                    >
                      {row["T-9"]?.value ? row["T-9"]?.value : ""}
                    </font>
                  </div>
                );
              },
            },
            {
              title: "T-8",
              field: "T-8",
              type: "string",
              customFilterAndSearch: (term, rowData) => {
                let fields = ["Column 10", "Column 11", "Column 12", "Column 13", "T-8"];
                return customFilterAndSearchWithMultipleField(term, rowData, fields, "string");
              },
              sorting: false,
              render: (row) => {
                return (
                  <div
                    className="div-table-cell"
                    style={{
                      backgroundColor: row["T-8"]?.background,
                      textAlign: "center",
                      color: row["T-8"]?.color,
                    }}
                  >
                    <font
                      style={{
                        color: row["Column 10"]?.color,
                      }}
                    >
                      {row["Column 10"] ? row["Column 10"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["Column 11"]?.color,
                      }}
                    >
                      {row["Column 11"] ? row["Column 11"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["Column 12"]?.color,
                      }}
                    >
                      {row["Column 12"] ? row["Column 12"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["Column 13"]?.color,
                      }}
                    >
                      {row["Column 13"] ? row["Column 13"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["Column 14"]?.color,
                      }}
                    >
                      {row["Column 14"] ? row["Column 14"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["T-8"]?.color,
                      }}
                    >
                      {row["T-8"]?.value ? row["T-8"]?.value : ""}
                    </font>
                  </div>
                );
              },
            },
            {
              title: "T-7",
              field: "T-7",
              type: "string",
              customFilterAndSearch: (term, rowData) => {
                let fields = ["Column 15", "Column 16", "Column 17", "Column 18", "T-7"];
                return customFilterAndSearchWithMultipleField(term, rowData, fields, "string");
              },

              sorting: false,
              render: (row) => {
                return (
                  <div
                    className="div-table-cell"
                    style={{
                      backgroundColor: row["T-8"]?.background,
                      textAlign: "center",
                      color: row["T-8"]?.color,
                    }}
                  >
                    <font
                      style={{
                        color: row["Column 15"]?.color,
                      }}
                    >
                      {row["Column 15"] ? row["Column 15"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["Column 16"]?.color,
                      }}
                    >
                      {row["Column 16"] ? row["Column 16"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["Column 17"]?.color,
                      }}
                    >
                      {row["Column 17"] ? row["Column 17"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["Column 18"]?.color,
                      }}
                    >
                      {row["Column 18"] ? row["Column 18"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["Column 19"]?.color,
                      }}
                    >
                      {row["Column 19"] ? row["Column 19"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["T-7"]?.color,
                      }}
                    >
                      {row["T-7"]?.value ? row["T-7"]?.value : ""}
                    </font>
                  </div>
                );
              },
            },
            {
              title: "T-6",
              field: "T-6",
              type: "string",
              customFilterAndSearch: (term, rowData) => {
                let fields = ["Column 20", "Column 21", "Column 22", "Column 23", "T-6"];
                return customFilterAndSearchWithMultipleField(term, rowData, fields, "string");
              },

              sorting: false,
              render: (row) => {
                return (
                  <div
                    className="div-table-cell"
                    style={{
                      backgroundColor: row["T-6"]?.background,
                      textAlign: "center",
                      color: row["T-6"]?.color,
                    }}
                  >
                    <font
                      style={{
                        color: row["Column 20"]?.color,
                      }}
                    >
                      {row["Column 20"] ? row["Column 20"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["Column 21"]?.color,
                      }}
                    >
                      {row["Column 21"] ? row["Column 21"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["Column 22"]?.color,
                      }}
                    >
                      {row["Column 22"] ? row["Column 22"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["Column 23"]?.color,
                      }}
                    >
                      {row["Column 23"] ? row["Column 23"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["Column 24"]?.color,
                      }}
                    >
                      {row["Column 24"] ? row["Column 24"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["T-6"]?.color,
                      }}
                    >
                      {row["T-6"]?.value ? row["T-6"]?.value : ""}
                    </font>
                  </div>
                );
              },
            },
            {
              title: "T-5",
              field: "T-5",
              type: "string",
              sorting: false,
              customFilterAndSearch: (term, rowData) => {
                let fields = ["Column 25", "Column 26", "Column 27", "Column 28", "T-5"];
                return customFilterAndSearchWithMultipleField(term, rowData, fields, "string");
              },

              render: (row) => {
                return (
                  <div
                    className="div-table-cell"
                    style={{
                      backgroundColor: row["T-5"]?.background,
                      textAlign: "center",
                      color: row["T-5"]?.color,
                    }}
                  >
                    <font
                      style={{
                        color: row["Column 25"]?.color,
                      }}
                    >
                      {row["Column 25"] ? row["Column 25"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["Column 26"]?.color,
                      }}
                    >
                      {row["Column 26"] ? row["Column 26"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["Column 27"]?.color,
                      }}
                    >
                      {row["Column 27"] ? row["Column 27"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["Column 28"]?.color,
                      }}
                    >
                      {row["Column 28"] ? row["Column 28"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["Column 29"]?.color,
                      }}
                    >
                      {row["Column 29"] ? row["Column 29"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["T-5"]?.color,
                      }}
                    >
                      {row["T-5"]?.value ? row["T-5"]?.value : ""}
                    </font>
                  </div>
                );
              },
            },
            {
              title: "T-4",
              field: "T-4",
              customFilterAndSearch: (term, rowData) => {
                let fields = ["Column 30", "Column 31", "Column 32", "Column 33", "T-4"];
                return customFilterAndSearchWithMultipleField(term, rowData, fields, "string");
              },

              type: "string",
              sorting: false,
              render: (row) => {
                return (
                  <div
                    className="div-table-cell"
                    style={{
                      backgroundColor: row["T-4"]?.background,
                      textAlign: "center",
                      color: row["T-4"]?.color,
                    }}
                  >
                    <font
                      style={{
                        color: row["Column 30"]?.color,
                      }}
                    >
                      {row["Column 30"] ? row["Column 30"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["Column 31"]?.color,
                      }}
                    >
                      {row["Column 31"] ? row["Column 31"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["Column 32"]?.color,
                      }}
                    >
                      {row["Column 32"] ? row["Column 32"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["Column 33"]?.color,
                      }}
                    >
                      {row["Column 33"] ? row["Column 33"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["Column 34"]?.color,
                      }}
                    >
                      {row["Column 34"] ? row["Column 34"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["T-4"]?.color,
                      }}
                    >
                      {row["T-4"]?.value ? row["T-4"]?.value : ""}
                    </font>
                  </div>
                );
              },
            },
            {
              title: "T-3",
              field: "T-3",
              type: "string",
              customFilterAndSearch: (term, rowData) => {
                let fields = ["Column 35", "Column 36", "Column 37", "Column 38", "T-3"];
                return customFilterAndSearchWithMultipleField(term, rowData, fields, "string");
              },
              sorting: false,
              render: (row) => {
                return (
                  <div
                    className="div-table-cell"
                    style={{
                      backgroundColor: row["T-3"]?.background,
                      textAlign: "center",
                      color: row["T-3"]?.color,
                    }}
                  >
                    <font
                      style={{
                        color: row["Column 35"]?.color,
                      }}
                    >
                      {row["Column 35"] ? row["Column 35"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["Column 36"]?.color,
                      }}
                    >
                      {row["Column 36"] ? row["Column 36"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["Column 37"]?.color,
                      }}
                    >
                      {row["Column 37"] ? row["Column 37"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["Column 38"]?.color,
                      }}
                    >
                      {row["Column 38"] ? row["Column 38"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["Column 39"]?.color,
                      }}
                    >
                      {row["Column 39"] ? row["Column 39"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["T-3"]?.color,
                      }}
                    >
                      {row["T-3"]?.value ? row["T-3"]?.value : ""}
                    </font>
                  </div>
                );
              },
            },
            {
              title: "T-2",
              field: "T-2",
              customFilterAndSearch: (term, rowData) => {
                let fields = ["Column 40", "Column 41", "Column 42", "Column 43", "T-2"];
                return customFilterAndSearchWithMultipleField(term, rowData, fields, "string");
              },
              sorting: false,
              type: "string",
              render: (row) => {
                return (
                  <div
                    className="div-table-cell"
                    style={{
                      backgroundColor: row["T-2"]?.background,
                      textAlign: "center",
                      color: row["T-2"]?.color,
                    }}
                  >
                    <font
                      style={{
                        color: row["Column 40"]?.color,
                      }}
                    >
                      {row["Column 40"] ? row["Column 40"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["Column 41"]?.color,
                      }}
                    >
                      {row["Column 41"] ? row["Column 41"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["Column 42"]?.color,
                      }}
                    >
                      {row["Column 42"] ? row["Column 42"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["Column 43"]?.color,
                      }}
                    >
                      {row["Column 43"] ? row["Column 43"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["Column 44"]?.color,
                      }}
                    >
                      {row["Column 44"] ? row["Column 44"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["T-2"]?.color,
                      }}
                    >
                      {row["T-2"]?.value ? row["T-2"]?.value : ""}
                    </font>
                  </div>
                );
              },
            },
            {
              title: "T-1",
              field: "T-1",
              type: "string",
              sorting: false,
              customFilterAndSearch: (term, rowData) => {
                let fields = ["Column 45", "Column 46", "Column 47", "Column 48", "T-1"];
                return customFilterAndSearchWithMultipleField(term, rowData, fields, "string");
              },
              render: (row) => {
                return (
                  <div
                    className="div-table-cell"
                    style={{
                      backgroundColor: row["T-1"]?.background,
                      textAlign: "center",
                      color: row["T-1"]?.color,
                    }}
                  >
                    <font
                      style={{
                        color: row["Column 45"]?.color,
                      }}
                    >
                      {row["Column 45"] ? row["Column 45"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["Column 46"]?.color,
                      }}
                    >
                      {row["Column 46"] ? row["Column 46"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["Column 47"]?.color,
                      }}
                    >
                      {row["Column 47"] ? row["Column 47"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["Column 48"]?.color,
                      }}
                    >
                      {row["Column 48"] ? row["Column 48"]?.value : ""}
                    </font>

                    <font
                      style={{
                        color: row["Column 49"]?.color,
                      }}
                    >
                      {row["Column 49"] ? row["Column 49"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["T-1"]?.color,
                      }}
                    >
                      {row["T-1"]?.value ? row["T-1"]?.value : ""}
                    </font>
                  </div>
                );
              },
            },
            {
              title: "T-0",
              field: "T-0",
              customFilterAndSearch: (term, rowData) => {
                let fields = [
                  "Column 50",
                  "Column 51",
                  "Column 52",
                  "Column 53",
                  "Column 54",
                  "Column 55",
                  "T-0",
                ];
                return customFilterAndSearchWithMultipleField(term, rowData, fields, "string");
              },
              sorting: false,
              type: "string",
              render: (row) => {
                return (
                  <div
                    className="div-table-cell"
                    style={{
                      backgroundColor: row["T-0"]?.background,
                      textAlign: "center",
                      color: row["T-0"]?.color,
                    }}
                  >
                    <font
                      style={{
                        color: row["Column 50"]?.color,
                      }}
                    >
                      {row["Column 50"] ? row["Column 50"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["Column 51"]?.color,
                      }}
                    >
                      {row["Column 51"] ? row["Column 51"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["Column 52"]?.color,
                      }}
                    >
                      {row["Column 52"] ? row["Column 52"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["Column 53"]?.color,
                      }}
                    >
                      {row["Column 53"] ? row["Column 53"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["Column 54"]?.color,
                      }}
                    >
                      {row["Column 54"] ? row["Column 54"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["Column 55"]?.color,
                        marginTop: "10px",
                      }}
                    >
                      {row["Column 55"] ? row["Column 55"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["T-0"]?.color,
                      }}
                    >
                      {row["T-0"]?.value ? row["T-0"]?.value : ""}
                    </font>
                  </div>
                );
              },
            },
            {
              title: "Close",
              field: "Close",
              type: "string",
              align: "right",
              customFilterAndSearch: (term, rowData) => {
                return customFilterAndSearch(term, rowData, "Close", "number");
              },
              render: (row) => {
                return <font color={row["Close"]?.color}>{row["Close"]?.value}</font>;
              },
              customSort: (a, b) => a?.Close?.value - b?.Close?.value,
            },
            {
              title: "Score",
              field: "SCORE",
              type: "string",
              align: "right",
              customFilterAndSearch: (term, rowData) => {
                return customFilterAndSearch(term, rowData, "SCORE", "number");
              },
              render: (row) => {
                return (
                  <div
                    className="div-table-cell"
                    style={{
                      backgroundColor: row["SCORE"]?.background,
                      textAlign: "center",
                      color: row["SCORE"]?.color,
                    }}
                  >
                    <font
                      style={{
                        color: row["SCORE"]?.color,
                      }}
                    >
                      {row["SCORE"]?.value ? row["SCORE"]?.value : ""}
                    </font>
                  </div>
                );
              },
              customSort: (a, b) => parseFloat(a?.SCORE?.value) - parseFloat(b?.SCORE?.value),
            },
            {
              title: "Maker",
              field: "MKControl",
              type: "string",
              align: "right",
              customFilterAndSearch: (term, rowData) => {
                return customFilterAndSearch(term, rowData, "MKControl", "number");
              },
              render: (row) => {
                return <font color={row["MKControl"]?.color}>{row["MKControl"]?.value}</font>;
              },
              customSort: (a, b) => parseFloat(a?.MKControl?.value) - parseFloat(b?.MKControl?.value),
            },
            {
              title: "Vol",
              field: "Volume",
              type: "string",
              align: "right",
              customFilterAndSearch: (term, rowData) => {
                return customFilterAndSearch(term, rowData, "Volume", "number");
              },
              render: (row) => {
                return <font color={row["Volume"]?.color}>{row["Volume"]?.value}</font>;
              },
              customSort: (a, b) =>
                parseFloat(a?.Volume?.value?.replaceAll(",", "")) -
                parseFloat(b?.Volume?.value?.replaceAll(",", "")),
            },
            {
              title: "Daily Radar",
              field: "Daily Radar",
              customFilterAndSearch: (term, rowData) => {
                let fields = ["G21", "G22", "G23", "G24", "G25", "G26"];
                return customFilterAndSearchWithMultipleField(term, rowData, fields, "string");
              },
              sorting: false,
              type: "string",
              render: (row) => {
                return (
                  <div
                    className="div-table-cell"
                    style={{
                      backgroundColor: row["Daily Radar"]?.background,
                      textAlign: "left",
                      color: row["Daily Radar"]?.color,
                    }}
                  >
                    <font
                      style={{
                        color: row["G21"]?.color,
                      }}
                    >
                      {row["G21"] ? row["G21"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["G22"]?.color,
                      }}
                    >
                      {row["G22"] ? row["G22"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["G23"]?.color,
                      }}
                    >
                      {row["G23"] ? row["G23"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["G24"]?.color,
                      }}
                    >
                      {row["G24"] ? row["G24"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["G25"]?.color,
                      }}
                    >
                      {row["G25"] ? row["G25"]?.value : ""}
                    </font>
                    <font
                      style={{
                        color: row["G26"]?.color,
                        marginTop: "10px",
                      }}
                    ></font>
                    <font
                      style={{
                        color: row["G26"]?.color,
                        marginTop: "10px",
                      }}
                    >
                      {row["G26"] ? row["G26"]?.value : ""}
                    </font>
                  </div>
                );
              },
            },
            {
              title: "%Day",
              field: "Change(%)",
              type: "string",
              align: "right",
              customFilterAndSearch: (term, rowData) => {
                return customFilterAndSearch(term, rowData, "Change(%)", "number");
              },
              render: (row) => {
                return <font color={row["Change(%)"]?.color}>{row["Change(%)"]?.value}</font>;
              },
              customSort: (a, b) => a["Change(%)"].value - b["Change(%)"].value,
            },
            {
              title: "Trend%",
              field: "TrendCycle(%)",
              type: "string",
              align: "right",
              sorting: false,
              customFilterAndSearch: (term, rowData) => {
                return customFilterAndSearch(term, rowData, "TrendCycle(%)", "number");
              },
              render: (row) => {
                return (
                  <div
                    className="div-table-cell"
                    style={{
                      backgroundColor: row["TrendCycle(%)"]?.background,
                      textAlign: "right",
                      color: row["TrendCycle(%)"]?.color,
                    }}
                  >
                    <font style={{ float: "right" }}>{row["TrendCycle(%)"]?.value}</font>
                  </div>
                );
              },
            },
            {
              title: "L-Trend%",
              field: "Longtrend(%)",
              type: "string",
              align: "right",
              sorting: true,
              customFilterAndSearch: (term, rowData) => {
                return customFilterAndSearch(term, rowData, "Longtrend(%)", "number");
              },
              render: (row) => {
                return (
                  <div
                    className="div-table-cell"
                    style={{
                      backgroundColor: row["Longtrend(%)"]?.background,
                      textAlign: "right",
                      color: row["Longtrend(%)"]?.color,
                    }}
                  >
                    <font style={{ float: "right" }}>{row["Longtrend(%)"]?.value}</font>
                  </div>
                );
              },
              customSort: (a, b) =>
                parseFloat(a?.["Longtrend(%)"]?.value?.replaceAll(",", "")) -
                parseFloat(b?.["Longtrend(%)"]?.value?.replaceAll(",", "")),
            },
            {
              title: "Distribution",
              field: "TrendCycle(%)",
              type: "string",
              align: "right",
              sorting: false,
              customFilterAndSearch: (term, rowData) => {
                let fields = ["G31", "G32", "G33"];
                return customFilterAndSearchWithMultipleField(term, rowData, fields, "string");
              },
              render: (row) => {
                return (
                  <div
                    className="div-table-cell"
                    style={{
                      backgroundColor: row["TrendCycle(%)"]?.background,
                      textAlign: "right",
                      // color: row['TrendCycle(%)']?.color
                    }}
                  >
                    <font
                      style={{
                        color: row["G31"]?.color,
                        marginTop: "10px",
                      }}
                    >
                      {row["G32"] ? row["G31"]?.value : ""}
                    </font>{" "}
                    <font
                      style={{
                        color: row["G32"]?.color,
                        marginTop: "10px",
                      }}
                    >
                      {row["G32"] ? row["G32"]?.value : ""}
                    </font>
                  </div>
                );
              },
            },
          ]}
          data={data}
          options={{
            search: true,
            filtering: true,
            pageSize: 20,
            pageSizeOptions: [10, 20, 30, 50, 100],
            maxBodyHeight: 710,
            hideFilterIcons: false,
            padding: "dense",
            tableLayout: "auto",
            headerStyle: {
              backgroundColor: "rgb(237, 245, 237)",
              textAlign: "center",
              fontWeight: "bold",
            },
            rowStyle: {
              height: "120px",
            },
            filterRowStyle: {
              position: "sticky",
              top: 36,
              background: "white",
              zIndex: 5 /* optionally */,
            },
          }}
          icons={{
            Filter: Search,
          }}
          localization={{
            body: {
              emptyDataSourceMessage: "Không có dữ liệu",
            },
            pagination: {
              labelRowsSelect: "Bản ghi",
              labelRowsPerPage: "Số bản ghi/trang",
              firstAriaLabel: "Trang đầu tiên",
              firstTooltip: "Trang đầu tiên",
              previousAriaLabel: "Trang trước",
              previousTooltip: "Trang trước",
              nextAriaLabel: "Trang sau",
              nextTooltip: "Trang sau",
              lastAriaLabel: "Trang cuối cùng",
              lastTooltip: "Trang cuối cùng",
            },
            toolbar: {
              searchPlaceholder: "Tìm kiếm",
              searchTooltip: "Tìm kiếm",
            },
          }}
        />
      </ThemeProvider>
    </div>
  );
}
export default CustomFilteringAlgorithm;
