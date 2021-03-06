import axios from 'axios';
import { take, takeLatest, call, put, select, race } from 'redux-saga/effects';
import { LOAD_API, LOAD_API_CONFIRM } from './constants';
import makeSelectMainPage from './selectors';
import {
  loadApiError,
  loadApiSuccess,
  loadApiConfirmDialog,
  loadApiAbort,
  loadApiConfirm,
} from './actions';

const request = url => {
  return axios.get(url);
};

export function* getApi() {
  const mainPageReduxState = yield select(makeSelectMainPage());
  console.log(
    'just for demonstration how to get redux state',
    mainPageReduxState,
  );
  try {
    yield put(loadApiConfirmDialog());
    // works but I don't quite understand it.
    const confirmation = yield race({
      confirm: take(loadApiConfirm),
      abort: take(loadApiAbort),
    });
    console.log('confirmation', confirmation);
    if (confirmation.confirm.type !== LOAD_API_CONFIRM) {
      throw new Error('Fetching aborted by user');
    }
    const result = yield call(
      request,
      'https://jsonplaceholder.typicode.com/todos',
    );
    yield put(loadApiSuccess(result.data));
  } catch (err) {
    yield put(loadApiError(err.message));
  }
}

// Individual exports for testing
export default function* mainPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOAD_API, getApi);
}
