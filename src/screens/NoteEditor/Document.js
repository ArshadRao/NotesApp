import React from 'react';
import ImageCropPicker from 'react-native-image-crop-picker';
import { View, Platform, StyleSheet, Linking } from 'react-native';
import { normalize } from 'react-native-elements';
import moment from 'moment';
import AddDocumentTile from './AddDocumentTile';
import { colors } from '../../theme';
import DocumentGrid from './DocumentGrid';
import {
  PERMISSIONS_CAMERA,
  PERMISSIONS_LIBRARY,
  requestPermissions,
} from './utils';

const styles = StyleSheet.create({
  cardSectionTitle: {
    fontSize: normalize(12),
    // ...fontStyle('bold'),
    color: colors.darkText,
  },
  cardSectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    marginTop: 20,
    paddingLeft: 5,
  },
  container: {
    flex: 1,
    flexGrow: 1,
  },
  collapseContainer: {
    flex: 1,
  },
});

const localIdentifierAttr = Platform.select({
  ios: 'localIdentifier',
  android: 'path',
});

const MAX_DOCUMENT_PER_SELECTION = 10;
const DOCUMENT_FILENAME_TIMESTAMP = 'YYYY.MM.DD_HH.mm.ss';

export function PurePartsDocuments(props) {
  const { documents, addDocuments, deleteDocument } = props;

  const showAddDocumentError = () => {
    const popupConfig = {
      message: 'Document Permission Error',
      buttons: [
        {
          title: 'OK',
        },
        {
          title: 'Open Settings',
          onPress: Linking.openSettings,
        },
      ],
    };
    props.showPopup(popupConfig);
  };

  const onImageSelect = (response, camera, index = 0) => {
    const fileType = 'jpg';
    const prefix = `DOC_${moment().format(DOCUMENT_FILENAME_TIMESTAMP)}`;
    const suffix = index ? `_${index}` : '';
    const fileName = `${prefix}${suffix}.${fileType}`;
    return {
      fileName,
      path: response.path,
      type: fileType,
      localIdentifier: response[localIdentifierAttr],
      camera,
    };
  };

  const onLaunchCameraResponse = response => {
    if (response.path) {
      const document = onImageSelect(response, true);
      addDocuments([document]);
    }
  };

  const onLaunchLibraryResponse = responses => {
    let index = 0;
    const documentList = [];
    responses.forEach(selectedImage => {
      if (selectedImage.path) {
        if (
          !documents.find(
            image =>
              image.localIdentifier === selectedImage[localIdentifierAttr],
          )
        ) {
          const document = onImageSelect(selectedImage, false, index);
          documentList.push(document);
          index += 1;
        }
      }
    });
    if (documentList.length) {
      addDocuments(documentList);
    }
  };

  const launchCamera = () => async () => {
    const granted = await requestPermissions(PERMISSIONS_CAMERA);
    if (granted) {
      const options = {
        mediaType: 'photo',
      };
      const response = await ImageCropPicker.openCamera(options);
      onLaunchCameraResponse(response);
    } else {
      showAddDocumentError();
    }
  };

  const launchLibrary = () => async () => {
    const granted = await requestPermissions(PERMISSIONS_LIBRARY);
    if (granted) {
      const options = {
        multiple: true,
        mediaType: 'photo',
        maxFiles: MAX_DOCUMENT_PER_SELECTION,
      };
      const responses = await ImageCropPicker.openPicker(options);
      onLaunchLibraryResponse(responses);
    } else {
      showAddDocumentError();
    }
  };

  return (
    <View style={styles.container}>
      <AddDocumentTile
        testId="prf"
        showPopup
        launchCamera={launchCamera()}
        launchLibrary={launchLibrary()}
      />
      <DocumentGrid documents={documents} deleteDocument={deleteDocument} />
    </View>
  );
}

export default PurePartsDocuments;
