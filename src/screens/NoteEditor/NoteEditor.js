import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Button, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, editNote } from '../../screens/Notes/actionCreators';
import { ColorPicker } from '../../components';
import { colors, metrics } from '../../theme';
import { getNotes } from '../Notes/selectors';
import Document from './Document';
import { baseEndpoint } from '../../core/constants';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalBox: {
    backgroundColor: colors.white,
    borderRadius: 4,
    padding: 20,
    // paddingTop: 100,
    elevation: 6,
    width: '100%',
    height: '100%',
  },
  content: {
    flexGrow: 0,
    marginTop: 5,
    marginBottom: 20,
  },
  textInput: {
    height: 40,
    fontSize: metrics.bodyText,
    color: colors.darkText,
    borderColor: colors.gray,
    borderBottomWidth: 1,
  },
  textInputMultiline: {
    color: colors.darkText,
    fontSize: metrics.bodyText,
  },
  magnifyIcon: {
    height: 40,
    width: 40,
  },
});

export function NoteEditor(props) {
  const { isAdd } = props.route.params;

  const [noteInfo, setNoteInfo] = useState({});
  const [error, setError] = useState({ note: false, title: false });
  const [saveButtonDisable, setSaveButtonDisable] = useState(true);
  const [documents, setDocuments] = useState([]);

  const notes = useSelector(getNotes);
  const dispatch = useDispatch();

  useEffect(() => {
    const note = notes.find(val => val.id === props.route.params.id);
    let id;
    if (!note) {
      const ids = notes.map(val => val.id);
      id = Math.max(...ids, 1);
    }
    setNoteInfo(note || { id });
  }, [notes, props.route.params.id]);

  const handlePress = async () => {
    if (isAdd) {
      dispatch(addNote(noteInfo));
    } else {
      dispatch(editNote(noteInfo));
      await editNoteAPI(noteInfo);
    }
    props.navigation.navigate('Notes');
  };

  const editNoteAPI = async data => {
    try {
      const response = await fetch(`${baseEndpoint}note/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: data.title,
          note: data.note,
          color: data.color,
        }),
      });
      const json = await response.json();
      console.log('api response json: ', json);
    } catch (err) {
      console.log('fetch error :', err);
    }
  };

  const onCancelPress = () => {
    setSaveButtonDisable(true);
    setError({
      note: false,
      title: false,
    });
    setNoteInfo(props.noteInfo || {});
    props.navigation.navigate('Notes');
  };

  const getTitleStyling = () => {
    if (!error.title) {
      return styles.textInput;
    }

    return [styles.textInput, { borderColor: colors.error }];
  };

  const onTitleChangeTextHandler = value => {
    if (value.length === 0) {
      setSaveButtonDisable(true);
      setError(prevState => ({ ...prevState, title: true }));
    } else {
      setSaveButtonDisable(false);
      setError(prevState => ({ ...prevState, title: false }));
    }

    setNoteInfo(prevState => ({ ...prevState, title: value }));
  };

  const onNoteChangeText = value => {
    if (value.length === 0) {
      setSaveButtonDisable(true);
      setError(prevState => ({ ...prevState, note: true }));
    } else {
      setSaveButtonDisable(false);
      setError(prevState => ({ ...prevState, note: false }));
    }

    setNoteInfo(prevState => ({ ...prevState, note: value }));
  };

  const onColorChange = color => {
    setNoteInfo(prevState => ({ ...prevState, color }));
  };

  const renderContentSection = () => (
    <ScrollView style={styles.content}>
      <ColorPicker color={noteInfo.color} onColorChange={onColorChange} />
      <TextInput
        style={getTitleStyling()}
        placeholder="Title"
        value={noteInfo.title}
        onChangeText={onTitleChangeTextHandler}
      />
      <TextInput
        style={styles.textInputMultiline}
        placeholder="Note"
        defaultValue={noteInfo.note}
        onChangeText={onNoteChangeText}
        underlineColorAndroid="transparent"
        multiline
      />
    </ScrollView>
  );

  const renderButtonSection = () => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
      <Button title="Cancel" onPress={onCancelPress} />
      <Button disabled={saveButtonDisable} title="Save" onPress={handlePress} />
    </View>
  );

  const addDocuments = docList => {
    setDocuments(prevState => [...prevState, ...docList]);
  };

  const deleteDocument = document => {
    const docIndex = documents.findIndex(
      image => image.localIdentifier === document.localIdentifier,
    );
    const docs = [...documents];
    docs.splice(docIndex, 1);
    setDocuments(docs);
  };

  return (
    // <View style={styles.modalContainer}>
    <ScrollView>
      <View style={styles.modalBox}>
        {renderContentSection()}
        <Document
          documents={documents}
          addDocuments={addDocuments}
          deleteDocument={deleteDocument}
        />
        {renderButtonSection()}
      </View>
    </ScrollView>
    // </View>
  );
}
