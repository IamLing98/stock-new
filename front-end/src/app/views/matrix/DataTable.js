import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { LicenseManager } from "ag-grid-enterprise";
import ChildMessageRenderer from "./ChildMessageRenderer";
import CommonFilter from "./utils/commonFilter";
import AG_GRID_LOCALE_ZZZ from "./locale.zzz";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./style.scss";

LicenseManager.setLicenseKey("<enterprisekey>");

const columnsDefault = [
  {
    title: "Ticker",
    field: "TickerSearch",
    type: "string",
    filter: CommonFilter,
    customFilterAndSearch: (term, rowData) => {
      return console.log(term, rowData, ["Ticker"], "string");
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
    field: "Date/TimeSearch",
    type: "string",
    customFilterAndSearch: (term, rowData) => {
      return console.log(term, rowData, "Date/Time", "string");
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
    field: "ExchangeSearch",
    type: "string",
    customSort: (a, b) => a?.ExchangeName?.value?.localeCompare(b?.ExchangeName?.value),
    lookup: { HOSE: "HOSE", HNX: "HNX", UPCOM: "UpCOM" },
    customFilterAndSearch: (term, rowData) => {
      return console.log(term, rowData, "Exchange", "string");
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
    field: "TypeSearch",
    type: "string",
    customSort: (a, b) => a?.ExchangeName?.value?.localeCompare(b?.ExchangeName?.value),
    customFilterAndSearch: (term, rowData) => {
      return console.log(term, rowData, "Type", "string");
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
    field: "SectorSearch",
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
      return console.log(term, rowData, "Sector", "string");
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
    field: "DeltaScoreSearch",
    type: "string",
    align: "right",
    customFilterAndSearch: (term, rowData) => {
      return console.log(term, rowData, "DeltaScore", "number");
    },
    render: (row) => {
      return (
        <p className="p-inrow" color={row["DeltaScore"]?.color}>
          {row["DeltaScore"]?.value}
        </p>
      );
    },
    customSort: (a, b) => a["DeltaScore"].value - b["DeltaScore"].value,
  },
  {
    title: "DtMK",
    field: "DeltaMKSearch",
    type: "string",
    align: "right",
    customFilterAndSearch: (term, rowData) => {
      return console.log(term, rowData, "DeltaMK", "number");
    },
    render: (row) => {
      return (
        <p className="p-inrow" color={row["DeltaMK"]?.background ? row["DeltaMK"]?.color : "black"}>
          {row["DeltaMK"]?.value}
        </p>
      );
    },
    customSort: (a, b) => a["DeltaMK"].value - b["DeltaMK"].value,
  },
  {
    title: "T-9",
    field: "T-9Search",
    type: "string",
    customFilterAndSearch: (term, rowData) => {
      let fields = ["Column 5", "Column 6", "Column 7", "Column 8", "T-9"];
      return console.log(term, rowData, fields, "string");
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
          <p
            className="p-inrow"
            style={{
              color: row["Column 5"]?.color,
            }}
          >
            {row["Column 5"] ? row["Column 5"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["Column 6"]?.color,
            }}
          >
            {row["Column 6"] ? row["Column 6"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["Column 7"]?.color,
            }}
          >
            {row["Column 7"] ? row["Column 7"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["Column 8"]?.color,
            }}
          >
            {row["Column 8"] ? row["Column 8"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["Column 9"]?.color,
            }}
          >
            {row["Column 9"] ? row["Column 9"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["T-9"]?.color,
            }}
          >
            {row["T-9"]?.value ? row["T-9"]?.value : ""}
          </p>
        </div>
      );
    },
  },
  {
    title: "T-8",
    field: "T-8Search",
    type: "string",
    customFilterAndSearch: (term, rowData) => {
      let fields = ["Column 10", "Column 11", "Column 12", "Column 13", "T-8"];
      return console.log(term, rowData, fields, "string");
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
          <p
            className="p-inrow"
            style={{
              color: row["Column 10"]?.color,
            }}
          >
            {row["Column 10"] ? row["Column 10"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["Column 11"]?.color,
            }}
          >
            {row["Column 11"] ? row["Column 11"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["Column 12"]?.color,
            }}
          >
            {row["Column 12"] ? row["Column 12"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["Column 13"]?.color,
            }}
          >
            {row["Column 13"] ? row["Column 13"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["Column 14"]?.color,
            }}
          >
            {row["Column 14"] ? row["Column 14"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["T-8"]?.color,
            }}
          >
            {row["T-8"]?.value ? row["T-8"]?.value : ""}
          </p>
        </div>
      );
    },
  },
  {
    title: "T-7",
    field: "T-7Search",
    type: "string",
    customFilterAndSearch: (term, rowData) => {
      let fields = ["Column 15", "Column 16", "Column 17", "Column 18", "T-7"];
      return console.log(term, rowData, fields, "string");
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
          <p
            className="p-inrow"
            style={{
              color: row["Column 15"]?.color,
            }}
          >
            {row["Column 15"] ? row["Column 15"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["Column 16"]?.color,
            }}
          >
            {row["Column 16"] ? row["Column 16"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["Column 17"]?.color,
            }}
          >
            {row["Column 17"] ? row["Column 17"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["Column 18"]?.color,
            }}
          >
            {row["Column 18"] ? row["Column 18"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["Column 19"]?.color,
            }}
          >
            {row["Column 19"] ? row["Column 19"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["T-7"]?.color,
            }}
          >
            {row["T-7"]?.value ? row["T-7"]?.value : ""}
          </p>
        </div>
      );
    },
  },
  {
    title: "T-6",
    field: "T-6Search",
    type: "string",
    customFilterAndSearch: (term, rowData) => {
      let fields = ["Column 20", "Column 21", "Column 22", "Column 23", "T-6"];
      return console.log(term, rowData, fields, "string");
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
          <p
            className="p-inrow"
            style={{
              color: row["Column 20"]?.color,
            }}
          >
            {row["Column 20"] ? row["Column 20"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["Column 21"]?.color,
            }}
          >
            {row["Column 21"] ? row["Column 21"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["Column 22"]?.color,
            }}
          >
            {row["Column 22"] ? row["Column 22"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["Column 23"]?.color,
            }}
          >
            {row["Column 23"] ? row["Column 23"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["Column 24"]?.color,
            }}
          >
            {row["Column 24"] ? row["Column 24"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["T-6"]?.color,
            }}
          >
            {row["T-6"]?.value ? row["T-6"]?.value : ""}
          </p>
        </div>
      );
    },
  },
  {
    title: "T-5",
    field: "T-5Search",
    type: "string",
    sorting: false,
    customFilterAndSearch: (term, rowData) => {
      let fields = ["Column 25", "Column 26", "Column 27", "Column 28", "T-5"];
      return console.log(term, rowData, fields, "string");
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
          <p
            className="p-inrow"
            style={{
              color: row["Column 25"]?.color,
            }}
          >
            {row["Column 25"] ? row["Column 25"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["Column 26"]?.color,
            }}
          >
            {row["Column 26"] ? row["Column 26"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["Column 27"]?.color,
            }}
          >
            {row["Column 27"] ? row["Column 27"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["Column 28"]?.color,
            }}
          >
            {row["Column 28"] ? row["Column 28"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["Column 29"]?.color,
            }}
          >
            {row["Column 29"] ? row["Column 29"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["T-5"]?.color,
            }}
          >
            {row["T-5"]?.value ? row["T-5"]?.value : ""}
          </p>
        </div>
      );
    },
  },
  {
    title: "T-4",
    field: "T-4Search",
    customFilterAndSearch: (term, rowData) => {
      let fields = ["Column 30", "Column 31", "Column 32", "Column 33", "T-4"];
      return console.log(term, rowData, fields, "string");
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
          <p
            className="p-inrow"
            style={{
              color: row["Column 30"]?.color,
            }}
          >
            {row["Column 30"] ? row["Column 30"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["Column 31"]?.color,
            }}
          >
            {row["Column 31"] ? row["Column 31"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["Column 32"]?.color,
            }}
          >
            {row["Column 32"] ? row["Column 32"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["Column 33"]?.color,
            }}
          >
            {row["Column 33"] ? row["Column 33"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["Column 34"]?.color,
            }}
          >
            {row["Column 34"] ? row["Column 34"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["T-4"]?.color,
            }}
          >
            {row["T-4"]?.value ? row["T-4"]?.value : ""}
          </p>
        </div>
      );
    },
  },
  {
    title: "T-3",
    field: "T-3Search",
    type: "string",
    customFilterAndSearch: (term, rowData) => {
      let fields = ["Column 35", "Column 36", "Column 37", "Column 38", "T-3"];
      return console.log(term, rowData, fields, "string");
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
          <p
            className="p-inrow"
            style={{
              color: row["Column 35"]?.color,
            }}
          >
            {row["Column 35"] ? row["Column 35"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["Column 36"]?.color,
            }}
          >
            {row["Column 36"] ? row["Column 36"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["Column 37"]?.color,
            }}
          >
            {row["Column 37"] ? row["Column 37"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["Column 38"]?.color,
            }}
          >
            {row["Column 38"] ? row["Column 38"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["Column 39"]?.color,
            }}
          >
            {row["Column 39"] ? row["Column 39"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["T-3"]?.color,
            }}
          >
            {row["T-3"]?.value ? row["T-3"]?.value : ""}
          </p>
        </div>
      );
    },
  },
  {
    title: "T-2",
    field: "T-2Search",
    customFilterAndSearch: (term, rowData) => {
      let fields = ["Column 40", "Column 41", "Column 42", "Column 43", "T-2"];
      return console.log(term, rowData, fields, "string");
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
          <p
            className="p-inrow"
            style={{
              color: row["Column 40"]?.color,
            }}
          >
            {row["Column 40"] ? row["Column 40"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["Column 41"]?.color,
            }}
          >
            {row["Column 41"] ? row["Column 41"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["Column 42"]?.color,
            }}
          >
            {row["Column 42"] ? row["Column 42"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["Column 43"]?.color,
            }}
          >
            {row["Column 43"] ? row["Column 43"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["Column 44"]?.color,
            }}
          >
            {row["Column 44"] ? row["Column 44"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["T-2"]?.color,
            }}
          >
            {row["T-2"]?.value ? row["T-2"]?.value : ""}
          </p>
        </div>
      );
    },
  },
  {
    title: "T-1",
    field: "T-1Search",
    type: "string",
    sorting: false,
    customFilterAndSearch: (term, rowData) => {
      let fields = ["Column 45", "Column 46", "Column 47", "Column 48", "T-1"];
      return console.log(term, rowData, fields, "string");
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
          <p
            className="p-inrow"
            style={{
              color: row["Column 45"]?.color,
            }}
          >
            {row["Column 45"] ? row["Column 45"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["Column 46"]?.color,
            }}
          >
            {row["Column 46"] ? row["Column 46"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["Column 47"]?.color,
            }}
          >
            {row["Column 47"] ? row["Column 47"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["Column 48"]?.color,
            }}
          >
            {row["Column 48"] ? row["Column 48"]?.value : ""}
          </p>

          <p
            className="p-inrow"
            style={{
              color: row["Column 49"]?.color,
            }}
          >
            {row["Column 49"] ? row["Column 49"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["T-1"]?.color,
            }}
          >
            {row["T-1"]?.value ? row["T-1"]?.value : ""}
          </p>
        </div>
      );
    },
  },
  {
    title: "T-0",
    field: "T-0Search",
    customFilterAndSearch: (term, rowData) => {
      let fields = ["Column 50", "Column 51", "Column 52", "Column 53", "Column 54", "Column 55", "T-0"];
      return console.log(term, rowData, fields, "string");
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
          <p
            className="p-inrow"
            style={{
              color: row["Column 50"]?.color,
            }}
          >
            {row["Column 50"] ? row["Column 50"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["Column 51"]?.color,
            }}
          >
            {row["Column 51"] ? row["Column 51"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["Column 52"]?.color,
            }}
          >
            {row["Column 52"] ? row["Column 52"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["Column 53"]?.color,
            }}
          >
            {row["Column 53"] ? row["Column 53"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["Column 54"]?.color,
            }}
          >
            {row["Column 54"] ? row["Column 54"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["Column 55"]?.color,
              marginTop: "10px",
            }}
          >
            {row["Column 55"] ? row["Column 55"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["T-0"]?.color,
            }}
          >
            {row["T-0"]?.value ? row["T-0"]?.value : ""}
          </p>
        </div>
      );
    },
  },
  {
    title: "Close",
    field: "CloseSearch",
    type: "string",
    align: "right",
    customFilterAndSearch: (term, rowData) => {
      return console.log(term, rowData, "Close", "number");
    },
    render: (row) => {
      return (
        <p className="p-inrow" color={row["Close"]?.color}>
          {row["Close"]?.value}
        </p>
      );
    },
    customSort: (a, b) => a?.Close?.value - b?.Close?.value,
  },
  {
    title: "Score",
    field: "SCORESearch",
    type: "string",
    align: "right",
    customFilterAndSearch: (term, rowData) => {
      return console.log(term, rowData, "SCORE", "number");
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
          <p
            className="p-inrow"
            style={{
              color: row["SCORE"]?.color,
            }}
          >
            {row["SCORE"]?.value ? row["SCORE"]?.value : ""}
          </p>
        </div>
      );
    },
    customSort: (a, b) => parseFloat(a?.SCORE?.value) - parseFloat(b?.SCORE?.value),
  },
  {
    title: "Maker",
    field: "MKControlSearch",
    type: "string",
    align: "right",
    customFilterAndSearch: (term, rowData) => {
      return console.log(term, rowData, "MKControl", "number");
    },
    render: (row) => {
      return (
        <p className="p-inrow" color={row["MKControl"]?.color}>
          {row["MKControl"]?.value}
        </p>
      );
    },
    customSort: (a, b) => parseFloat(a?.MKControl?.value) - parseFloat(b?.MKControl?.value),
  },
  {
    title: "Vol",
    field: "VolumeSearch",
    type: "string",
    align: "right",
    customFilterAndSearch: (term, rowData) => {
      return console.log(term, rowData, "Volume", "number");
    },
    render: (row) => {
      return (
        <p className="p-inrow" color={row["Volume"]?.color}>
          {row["Volume"]?.value}
        </p>
      );
    },
    customSort: (a, b) =>
      parseFloat(a?.Volume?.value?.replaceAll(",", "")) - parseFloat(b?.Volume?.value?.replaceAll(",", "")),
  },
  {
    title: "Daily Radar",
    field: "DailyRadarSearch",
    customFilterAndSearch: (term, rowData) => {
      let fields = ["G21", "G22", "G23", "G24", "G25", "G26"];
      return console.log(term, rowData, fields, "string");
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
          <p
            className="p-inrow"
            style={{
              color: row["G21"]?.color,
            }}
          >
            {row["G21"] ? row["G21"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["G22"]?.color,
            }}
          >
            {row["G22"] ? row["G22"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["G23"]?.color,
            }}
          >
            {row["G23"] ? row["G23"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["G24"]?.color,
            }}
          >
            {row["G24"] ? row["G24"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["G25"]?.color,
            }}
          >
            {row["G25"] ? row["G25"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["G26"]?.color,
              marginTop: "10px",
            }}
          ></p>
          <p
            className="p-inrow"
            style={{
              color: row["G26"]?.color,
              marginTop: "10px",
            }}
          >
            {row["G26"] ? row["G26"]?.value : ""}
          </p>
        </div>
      );
    },
  },
  {
    title: "%Day",
    field: "Change(%)Search",
    type: "string",
    align: "right",
    customFilterAndSearch: (term, rowData) => {
      return console.log(term, rowData, "Change(%)", "number");
    },
    render: (row) => {
      return (
        <p className="p-inrow" color={row["Change(%)"]?.color}>
          {row["Change(%)"]?.value}
        </p>
      );
    },
    customSort: (a, b) => a["Change(%)"].value - b["Change(%)"].value,
  },
  {
    title: "Trend%",
    field: "TrendCycle(%)Search",
    type: "string",
    align: "right",
    sorting: false,
    customFilterAndSearch: (term, rowData) => {
      return console.log(term, rowData, "TrendCycle(%)", "number");
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
          <p className="p-inrow" style={{ float: "right" }}>
            {row["TrendCycle(%)"]?.value}
          </p>
        </div>
      );
    },
  },
  {
    title: "L-Trend%",
    field: "Longtrend(%)Search",
    type: "string",
    align: "right",
    sorting: true,
    customFilterAndSearch: (term, rowData) => {
      return console.log(term, rowData, "Longtrend(%)", "number");
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
          <p className="p-inrow" style={{ float: "right" }}>
            {row["Longtrend(%)"]?.value}
          </p>
        </div>
      );
    },
    customSort: (a, b) =>
      parseFloat(a?.["Longtrend(%)"]?.value?.replaceAll(",", "")) -
      parseFloat(b?.["Longtrend(%)"]?.value?.replaceAll(",", "")),
  },
  {
    title: "Distribution",
    field: "DistributionSearch",
    type: "string",
    align: "right",
    sorting: false,
    customFilterAndSearch: (term, rowData) => {
      let fields = ["G31", "G32", "G33"];
      return console.log(term, rowData, fields, "string");
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
          <p
            className="p-inrow"
            style={{
              color: row["G31"]?.color,
              marginTop: "10px",
            }}
          >
            {row["G32"] ? row["G31"]?.value : ""}
          </p>{" "}
          <p
            className="p-inrow"
            style={{
              color: row["G32"]?.color,
              marginTop: "10px",
            }}
          >
            {row["G32"] ? row["G32"]?.value : ""}
          </p>
          <p
            className="p-inrow"
            style={{
              color: row["G33"]?.color,
              marginTop: "10px",
            }}
          >
            {row["G33"] ? row["G33"]?.value : ""}
          </p>
        </div>
      );
    },
  },
];

