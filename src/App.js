/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {BleManager} from 'react-native-ble-plx';
import {
  Button,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import initiateBt from './initiateBt';
import {scanForPeripherals} from './utils';

const App = () => {
  const randomNumber = Math.floor(Math.random() * 9999);
  const [BT, setBT] = useState(null);
  const [peripherals, setPeripherals] = useState([]);
  useEffect(() => {
    (async () => {
      console.log('!start bt');
      const newBT = await initiateBt();
      setBT(newBT);
    })();
  }, []);

  let a = [];

  const handleReset = () => {
    setPeripherals([]);
    a = [];
  };

  const addDevice = device => {
    console.log('!addDevice', device);
    if (!a.find(d => d.id === device.id)) {
      a.push(device);
    }
    console.log(
      '!aa',
      a.map(d => {
        return {id: d.id, manufacturerData: d.manufacturerData};
      }),
    );
  };

  let connectableDevicer = [];

  const connectableDevices = async id => {
    connectableDevicer = [];
    await a.forEach(async x => {
      await BT.connectToPeripheral(x.id);
      if (x.id) {
        connectableDevicer.push(x.id);
      }
      console.log('!device', BT.device);
      if (a[a.length - 1].id === x.id) {
        console.log('!done connecting', connectableDevicer);
      }
    });
  };

  // [ '7B:06:92:23:EC:86', '50:32:37:C1:A6:1D', '61:41:1E:45:5B:1A' ]

  const connectToDevice = async id => {
    await BT.connectToPeripheral(id);
    console.log('!device', BT.device);
  };

  const getServicesAndCharacteristics = async () => {
    console.log('!isDev', BT.device);
    await BT.device.discoverAllServicesAndCharacteristics();
    console.log('!s&c', BT.device);
  };

  let getDiff = (a, b) => {
    const aDiff = a.filter(x => !b.find(y => y.id === x.id));
    const bDiff = b.filter(x => !a.find(y => y.id === x.id));
    return {aDiff, bDiff};
  };

  return (
    <SafeAreaView style={Colors.darker}>
      <StatusBar barStyle={'light-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={Colors.darker}>
        <Header />
        <View
          style={{
            backgroundColor: Colors.black,
          }}>
          <Text style={styles.highlight}>{randomNumber}</Text>
          <Text style={styles.highlight}>{peripherals.length}</Text>
          <Button
            title="start scan"
            onPress={() => BT.scanForPeripherals(device => addDevice(device))}
          />
          <Button
            title="stop scan"
            onPress={() => BT.stopScanningForPeripherals()}
          />
          <Button
            title="connect to device"
            onPress={() => connectToDevice('7B:06:92:23:EC:86')}
          />
          <Button
            title="get services and characteristics"
            onPress={getServicesAndCharacteristics}
          />
          <Button title="reset state" onPress={handleReset} />
        </View>
        <View>
          {peripherals.map(item => (
            <Text style={styles.item}>
              {item.id +
                '    ' +
                item.manufacturerData +
                '    ' +
                item.localName}
            </Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingBottom: 10,
  },
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
