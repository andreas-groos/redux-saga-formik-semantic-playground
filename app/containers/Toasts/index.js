/**
 *
 * Toasts
 *
 */

import React from 'react';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import reducer from './reducer';
import saga from './saga';

import makeSelectToasts from './selectors';

export function Toasts({ toasts }) {
  useInjectReducer({ key: 'toasts', reducer });
  useInjectSaga({ key: 'toasts', saga });
  if (toasts.one) {
    return <div id="toast">{toasts.one.msg}</div>;
  }
  return null;
}

const mapStateToProps = createStructuredSelector({
  toasts: makeSelectToasts(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(Toasts);
