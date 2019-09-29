import { take, takeLatest, call, put, select } from 'redux-saga/effects';
import { showToast, hideToast } from './actions';
import { ADD_TOAST } from './constants';

const DELAY = 5000;

export function* handleToast({ msg, status, id }) {
  console.log('msg, status, id', msg, status, id);
  yield put(showToast({ msg, status, id }));
  yield new Promise(res => {
    setTimeout(() => {
      res();
    }, DELAY);
  });
  yield put(hideToast({ id }));
}
// Individual exports for testing
export default function* toastsSaga() {
  yield takeLatest(ADD_TOAST, handleToast);
}
