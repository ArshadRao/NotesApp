import {
  GET_NOTES_SUCCESS,
  ADD_NOTE,
  EDIT_NOTE,
  DELETE_NOTE,
  GET_NOTES,
  EDIT_NOTE_SUCCESS,
  DELETE_NOTE_SUCCESS,
  ADD_NOTE_SUCCESS,
  GET_NOTES_FAILURE,
  EDIT_NOTE_FAILURE,
  DELETE_NOTE_FAILURE,
  ADD_NOTE_FAILURE,
} from './actionTypes';
import { colors } from '../../theme';

export const INITIAL_STATE = {
  isLoading: false,
  errorMessage: '',
  noteList: [
    {
      id: 1,
      title: 'New Note',
      note: 'Added a new Note',
      color: colors.colorPickerArray[0],
    },
    {
      id: 2,
      title: 'Note 1',
      note: 'Lorem Epsim',
      color: colors.colorPickerArray[1],
    },
  ],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_NOTES:
    case ADD_NOTE:
    case EDIT_NOTE:
    case DELETE_NOTE: {
      return {
        ...state,
        isLoading: true,
        errorMessage: '',
      };
    }
    case GET_NOTES_FAILURE:
    case ADD_NOTE_FAILURE:
    case EDIT_NOTE_FAILURE:
    case DELETE_NOTE_FAILURE: {
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };
    }
    case GET_NOTES_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        errorMessage: '',
        listNotes: action.payload,
      };
    }
    case ADD_NOTE_SUCCESS: {
      console.log('notes added : ', action.payload);
      return {
        ...state,
        isLoading: false,
        errorMessage: '',
        listNotes: [...state.listNotes, action.payload],
      };
    }
    case EDIT_NOTE_SUCCESS: {
      console.log('notes edited : ', action.payload);
      const newList = state.listNotes.map(x =>
        x.id === action.payload.id ? { ...action.payload } : x,
      );
      return {
        ...state,
        isLoading: false,
        errorMessage: '',
        listNotes: newList,
      };
    }
    case DELETE_NOTE_SUCCESS: {
      console.log('notes deleted : ', action.payload);
      const newList = state.listNotes.filter(x => x.id !== action.payload.id);
      return {
        ...state,
        isLoading: false,
        errorMessage: '',
        listNotes: newList,
      };
    }
    default:
      return state;
  }
};
