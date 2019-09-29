/*
 *
 * Toasts reducer
 *
 */
import produce from 'immer';
import { SHOW_TOAST, HIDE_TOAST } from './constants';

export const initialState = {
  hi: 'there',
};

/* eslint-disable default-case, no-param-reassign */
const toastsReducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case SHOW_TOAST:
        draft[action.id] = { msg: action.msg, status: action.status };
        break;
      case HIDE_TOAST:
        draft[action.id] = null;
        break;
    }
  });
};

export default toastsReducer;
