/*
 *
 * MainPage actions
 *
 */

import { DEFAULT_ACTION } from './constants';

export function defaultAction(text) {
  return {
    type: DEFAULT_ACTION,
    text,
  };
}
