import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { LicenseManager } from "ag-grid-enterprise";
import ChildMessageRenderer from "./ChildMessageRenderer";
import CommonFilter from "./utils/commonFilter";
import { Breadcrumb, SimpleCard } from "@gull";
import { Dropdown, Row, Col, Button } from "react-bootstrap";
import AG_GRID_LOCALE_ZZZ from "./locale.zzz";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./style.scss";

LicenseManager.setLicenseKey("<enterprisekey>");

export default function App(props) {
  const gridRef = useRef();

  const [state, setState] = useState({
    modal: false,
    columnDefs: props?.matrixIndex?.columnsDefault?.map((item) => {
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
    rowHeight: props.matrixIndex?.value === 3 ? 46 : 250,
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

  const localeText = useMemo(() => {
    return AG_GRID_LOCALE_ZZZ;
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div id="parent">
        <div className="d-flex flex-wrap">
          <Dropdown onSelect={(e, ev) => props.setMatrixIndex(props?.matrixIndexes[e])}>
            <Dropdown.Toggle variant={"success"} className="mr-3 mb-3">
              {props.matrixIndex?.label}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {props?.matrixIndexes?.map((item, index) => {
                return <Dropdown.Item eventKey={index}>{item?.label}</Dropdown.Item>;
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
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
