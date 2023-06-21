import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import SearchIcon from './assets/icons/search.svg';
import BottomNavigationBar from './components/BottomNavigationBar';
import CountdownTimer from './components/CountdownTimer';
import TabBar from './components/TabBar';

export default function App() {
  const [tabIndex, setTabIndex] = useState(0);

  const [fontsLoaded] = useFonts({
    'sf-pro-rounded-100': require('./assets/fonts/SF-Pro-Rounded-Ultralight.otf'),
    'sf-pro-rounded-200': require('./assets/fonts/SF-Pro-Rounded-Thin.otf'),
    'sf-pro-rounded-300': require('./assets/fonts/SF-Pro-Rounded-Light.otf'),
    'sf-pro-rounded-400': require('./assets/fonts/SF-Pro-Rounded-Regular.otf'),
    'sf-pro-rounded-500': require('./assets/fonts/SF-Pro-Rounded-Medium.otf'),
    'sf-pro-rounded-600': require('./assets/fonts/SF-Pro-Rounded-Semibold.otf'),
    'sf-pro-rounded-700': require('./assets/fonts/SF-Pro-Rounded-Bold.otf'),
    'sf-pro-rounded-800': require('./assets/fonts/SF-Pro-Rounded-Heavy.otf'),
    'sf-pro-rounded-900': require('./assets/fonts/SF-Pro-Rounded-Black.otf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <LinearGradient
        colors={['#001D28', '#00425A']}
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'stretch',
        }}
      >
        <StatusBar style="auto" />
        <SafeAreaView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'black',
              padding: 16,
            }}
          >
            <View style={{ position: 'absolute', left: 16 }}>
              <CountdownTimer />
            </View>
            <TabBar
              currentIndex={tabIndex}
              tabs={['Following', 'For You']}
              onTap={(index) => setTabIndex(index)}
            />
            <SearchIcon
              fill="white"
              style={{ position: 'absolute', right: 16 }}
            />
          </View>
        </SafeAreaView>
        <View style={{ flex: 1 }}></View>
        <SafeAreaView edges={['bottom']} style={{ backgroundColor: 'black' }}>
          <BottomNavigationBar />
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  );
}
