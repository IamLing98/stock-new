import React, { useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { LicenseManager } from "ag-grid-enterprise";
import ChildMessageRenderer from "./ChildMessageRenderer";
import { Button, Dropdown, Row, Col, Container } from "react-bootstrap";
import CustomPinnedRowRenderer from "./utils/customPinnedRowRenderer";
import AG_GRID_LOCALE_ZZZ from "./locale.zzz";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./style.scss";
import Matrix2ChartRight from "./utils/Matrix2ChartRight";
import Matrix2ChartLeft from "./utils/Matrix2ChartLeft";

LicenseManager.setLicenseKey("<enterprisekey>");

export default function App(props) {
  const gridRef = useRef();
  const gridRef2 = useRef();

  const [state, setState] = useState({
    modal: false,
    columnDefs: props?.matrixIndex?.columnsDefault1?.map((item) => {
      let rs = {
        headerName: item?.title,
        field: item?.field,
        minWidth: 220,
        wrapText: true,
        autoHeight: true,
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
        cellRendererSelector: (params) => {
          if (params.data.pined) {
            return {
              component: CustomPinnedRowRenderer,
              params: {
                style: {},
              },
            };
          } else {
            // rows that are not pinned don't use any cell renderer
            return undefined;
          }
        },
      };
      if (item?.render) {
        rs.render = item?.render;
        rs.cellRenderer = "childMessageRenderer";
      }
      return rs;
    }),

    defaultColDef: {
      enableValue: true,
      sortable: true,
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

  const [state2, setState2] = useState({
    modal: false,
    columnDefs: props?.matrixIndex?.columnsDefault2?.map((item) => {
      let rs = {
        headerName: item?.title,
        field: item?.field,
        minWidth: 100,
        wrapText: true,
        autoHeight: true,
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
      };
      if (item?.render) {
        rs.render = item?.render;
        rs.cellRenderer = "childMessageRenderer";
      }
      return rs;
    }),

    defaultColDef: {
      enableValue: true,
      sortable: true,
      filter: "agTextColumnFilter",
      resizable: true,
    },
    detailCellRendererParams: {
      detailGridOptions: {
        columnDefs: [],
        defaultColDef: {
          enableValue: true,
          sortable: true,
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
    // rowHeight: props.matrixIndex?.value === 3 ? 46 : 250,
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
    setState({ ...state, rowData: props.matrix2Data?.table1Data?.filter((item) => !item?.pined) });
    setState2({ ...state2, rowData: props.matrix2Data?.table2Data });
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

  const localeText = useMemo(() => {
    return AG_GRID_LOCALE_ZZZ;
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div id="parent">
        <div className="d-flex flex-wrap">
          <label className="checkbox checkbox-primary">
            <input type="checkbox" />
            <span>Cập nhật realtime</span>
            <span className="checkmark"></span>
          </label>
        </div>
        <div id="child">
          <input
            type="text"
            onInput={onQuickFilterChanged}
            id="quickFilter"
            style={{ right: "0", width: "250px", height: "32px", borderRadius: "4px" }}
            placeholder="Tìm kiếm..."
          />
          <Button variant="primary" className="btn-icon   text-capitalize ml-3 mb-3">
            <span className="ul-btn__icon">
              <i className="i-Gear-2"></i>
            </span>
            <span className="ul-btn__text">Lưu tìm kiếm</span>
          </Button>
          <Button variant="primary" className="btn-icon ml-3 mb-3 text-capitalize">
            <span className="ul-btn__icon">
              <i className="i-Gear-2"></i>
            </span>
            <span className="ul-btn__text">Mặc định</span>
          </Button>
        </div>
      </div>
      <Row>
        <Col md={6}>
          <Matrix2ChartLeft data={props.matrix2Data?.chartLeftData} />
        </Col>
        <Col md={6}>
          <div className="matrix2-chart-right">
            <Matrix2ChartRight dataChart={props.matrix2Data?.table1Data} />
          </div>
        </Col>
      </Row>
      <div className="data-table flex ">
        <div id="myGrid" className="ag-theme-alpine" style={{ height: "80vh", width: "100%" }}>
          <AgGridReact
            ref={gridRef}
            rowSelection="multiple"
            columnDefs={state.columnDefs}
            defaultColDef={state.defaultColDef}
            sideBar={state.sideBar}
            groupSelectsChildren={true}
            pagination={false}
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
            suppressMenuHide={true}
            frameworkComponents={state.frameworkComponents}
            context={state.context}
            rowHeight={state.rowHeight}
            localeText={localeText}
            pinnedBottomRowData={props?.matrix2Data?.table1Data?.filter((item) => item?.pined)}
          />
        </div>
      </div>
      <div className="data-table flex " style={{ marginTop: "42px" }}>
        <div id="myGrid" className="ag-theme-alpine" style={{ height: "80vh", width: "100%" }}>
          <AgGridReact
            ref={gridRef2}
            rowSelection="multiple"
            columnDefs={state2.columnDefs}
            defaultColDef={state2.defaultColDef}
            sideBar={state2.sideBar}
            groupSelectsChildren={true}
            pagination={true}
            paginationPageSize={state2.paginationPageSize}
            paginateChildRows={true}
            autoGroupColumnDef={state2.autoGroupColumnDef}
            rowData={state2.rowData}
            excelStyles={state2.excelStyles}
            masterDetail={true}
            onFirstDataRendered={onFirstDataRendered}
            detailCellRendererParams={state2.detailCellRendererParams}
            floatingFilter={true}
            cacheQuickFilter={true}
            //   isExternalFilterPresent={isExternalFilterPresent}
            //   doesExternalFilterPass={doesExternalFilterPass}
            suppressMenuHide={true}
            frameworkComponents={state2.frameworkComponents}
            context={state2.context}
            rowHeight={state2.rowHeight}
            localeText={localeText}
          />
        </div>
      </div>
    </div>
  );
}
