import { SET_NOTE_INFO } from './actionTypes';

export const setNoteInfo = (key, title, note, color) => ({
  type: SET_NOTE_INFO,
  payload: {
    key,
    title,
    note,
    color,
  },
});
