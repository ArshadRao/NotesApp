import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_NOTES, ADD_NOTE, EDIT_NOTE, DELETE_NOTE } from './actionTypes';
import { baseEndpoint } from '../constants';
import {
  deleteNoteSuccess,
  getNotesFailure,
  getNotesSuccess,
} from './actionCreators';

export default function* noteSaga() {
  yield takeEvery(GET_NOTES, getNotes);
  yield takeEvery(ADD_NOTE, addNote);
  yield takeEvery(EDIT_NOTE, editNote);
  yield takeEvery(DELETE_NOTE, deleteNote);
}

export function* getNotes() {
  try {
    const response = yield call(fetch, `${baseEndpoint}note`, {
      method: 'GET',
    });
    const data = yield call([response, 'json']);
    yield put(getNotesSuccess(data));
  } catch (err) {
    yield put(getNotesFailure(`Error : ${err}`));
  }
}

export function* addNote(action) {
  const data = action.payload;

  const params = {
    id: data.id,
    title: data.title,
    note: data.note,
    color: data.color,
  };

  try {
    const response = yield call(fetch, `${baseEndpoint}note`, {
      method: 'POST',
      body: JSON.stringify(params),
    });
    const responseJSON = yield call([response, 'json']);
    console.log('api response json: ', responseJSON);
  } catch (err) {
    console.log('fetch error :', err);
  }
}

export function* editNote(action) {
  const data = action.payload;

  const params = {
    title: data.title,
    note: data.note,
    color: data.color,
  };

  try {
    const response = yield call(fetch, `${baseEndpoint}note/${data.id}`, {
      method: 'PUT',
      body: JSON.stringify(params),
    });
    const responseJSON = yield call([response, 'json']);
    console.log('api response json: ', responseJSON);
  } catch (err) {
    console.log('fetch error :', err);
  }
}

export function* deleteNote(action) {
  const data = action.payload;

  try {
    const response = yield call(fetch, `${baseEndpoint}note/${data.id}`, {
      method: 'DELETE',
    });
    const responseJSON = yield call([response, 'json']);
    console.log('api response json: ', responseJSON);
    yield put(deleteNoteSuccess(data));
  } catch (err) {
    console.log('fetch error :', err);
  }
}
