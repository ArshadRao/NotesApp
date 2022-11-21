import { SET_NOTE_INFO } from './actionTypes';

export const INITIAL_STATE = {
  noteInfo: {
    title: '',
    note: '',
    key: '',
    color: '',
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_NOTE_INFO:
      return { ...state, noteInfo: action.payload };
    default:
      return state;
  }
};
