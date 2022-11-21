import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { colors } from '../../theme';

const styles = StyleSheet.create({
  gridView: {
    flex: 1,
    flexGrow: 1,
  },
  thumbnail: {
    flex: 1,
  },
  itemPlaceholder: {
    borderRadius: 2,
    borderWidth: 1,
    borderColor: colors.darkPageBackground,
    height: 150,
    backgroundColor: colors.documentPlaceHolderBackgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnailDetail: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.documentListImageOverlay,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'stretch',
    margin: 1,
    padding: 1,
  },
  thumbnailFileName: {
    color: colors.lightText,
    paddingRight: 1,
    flex: 1,
  },
  deleteIconContainer: {
    alignSelf: 'flex-end',
  },
  downloadIconContainer: {
    alignSelf: 'center',
  },
  itemContainer: {
    borderRadius: 5,
    padding: 1,
    height: 150,
  },
  gridContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow: 1,
  },
});

const defaultItemWidth = 130;

export function PureDocumentGrid(props) {
  const { documents = [], deleteDocument, downloadDocument } = props;

  const [itemWidth, setItemWidth] = React.useState(defaultItemWidth);

  const onItemDeletePress = item => () => {
    deleteDocument(item);
  };

  const onItemDownloadPress = item => () => {
    const { fileName, urlLink, mimeType } = item;
    downloadDocument(fileName, urlLink, mimeType);
  };

  const renderDeleteIcon = (item, index) => (
    <View style={styles.deleteIconContainer}>
      <Icon
        type="feather"
        name="trash"
        color={colors.lightText}
        onPress={onItemDeletePress(item)}
      />
    </View>
  );

  const renderDownloadIcon = item => (
    <View style={styles.downloadIconContainer}>
      <Icon
        type="feather"
        name="download"
        color={colors.lightText}
        onPress={onItemDownloadPress(item)}
      />
    </View>
  );

  const renderFileName = (item, index) => (
    <View style={styles.thumbnailDetail}>
      <Text style={styles.thumbnailFileName}>{item.fileName}</Text>
      {deleteDocument && renderDeleteIcon(item, index)}
      {downloadDocument && renderDownloadIcon(item)}
    </View>
  );

  const renderImage = (item, index) => {
    if (item.path) {
      return (
        <View
          style={[styles.itemContainer, { width: itemWidth }]}
          key={item.fileName}>
          <Image style={styles.thumbnail} source={{ uri: item.path }} />
          {renderFileName(item, index)}
        </View>
      );
    }

    return <View style={styles.itemPlaceholder} key={item.fileName} />;
  };

  const onLocalLayout = e => {
    const { width } = e.nativeEvent.layout || {};
    if (width) {
      const itemsPerRow = Math.floor(width / defaultItemWidth);
      setItemWidth(width / itemsPerRow);
    }
  };

  return (
    <View style={styles.gridContainer} onLayout={onLocalLayout}>
      {documents.map(renderImage)}
    </View>
  );
}

export default PureDocumentGrid;
