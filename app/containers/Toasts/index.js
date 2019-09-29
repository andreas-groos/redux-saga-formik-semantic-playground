/**
 *
 * Toasts
 *
 */

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';

export function Toasts() {
  useInjectReducer({ key: 'toasts', reducer });
  useInjectSaga({ key: 'toasts', saga });
  return null;
}

export default Toasts;
