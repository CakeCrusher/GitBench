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
  const [count, setCount] = useState(0);
  // const [BT, setBT] = useState(null);
  let triggerButton = () => {
    console.log('!button pressed');
  };
  useEffect(() => {
    requestPermission().then(granted => {
      console.warn('!granted2', granted);
      if (granted) {
        const BT = new BleManager();
        // BT.onStateChange(state => {
        //   if (state === 'PoweredOn') {
        //     BT.startDeviceScan(null, null, (error, device) => {
        //       console.log('deviceUnique', device);
        //       if (error) {
        //         console.log('errorUnique', error);
        //       }
        //       BT.stopDeviceScan();
        //     });
        //   }
        // }, true);
        BT.connectedDevices().then(devices => {
          console.log('!devices', devices);
        });
        BT.stopScan();
        triggerButton = () => {
          console.log('!button pressed');
        };
      }
    });
  }, [count]);
  console.warn('!!!start!!!');

  const randomNumber = Math.floor(Math.random() * 9999);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Text style={styles.highlight}>{randomNumber}.js</Text> to
          <TouchableOpacity onPress={() => setCount(count + 1)}>
            <Text> COUNT {count}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={triggerButton}>
            <Text>BUTTON</Text>
          </TouchableOpacity>
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
