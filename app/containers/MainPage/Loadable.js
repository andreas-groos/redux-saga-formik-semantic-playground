/**
 *
 * Asynchronously loads the component for MainPage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
