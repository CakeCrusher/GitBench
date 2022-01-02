import {PermissionsAndroid} from 'react-native';
import BluetoothLeManager from './bt';

const requestPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission for blutooth scanning',
        message: 'message',
        buttonPositive: 'OK',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
      },
    );
    console.warn('!granted', granted);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
      return true;
    } else {
      console.log('Location permission denied');
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

const initiateBt = async () => {
  const granted = await requestPermission();
  if (granted) {
    const BT = new BluetoothLeManager();
    return BT;
  } else {
    return null;
  }
};

export default initiateBt;
