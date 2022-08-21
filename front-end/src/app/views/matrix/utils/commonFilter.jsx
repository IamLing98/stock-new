import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

export default forwardRef((props, ref) => {
  const [filterText, setFilterText] = useState(null);

  // expose AG Grid Filter Lifecycle callbacks
  useImperativeHandle(ref, () => {
    return {
      doesFilterPass(params) {
        console.log("Params filter: ", params);
        const { api, colDef, column, columnApi, context } = props;
        const { node } = params;

        // make sure each word passes separately, ie search for firstname, lastname
        let passed = true;
        filterText
          .toLowerCase()
          .split(" ")
          .forEach((filterWord) => {
            const value = props.valueGetter({
              api,
              colDef,
              column,
              columnApi,
              context,
              data: node.data,
              getValue: (field) => node.data[field],
              node,
            });

            if (value.toString().toLowerCase().indexOf(filterWord) < 0) {
              passed = false;
            }
          });

        return passed;
      },

      isFilterActive() {
        return filterText != null && filterText !== "";
      },

      getModel() {
        if (!this.isFilterActive()) {
          return null;
        }

        return { value: filterText };
      },

      setModel(model) {
        setFilterText(model == null ? null : model.value);
      },
    };
  });

  const onChange = (event) => {
    setFilterText(event.target.value);
  };

  useEffect(() => {
    props.filterChangedCallback();
  }, [filterText]);

  return (
    <div style={{ padding: 4, width: 200 }}>
      <div>
        <input
          style={{ margin: "4 0 4 0" }}
          type="text"
          value={filterText}
          onChange={onChange}
          placeholder="Full name search..."
        />
      </div>
    </div>
  );
});
