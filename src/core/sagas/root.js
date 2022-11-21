import { all, fork } from 'redux-saga/effects';
import notesSaga from '../../screens/Notes/sagas';

export default function* rootSaga() {
  yield all([fork(notesSaga)]);
}
