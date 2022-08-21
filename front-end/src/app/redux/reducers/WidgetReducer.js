import {
  ADD_REMOVE_WIDGET,
} from "../actions/WidgetActions";

const initialState = {
  handleState: false,
  widgetIndex: 0
};

const WidgetReducer = function(state = initialState, action) {
  switch (action.type) {
    case ADD_REMOVE_WIDGET: {
      return {
        ...state,
        handleState: action.data.handleState,
        widgetIndex: action.data.widgetIndex + 12
      };
    }
    default: {
      return state;
    }
  }
};

export default WidgetReducer;
