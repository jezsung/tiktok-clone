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
import Flashcard from './components/Flashcard';
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
        <StatusBar style="light" />
        <SafeAreaView edges={['top']} style={{ backgroundColor: 'black' }}>
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
        <View style={{ flex: 1 }}>
          <Flashcard
            id={7576}
            playlist="Period 5: 1844-1882"
            flashcardFront="The land dispute that contributed to the Mexican-American War was between"
            flashcardBack="In 1845, when Texas joined the US, Mexico insisted the US had a right only to the territory northeast of the Nueces River. The US argued that it should have title to all land between the Nueces and the Rio Grande as well."
            description="Topic 5.3: The Mexicanâ€“American War"
            tag="#apush"
            user={{
              name: 'AP US History',
              avatar:
                'https://cross-platform-rwa.rp.devfactory.com/avatars/apush.png',
            }}
          />
        </View>
        <SafeAreaView edges={['bottom']} style={{ backgroundColor: 'black' }}>
          <BottomNavigationBar />
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  );
}
