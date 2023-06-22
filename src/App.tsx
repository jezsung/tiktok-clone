/* eslint-disable import/order */
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { registerRootComponent } from 'expo';
import SearchIcon from '../assets/icons/search.svg';
import BottomNavigationBar from './components/BottomNavigationBar';
import CountdownTimer from './components/CountdownTimer';
import FlashcardList from './components/FlashcardList';
import MultipleChoiceQuestion from './components/MultipleChoiceQuestion';
import TabBar from './components/TabBar';
import MultipleChoiceQuestionAnswerModel from './types/muliple-choice-question-answer';
import MultipleChoiceQuestionModel from './types/multiple-choice-question-model';
import UserModel from './types/user-model';

export default function App() {
  const [tabIndex, setTabIndex] = useState(0);

  const [fontsLoaded] = useFonts({
    'sf-pro-rounded-100': require('../assets/fonts/SF-Pro-Rounded-Ultralight.otf'),
    'sf-pro-rounded-200': require('../assets/fonts/SF-Pro-Rounded-Thin.otf'),
    'sf-pro-rounded-300': require('../assets/fonts/SF-Pro-Rounded-Light.otf'),
    'sf-pro-rounded-400': require('../assets/fonts/SF-Pro-Rounded-Regular.otf'),
    'sf-pro-rounded-500': require('../assets/fonts/SF-Pro-Rounded-Medium.otf'),
    'sf-pro-rounded-600': require('../assets/fonts/SF-Pro-Rounded-Semibold.otf'),
    'sf-pro-rounded-700': require('../assets/fonts/SF-Pro-Rounded-Bold.otf'),
    'sf-pro-rounded-800': require('../assets/fonts/SF-Pro-Rounded-Heavy.otf'),
    'sf-pro-rounded-900': require('../assets/fonts/SF-Pro-Rounded-Black.otf'),
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
        {tabIndex === 0 && <FlashcardList />}
        {tabIndex === 1 && (
          <MultipleChoiceQuestion
            mcq={
              new MultipleChoiceQuestionModel(
                6194,
                'Period 6: 1865-1898',
                '5.5 Sectional Conflict: Regional Differences #apush',
                'https://cross-platform-rwa.rp.devfactory.com/images/6194%20-%20black%20people%20after%20slavery.png',
                'What did it mean when defenders of slavery called it a "positive social good"?',
                [
                  {
                    id: 'A',
                    answer:
                      'Slavery gave black people a better life than if they lived in a free society',
                  },
                  {
                    id: 'B',
                    answer:
                      'Slavery created a power structure that defined morality for everyone',
                  },
                  {
                    id: 'C',
                    answer: 'Slavery was essential for the economy to prosper',
                  },
                ],
                new UserModel(
                  'AP US History',
                  'https://cross-platform-rwa.rp.devfactory.com/avatars/apush.png'
                )
              )
            }
            answer={
              new MultipleChoiceQuestionAnswerModel(6194, [
                {
                  id: 'A',
                  answer:
                    'Slavery gave black people a better life than if they lived in a free society"',
                },
              ])
            }
          />
        )}
        <SafeAreaView edges={['bottom']} style={{ backgroundColor: 'black' }}>
          <BottomNavigationBar />
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  );
}

registerRootComponent(App);
