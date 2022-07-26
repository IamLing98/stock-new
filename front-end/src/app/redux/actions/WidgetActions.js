export const ADD_REMOVE_WIDGET = 'ADD_REMOVE_WIDGET';

export const handleWidget = data => dispatch => {
  dispatch({
    type: ADD_REMOVE_WIDGET,
    data: data
  });
};
