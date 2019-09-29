import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { initialState as initialStateToasts } from '../Toasts/reducer';

/**
 * Direct selector to the mainPage state domain
 */

const selectMainPageDomain = state => state.mainPage || initialState;
const selectToastsDomain = state => state.toasts || initialStateToasts;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MainPage
 */

const makeSelectMainPage = () =>
  createSelector(
    selectMainPageDomain,
    substate => substate,
  );

const makeSelectToasts = () =>
  createSelector(
    selectToastsDomain,
    substate => substate,
  );
export default makeSelectMainPage;
export { selectMainPageDomain, makeSelectToasts };
