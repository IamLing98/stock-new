import React from "react";
import commonFilter from "./commonFilter";

const commonRenderCell = (row, field) => {
  return (
    <>
      {row[field]?.map((item) => {
        return (
          <p
            className="child-in-cell"
            style={{ color: item["TICKERVN"]?.color ? item["TICKERVN"]?.color : "black" }}
          >
            <b>{item?.TICKERVN?.value}</b>
          </p>
        );
      })}
    </>
  );
};
export const columnsMatrix1 = [
  {
    title: "Ticker",
    field: "TickerSearch",
    type: "string",
    filter: commonFilter,
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
          </p>{" "}
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
    render: (row) => {
      return (
        <p className="p-inrow number" color={row["Change(%)"]?.color}>
          {row["Change(%)"]?.value}
        </p>
      );
    },
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

export const columnsMatrix21 = [
  {
    title: "Tên mục",
    field: "label",
    type: "string",
    render: (row) => {
      return <b>{row["label"]}</b>;
    },
  },
  {
    title: "Giảm mạnh",
    field: "strongDown",
    type: "string",
    render: (row) => {
      return commonRenderCell(row, "strongDown");
    },
  },
  {
    title: "Giảm vừa",
    field: "mediumDown",
    type: "string",
    render: (row) => {
      return commonRenderCell(row, "mediumDown");
    },
  },
  {
    title: "Giảm nhẹ",
    field: "softDown",
    type: "string",
    render: (row) => {
      return commonRenderCell(row, "softDown");
    },
  },
  {
    title: "Tham chiếu",
    field: "refer",
    type: "string",
    render: (row) => {
      return commonRenderCell(row, "refer");
    },
  },
  {
    title: "Tăng nhẹ",
    field: "softUp",
    type: "string",
    render: (row) => {
      return commonRenderCell(row, "softUp");
    },
  },
  {
    title: "Tăng vừa",
    field: "mediumUp",
    type: "string",
    render: (row) => {
      return commonRenderCell(row, "mediumUp");
    },
  },
  {
    title: "Tăng mạnh",
    field: "strongUp",
    type: "string",
    render: (row) => {
      return commonRenderCell(row, "strongUp");
    },
  },
];

export const columnsMatrix22 = [
  {
    title: "Tên mục",
    field: "label",
    type: "string",
    render: (row) => {
      return (
        <p className="child-in-cell" style={{ color: row?.label?.color ? row?.label?.color : "black" }}>
          <b>{row?.label?.value}</b>
        </p>
      );
    },
  },
  {
    title: "Giảm mạnh",
    field: "strongDown",
    type: "string",
    render: (row) => {
      return commonRenderWithoutStyle(row, "strongDown");
    },
  },
  {
    title: "Giảm vừa",
    field: "mediumDown",
    type: "string",
    render: (row) => {
      return commonRenderWithoutStyle(row, "mediumDown");
    },
  },
  {
    title: "Giảm nhẹ",
    field: "softDown",
    type: "string",
    render: (row) => {
      return commonRenderWithoutStyle(row, "softDown");
    },
  },
  {
    title: "Tham chiếu",
    field: "refer",
    type: "string",
    render: (row) => {
      return commonRenderWithoutStyle(row, "refer");
    },
  },
  {
    title: "Tăng nhẹ",
    field: "softUp",
    type: "string",
    render: (row) => {
      return commonRenderWithoutStyle(row, "softUp");
    },
  },
  {
    title: "Tăng vừa",
    field: "mediumUp",
    type: "string",
    render: (row) => {
      return commonRenderWithoutStyle(row, "mediumUp");
    },
  },
  {
    title: "Tăng mạnh",
    field: "strongUp",
    type: "string",
    render: (row) => {
      return commonRenderWithoutStyle(row, "strongUp");
    },
  },
  {
    title: "Score TB",
    field: "medianScore",
    type: "string",
    render: (row) => {
      return commonRenderWithoutStyle(row, "medianScore");
    },
  },
  {
    title: "MK TB",
    field: "medianMarket",
    type: "string",
    render: (row) => {
      return commonRenderWithoutStyle(row, "medianMarket");
    },
  },
  {
    title: "Sum Volume",
    field: "sumVolume",
    type: "string",
    render: (row) => {
      return commonRenderWithoutStyle(row, "sumVolume");
    },
  },
  {
    title: "Top 3 Score",
    field: "top3Score",
    type: "string",
    render: (row) => {
      return (
        <>
          {row["top3Score"]?.map((item, index) => {
            return (
              <span
                className="child-in-cell"
                style={{ color: item["TICKERVN"]?.color ? item["TICKERVN"]?.color : "black" }}
              >
                <b>{item?.TICKERVN?.value}</b>,{" "}
              </span>
            );
          })}
        </>
      );
    },
  },
];

export const columnsMatrix3 = [
  {
    title: "Ticker",
    field: "TickerSearch",
    type: "string",
    render: (row) => {
      return (
        <div
          style={{
            backgroundColor: row["Ticker"]?.background,
            textAlign: "center",
            color: row["Ticker"]?.color ? row["Ticker"]?.color : "black",
          }}
        >
          <a
            href={`/dashboard/reports/detail?ticker=${row?.Ticker?.value}`}
            style={{ color: row["Ticker"]?.color, fontWeight: "bolder" }}
          >
            {" "}
            {row?.Ticker?.value}
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
    title: "V30",
    field: "V30Search",
    type: "string",
    render: (row) => {
      return commonRender(row, "V30");
    },
  },
  {
    title: "V29",
    field: "V29Search",
    type: "string",
    render: (row) => {
      return commonRender(row, "V29");
    },
  },
  {
    title: "V28",
    field: "V28Search",
    type: "string",
    render: (row) => {
      return commonRender(row, "V28");
    },
  },
  {
    title: "V27",
    field: "V27Search",
    type: "string",
    render: (row) => {
      return commonRender(row, "V27");
    },
  },
  {
    title: "V26",
    field: "V26Search",
    type: "string",
    render: (row) => {
      return commonRender(row, "V26");
    },
  },
  {
    title: "V25",
    field: "V25Search",
    type: "string",
    render: (row) => {
      return commonRender(row, "V25");
    },
  },
  {
    title: "V24",
    field: "V24Search",
    type: "string",
    render: (row) => {
      return commonRender(row, "V24");
    },
  },
  {
    title: "V23",
    field: "V23Search",
    type: "string",
    render: (row) => {
      return commonRender(row, "V23");
    },
  },
  {
    title: "V22",
    field: "V22Search",
    type: "string",
    render: (row) => {
      return commonRender(row, "V22");
    },
  },
  {
    title: "V21",
    field: "V21Search",
    type: "string",
    render: (row) => {
      return commonRender(row, "V21");
    },
  },
  {
    title: "V20",
    field: "V20Search",
    type: "string",
    render: (row) => {
      return commonRender(row, "V20");
    },
  },
  {
    title: "V19",
    field: "V19Search",
    type: "string",
    render: (row) => {
      return commonRender(row, "V19");
    },
  },
  {
    title: "V18",
    field: "V18Search",
    type: "string",
    render: (row) => {
      return commonRender(row, "V18");
    },
  },
  {
    title: "V17",
    field: "V17Search",
    type: "string",
    render: (row) => {
      return commonRender(row, "V17");
    },
  },
  {
    title: "V16",
    field: "V16Search",
    type: "string",
    render: (row) => {
      return commonRender(row, "V16");
    },
  },
  {
    title: "V15",
    field: "V15Search",
    type: "string",
    render: (row) => {
      return commonRender(row, "V15");
    },
  },
  {
    title: "V14",
    field: "V14Search",
    type: "string",
    render: (row) => {
      return commonRender(row, "V14");
    },
  },
  {
    title: "V13",
    field: "V13Search",
    type: "string",
    render: (row) => {
      return commonRender(row, "V13");
    },
  },
  {
    title: "V12",
    field: "V12Search",
    type: "string",
    render: (row) => {
      return commonRender(row, "V12");
    },
  },
  {
    title: "V11",
    field: "V11Search",
    type: "string",
    render: (row) => {
      return commonRender(row, "V11");
    },
  },
  {
    title: "V10",
    field: "V10Search",
    type: "string",
    render: (row) => {
      return commonRender(row, "V10");
    },
  },
  {
    title: "V9",
    field: "V9Search",
    type: "string",
    render: (row) => {
      return commonRender(row, "V9");
    },
  },
  {
    title: "V8",
    field: "V8Search",
    type: "string",
    render: (row) => {
      return commonRender(row, "V8");
    },
  },
  {
    title: "V7",
    field: "V7Search",
    type: "string",
    render: (row) => {
      return commonRender(row, "V7");
    },
  },
  {
    title: "V6",
    field: "V6Search",
    type: "string",
    render: (row) => {
      return commonRender(row, "V6");
    },
  },
  {
    title: "V5",
    field: "V5Search",
    type: "string",
    render: (row) => {
      return commonRender(row, "V5");
    },
  },
  {
    title: "V4",
    field: "V4Search",
    type: "string",
    render: (row) => {
      return commonRender(row, "V4");
    },
  },
  {
    title: "V3",
    field: "V3Search",
    type: "string",
    render: (row) => {
      return commonRender(row, "V3");
    },
  },
  {
    title: "V2",
    field: "V2Search",
    type: "string",
    render: (row) => {
      return commonRender(row, "V2");
    },
  },
  {
    title: "V1",
    field: "V1Search",
    type: "string",
    render: (row) => {
      return commonRender(row, "V1");
    },
  },
  {
    title: "Avg5",
    field: "Avg5Search",
    type: "string",
    render: (row) => {
      return commonRender(row, "Avg5");
    },
  },
  {
    title: "Avg20",
    field: "Avg20Search",
    type: "string",
    render: (row) => {
      return commonRender(row, "Avg20");
    },
  },
  {
    title: "DotBienVol",
    field: "DotBienVolSearch",
    type: "string",
    render: (row) => {
      return commonRender(row, "DotBienVol");
    },
  },
  {
    title: "%MuaChuDong",
    field: "%MuaChuDongSearch",
    type: "string",
    render: (row) => {
      return commonRender(row, "%MuaChuDong");
    },
  },
  {
    title: "Column 34",
    field: "Column 34Search",
    type: "string",
    render: (row) => {
      return commonRender(row, "Column 34");
    },
  },
];

const commonRender = (row, filed) => {
  return (
    <div
      style={{
        backgroundColor: row[filed]?.background,
        textAlign: "right",
        color: row[filed]?.color,
      }}
    >
      <span> {row[filed]?.value}</span>
    </div>
  );
};

const commonRenderWithoutStyle = (row, filed) => {
  return (
    <div
      style={{
        textAlign: "right",
      }}
    >
      <span> {row[filed]}</span>
    </div>
  );
};
