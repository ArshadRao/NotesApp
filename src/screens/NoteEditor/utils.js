import { Platform } from 'react-native';
import {
  PERMISSIONS,
  RESULTS,
  check as checkPermission,
  request as requestPermission,
} from 'react-native-permissions';

export const PERMISSIONS_CAMERA = Platform.select({
  android: [
    PERMISSIONS.ANDROID.CAMERA,
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  ],
  ios: [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY],
});

export const PERMISSIONS_LIBRARY = Platform.select({
  android: [
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  ],
  ios: [PERMISSIONS.IOS.PHOTO_LIBRARY],
});

const requestSinglePermission = async permission => {
  const response = await requestPermission(permission);
  return response === RESULTS.GRANTED;
};

const checkMultiplePermissions = permissions =>
  Promise.all(permissions.map(permission => checkPermission(permission)));

export const requestPermissions = async permissions => {
  const statuses = await checkMultiplePermissions(permissions);
  for (let i = 0; i < permissions.length; i += 1) {
    const status = statuses[i];
    const permission = permissions[i];
    switch (status) {
      case RESULTS.GRANTED:
        break;
      case RESULTS.BLOCKED:
        return false;
      case RESULTS.DENIED: {
        const response = await requestSinglePermission(permission); // eslint-disable-line no-await-in-loop
        if (!response) {
          return false;
        }
        break;
      }
      default:
        return false;
    }
  }
  return true;
};
