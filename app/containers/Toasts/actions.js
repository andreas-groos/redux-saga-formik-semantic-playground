/*
 *
 * Toasts actions
 *
 */

import { SHOW_TOAST, HIDE_TOAST, ADD_TOAST } from './constants';

export function addToast({ msg, status, id }) {
  console.log('msg,status,id', msg, status, id);
  return {
    type: ADD_TOAST,
    msg,
    status,
    id,
  };
}
export function showToast({ msg, status, id }) {
  return {
    type: SHOW_TOAST,
    msg,
    status,
    id,
  };
}

export function hideToast({ id }) {
  return {
    type: HIDE_TOAST,
    id,
  };
}
