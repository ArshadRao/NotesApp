import {
  GET_NOTES,
  GET_NOTES_SUCCESS,
  GET_NOTES_FAILURE,
  ADD_NOTE,
  EDIT_NOTE,
  DELETE_NOTE,
  ADD_NOTE_SUCCESS,
  ADD_NOTE_FAILURE,
  EDIT_NOTE_SUCCESS,
  EDIT_NOTE_FAILURE,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_FAILURE,
} from './actionTypes';

export const getNotes = () => ({ type: GET_NOTES });

export const getNotesSuccess = payload => ({
  type: GET_NOTES_SUCCESS,
  payload,
});

export const getNotesFailure = errorMessage => ({
  type: GET_NOTES_FAILURE,
  payload: errorMessage,
});

export const addNote = payload => ({
  type: ADD_NOTE,
  payload,
});

export const addNoteSuccess = payload => ({
  type: ADD_NOTE_SUCCESS,
  payload,
});

export const addNoteFailure = payload => ({
  type: ADD_NOTE_FAILURE,
  payload,
});

export const editNote = payload => ({
  type: EDIT_NOTE,
  payload,
});

export const editNotesSuccess = payload => ({
  type: EDIT_NOTE_SUCCESS,
  payload,
});

export const editNoteFailure = payload => ({
  type: EDIT_NOTE_FAILURE,
  payload,
});

export const deleteNote = payload => ({
  type: DELETE_NOTE,
  payload,
});

export const deleteNoteSuccess = payload => ({
  type: DELETE_NOTE_SUCCESS,
  payload,
});

export const deleteNoteFailure = payload => ({
  type: DELETE_NOTE_FAILURE,
  payload,
});
