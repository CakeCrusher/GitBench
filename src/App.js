import React, {useEffect, useState} from 'react';
import {
  Button,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import BleManager from 'react-native-ble-manager';
import {stringToBytes} from 'convert-string';

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

const App = () => {
  const randomNumber = Math.floor(Math.random() * 9999);

  useEffect(() => {
    const startBt = () => {
      BleManager.start().then(() => {
        console.log('!start');
      });
    };
    startBt();
  }, []);

  const beginScan = async () => {
    const res = await BleManager.scan([], 5, true);
    console.log('!scan', res);
  };
  const peripheralId = '56:22:CC:22:FC:2A';
  const serviceUuid = 'fd5f';
  const characteristicReadUuid = '24154478-0e45-11ab-6441-e8be44459478';
  const characteristicWriteUuid = '31087422-318b-49b0-694b-acffa57edac9';

  const connect = () => {
    BleManager.connect(peripheralId)
      .then(() => {
        console.log('!res success');

        BleManager.retrieveServices(peripheralId).then(info => {
          console.log('!info', info);
        });
      })
      .catch(() => {
        console.log('!res error');
      });
  };

  const read = () => {
    BleManager.read(peripheralId, serviceUuid, characteristicReadUuid)
      .then(res => {
        console.log('!read', res);
      })
      .catch(err => {
        console.log('!read error', err);
      });
  };

  const write = payload => {
    const payloadBytes = stringToBytes(payload);
    BleManager.write(
      peripheralId,
      serviceUuid,
      characteristicWriteUuid,
      payloadBytes,
    )
      .then(res => {
        console.log('!write', res);
      })
      .catch(err => {
        console.log('!write error', err);
      });
  };

  return (
    <SafeAreaView style={Colors.darker}>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={Colors.darker}>
        <View
          style={{
            backgroundColor: Colors.black,
          }}>
          <Text style={styles.highlight}>{randomNumber}</Text>
          <Button title="scan" onPress={() => beginScan()} />
          <Button title="connect" onPress={() => connect()} />
          <Button title="read" onPress={() => read()} />
          <Button title="write" onPress={() => write('hello world')} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
