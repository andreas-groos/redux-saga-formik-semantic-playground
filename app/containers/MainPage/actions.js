/*
 *
 * MainPage actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_API,
  LOAD_API_SUCCESS,
  LOAD_API_ERROR,
} from './constants';

export function defaultAction(text) {
  return {
    type: DEFAULT_ACTION,
    text,
  };
}

/**
 * Starts fetching
 *
 * @returns {object} action object
 */
export function loadApi() {
  return {
    type: LOAD_API,
  };
}

export function loadApiSuccess(data) {
  return {
    type: LOAD_API_SUCCESS,
    data,
  };
}

export function loadApiError(error) {
  return {
    type: LOAD_API_ERROR,
    error,
  };
}
