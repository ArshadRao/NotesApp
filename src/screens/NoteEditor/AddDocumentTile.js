import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Icon, normalize } from 'react-native-elements';
import { colors } from '../../theme';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addDocumentContainer: {
    paddingVertical: 4,
    paddingLeft: 8,
    paddingRight: 13,
    marginHorizontal: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.primary1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addDocumentText: {
    fontSize: normalize(10),
    color: colors.primary1,
    // ...fontStyle('bold'),
  },
  addDocumentIcon: {
    marginRight: 8,
  },
  limitReachedText: {
    fontSize: normalize(10),
    color: colors.mutedText,
  },
});

// type Props = {
//   t: Function,
//   launchCamera: Function,
//   launchLibrary: Function,
// };

function PureAddDocumentTile(props) {
  const { launchCamera, launchLibrary } = props;

  const content = (
    <React.Fragment>
      <TouchableOpacity
        style={styles.addDocumentContainer}
        onPress={launchCamera}>
        <Icon
          name="add"
          color={colors.primary1}
          size={24}
          containerStyle={styles.addDocumentIcon}
        />
        <Text style={styles.addDocumentText}>{'Take Photo'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addDocumentContainer}
        onPress={launchLibrary}>
        <Icon
          name="add"
          color={colors.primary1}
          size={24}
          containerStyle={styles.addDocumentIcon}
        />
        <Text style={styles.addDocumentText}>{'Photo Library'}</Text>
      </TouchableOpacity>
    </React.Fragment>
  );

  return <View style={styles.container}>{content}</View>;
}

export default PureAddDocumentTile;
