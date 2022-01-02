import {BleError, BleManager, Device} from 'react-native-ble-plx';

class BluetoothLeManager {
  bleManager = null;
  device = null;

  constructor() {
    this.bleManager = new BleManager();
    this.device = null;
  }
  scanForPeripherals = onDeviceFound => {
    this.bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
      } else {
        onDeviceFound(device);
      }
      return;
    });
    return () => {
      this.bleManager.stopDeviceScan();
    };
  };
  stopScanningForPeripherals = () => {
    this.bleManager.stopDeviceScan();
  };
}

// const BT = new BluetoothLeManager();

export default BluetoothLeManager;
