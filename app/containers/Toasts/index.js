/**
 *
 * Toasts
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectToasts from './selectors';
import reducer from './reducer';
import saga from './saga';

import { addToast } from './actions';

export function Toasts(props) {
  useInjectReducer({ key: 'toasts', reducer });
  useInjectSaga({ key: 'toasts', saga });
  return (
    <div id="toasts">
      <h1>Toasts</h1>
      <button
        type="button"
        onClick={() => {
          props.addToast('a', 'error', 5);
        }}
      >
        Toast
      </button>
    </div>
  );
}

Toasts.propTypes = {
  addToast: PropTypes.func,
  // toasts: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  toasts: makeSelectToasts(),
});

function mapDispatchToProps(dispatch) {
  return {
    addToast: () => dispatch(addToast({ msg: 'hi', status: 'there', id: 'a' })),
    // showToast: () => dispatch(showToast()),
    // hideToast: ({ id }) => dispatch(hideToast({ id })),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Toasts);
