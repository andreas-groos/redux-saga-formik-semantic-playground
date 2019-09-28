/*
 *
 * MainPage reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  LOAD_API,
  LOAD_API_SUCCESS,
  LOAD_API_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  data: null,
};
/* eslint-disable default-case, no-param-reassign */
const mainPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        draft.text = action.text;
        break;
      case LOAD_API:
        draft.loading = true;
        draft.error = false;
        draft.data = null;
        break;
      case LOAD_API_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.data = action.data;
        break;
      case LOAD_API_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.data = null;
        break;
    }
  });

export default mainPageReducer;
