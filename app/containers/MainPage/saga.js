import axios from 'axios';
import { take, takeLatest, call, put, select } from 'redux-saga/effects';
import { LOAD_API } from './constants';
import makeSelectMainPage from './selectors';
import { loadApiError, loadApiSuccess } from './actions';

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
    const result = yield call(
      request,
      'https://jsonplaceholder.typicode.com/todos',
    );
    yield put(loadApiSuccess(result.data));
  } catch (err) {
    yield put(loadApiError(err));
  }
}

// Individual exports for testing
export default function* mainPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOAD_API, getApi);
}
