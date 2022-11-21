import { combineReducers } from 'redux';
import notes from '../../screens/Notes/reducers';
import noteEditor from '../../screens/NoteEditor/reducers';

const reducers = combineReducers({
  notes,
  noteEditor,
});

export default reducers;
