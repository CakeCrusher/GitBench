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
  // setBT([]);

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
            onPress={() =>
              BT.scanForPeripherals(device =>
                scanForPeripherals(device, peripherals, setPeripherals),
              )
            }
          />
          <Button
            title="stop scan"
            onPress={() => BT.stopScanningForPeripherals()}
          />
          <Button title="reset state" onPress={() => setPeripherals([])} />
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