export default function App(props) {
  const gridRef = useRef();

  const [state, setState] = useState({
    modal: false,
    columnDefs: columnsDefault?.map((item) => {
      return {
        headerName: item?.title,
        field: item?.field,
        minWidth: 120,
        cellRenderer: "childMessageRenderer",
        floatingFilter: true,
        cellStyle: (params) => {
          let style = { border: "1px solid white" };
          if (params?.value?.background) {
            style.backgroundColor = params?.value?.background;
          }
          if (params?.value?.color) {
            style.color = params?.value?.color;
          }
          return style;
        },
        render: (row) => item?.render(row),
      };
    }),

    defaultColDef: {
      enableValue: true,
      enablePivot: true,
      sortable: true,
      filter: "agTextColumnFilter",
      /*filter: true,
            checkboxSelection: true,
            filter: "agTextColumnFilter",*/
      resizable: true,
    },
    detailCellRendererParams: {
      detailGridOptions: {
        columnDefs: [
          { field: "callId" },
          { field: "direction" },
          { field: "number" },
          {
            field: "duration",
            valueFormatter: "x.toLocaleString() + 's'",
          },
          { field: "switchCode" },
        ],
        defaultColDef: {
          enableValue: true,
          enablePivot: true,
          sortable: true,
          filter: "agTextColumnFilter",
          /*filter: true,
            checkboxSelection: true,
            filter: "agTextColumnFilter",*/
          resizable: true,
        },
      },
      getDetailRowData: function (params) {
        params.successCallback(params.data.callRecords);
      },
      template:
        '<div style="height: 100%; background-color: #edf6ff; padding: 20px; box-sizing: border-box;">' +
        '  <div style="height: 10%;">Call Details</div>' +
        '  <div ref="eDetailGrid" style="height: 90%;"></div>' +
        "</div>",
    },
    rowData: [],
    rowHeight: 250,
    excelStyles: [
      {
        id: "indent-1",
        alignment: { indent: 1 },
        dataType: "string",
      },
    ],
    searchResult: null,
    sideBar: {
      toolPanels: [
        "columns",
        {
          id: "filters",
          labelKey: "filters",
          labelDefault: "Filters",
          iconKey: "menu",
          toolPanel: "agFiltersToolPanel",
        },
      ],
      defaultToolPanel: "",
    },
    context: { componentParent: this },
    frameworkComponents: {
      childMessageRenderer: ChildMessageRenderer,
    },
    indexRow: null,
  });

  useEffect(() => {
    console.log(" props.data", props.data);
    setState({ ...state, rowData: props.data });
  }, [JSON.stringify(props.data)]);

  useEffect(() => {
    console.log("  gridRef?.current?.columnApi:", gridRef?.current?.columnApi);
    // eslint-disable-next-line no-unused-expressions
    gridRef?.current?.columnApi?.autoSizeAllColumns(true);
  }, [JSON.stringify(state?.rowData)]);

  const toggleModal = () => {
    setState({ modal: !state.modal });
  };

  // Export Exel
  const onBtnExportDataAsExcel = () => {
    gridRef.current.api.exportDataAsExcel();
  };

  // Expand row and apper another table
  const onFirstDataRendered = (params) => {
    // params.api.sizeColumnsToFit();

    // eslint-disable-next-line no-unused-expressions
    gridRef?.current?.columnApi?.autoSizeAllColumns(true);

    /*setTimeout(function() {
      params.api.getDisplayedRowAtIndex(1).setExpanded(true);
    }, 0);*/
  };

  // general search
  const onQuickFilterChanged = () => {
    gridRef.current.api.setQuickFilter(document.getElementById("quickFilter").value);
  };

  //import Exel to table
  /*renderFile = fileObj => {
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Rows uploaded:" + resp.rows);
        setState({
          dataLoaded: true,
          rowData: resp.rows
        });
      }
    });
  };

  fileHandler = event => {
    if (event.target.files.length) {
      let fileObj = event.target.files[0];
      let fileName = fileObj.name;
      console.log(fileObj);
      //check for file extension and pass only if it is .xlsx and display error message otherwise
      if (fileName.slice(fileName.lastIndexOf(".") + 1) === "xlsx") {
        setState({
          uploadedFileName: fileName,
          isFormInvalid: false
        });
        renderFile(fileObj);
      } else {
        setState({
          isFormInvalid: true,
          uploadedFileName: ""
        });
      }
    }
  };*/
  // clear filters
  const clearFilters = () => {
    gridRef.current.api.setFilterModel(null);
    gridRef.current.api.onFilterChanged();
  };

  const methodFromParent = (index) => {
    toggleModal();
    setState({
      indexRow: index,
    });
  };

  const getRowHeight = (params) => {
    console.log("Row params:", params);
    // return 252;
    return 250;
  };

  const localeText = useMemo(() => {
    return AG_GRID_LOCALE_ZZZ;
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div id="parent">
        <div id="child">
          <input
            type="text"
            onInput={onQuickFilterChanged}
            id="quickFilter"
            style={{ right: "0", width: "250px", height: "32px", borderRadius: "4px" }}
            placeholder="Tìm kiếm..."
          />
        </div>
      </div>

      <div className="data-table flex">
        <div id="myGrid" className="ag-theme-alpine" style={{ height: "83vh", width: "100%" }}>
          <AgGridReact
            ref={gridRef}
            // onGridReady={(params) => {
            //     gridRef.current.api = params.api;
            //     gridRef.current.columnApi = params.columnApi;
            // }}
            rowSelection="multiple"
            columnDefs={state.columnDefs}
            defaultColDef={state.defaultColDef}
            sideBar={state.sideBar}
            groupSelectsChildren={true}
            pagination={true}
            paginationPageSize={state.paginationPageSize}
            paginateChildRows={true}
            autoGroupColumnDef={state.autoGroupColumnDef}
            rowData={state.rowData}
            excelStyles={state.excelStyles}
            masterDetail={true}
            onFirstDataRendered={onFirstDataRendered}
            detailCellRendererParams={state.detailCellRendererParams}
            floatingFilter={true}
            cacheQuickFilter={true}
            //   isExternalFilterPresent={isExternalFilterPresent}
            //   doesExternalFilterPass={doesExternalFilterPass}
            suppressMenuHide={true}
            frameworkComponents={state.frameworkComponents}
            context={state.context}
            rowHeight={state.rowHeight}
            localeText={localeText}
          />
        </div>
      </div>
    </div>
  );
}
