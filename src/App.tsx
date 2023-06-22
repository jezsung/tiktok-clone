import { registerRootComponent } from 'expo';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import fetchFlashcard from './api/fetch-flashcard';
import fetchMcq from './api/fetch-mcq';
import fetchMcqAnswer from './api/fetch-mcq-answer';
import BottomNavigationBar from './components/BottomNavigationBar';
import CountdownTimer from './components/CountdownTimer';
import FlashcardList from './components/FlashcardList';
import MultipleChoiceQuestion from './components/MultipleChoiceQuestion';
import TabBar from './components/TabBar';
import usePagination from './hooks/use-pagination';
import FlashcardModel from './types/flashcard-model';
import McqAnswerModel from './types/mcq-answer-model';
import McqModel from './types/mcq-model';
import SearchIcon from '../assets/icons/search.svg';

export default function App() {
  const [tabIndex, setTabIndex] = useState(0);

  const fetcher = useCallback(async () => {
    // Fetches 3 flashcards for each call.
    return Promise.all(Array.from({ length: 3 }, () => fetchFlashcard()));
  }, []);
  const [state, fetchFlashcards, fetchMoreFlashcards] =
    usePagination<FlashcardModel[]>(fetcher);

  const [mcq, setMcq] = useState<McqModel | undefined>();
  const [mcqAnswer, setMcqAnswer] = useState<McqAnswerModel | undefined>();

  useEffect(() => {
    fetchFlashcards();

    (async () => {
      const fetchedMcq = await fetchMcq();
      const fetchedMcqAnswer = await fetchMcqAnswer(fetchedMcq.id);

      setMcq(fetchedMcq);
      setMcqAnswer(fetchedMcqAnswer);
    })();
  }, []);

  return (
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
      {tabIndex === 0 &&
        (state.pages.length > 0 ? (
          <FlashcardList
            flashcards={state.pages.flat()}
            onEndReached={fetchMoreFlashcards}
            onEndReachedThreshold={1}
          />
        ) : (
          <ActivityIndicator style={{ flex: 1 }} />
        ))}
      {tabIndex === 1 &&
        (mcq && mcqAnswer ? (
          <MultipleChoiceQuestion mcq={mcq} answer={mcqAnswer} />
        ) : (
          <ActivityIndicator style={{ flex: 1 }} />
        ))}
      <SafeAreaView edges={['bottom']} style={{ backgroundColor: 'black' }}>
        <BottomNavigationBar />
      </SafeAreaView>
    </LinearGradient>
  );
}

registerRootComponent(() => {
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
      <App />
    </SafeAreaProvider>
  );
});
