import React from 'react';
import { View, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { getNotes, deleteNote, getNotesSuccess } from './actionCreators';
import NoteCard from './NoteCard';
import { colors, metrics, iconNames, iconTypes } from '../../theme';
import { baseEndpoint } from '../../core/constants';

export class Notes extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <Icon
          name={iconNames.add}
          type={iconTypes.MaterialIcons}
          size={metrics.iconSize}
          color={colors.iconColor}
          onPress={this.onAddPress}
        />
      ),
    });

    this.fetchData();
  }

  async fetchData() {
    try {
      const response = await fetch(`${baseEndpoint}note`, { method: 'GET' });
      const json = await response.json();
      this.props.getNotesSuccess(json);
      // this.setState({
      //   notes: json,
      // });
    } catch (error) {
      console.log('fetch error :', error);
    }
  }

  // componentWillUnmount() {
  //   // this.unsubscribe();
  // }

  state = {
    notes: [],
  };

  onAddPress = () => {
    this.props.navigation.navigate('NoteEditor', { isAdd: true });
  };

  onEditPress = id => () => {
    this.props.navigation.navigate('NoteEditor', {
      isAdd: false,
      id,
    });
  };

  onDeletePress = id => () => {
    this.props.deleteNote({ id });
  };

  keyExtractor = (item, index) => item.id || index;

  renderItem = data => (
    <NoteCard
      data={data.item}
      onEditPress={this.onEditPress(
        data.item.id,
        data.item.title,
        data.item.note,
        data.item.color,
      )}
      onDeletePress={this.onDeletePress(data.item.id)}
    />
  );

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
        <FlatList
          data={this.props.listNotes}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
      </View>
    );
  }
}

const mapDispatchToProps = { getNotes, getNotesSuccess, deleteNote };

export const mapStateToProps = state => ({
  listNotes: state.notes.listNotes,
});

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
