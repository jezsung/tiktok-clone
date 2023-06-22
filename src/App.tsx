import { registerRootComponent } from 'expo';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, View, Image } from 'react-native';
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
  // Can get the user preference theme from the system like below.
  // Theme changing is not implemented due to the lack of design specification.

  // const colorScheme = useColorScheme();
  // if (colorScheme === 'light') {
  // } else if (colorScheme === 'dark') {
  // }

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
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
      }}
    >
      <LinearGradient
        colors={['#001D28', '#00425A']}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
      />
      <Image
        source={{ uri: mcq?.image }}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          opacity: tabIndex !== 1 || !mcq ? 0 : 1,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: '#00000073',
          opacity: tabIndex !== 1 || !mcq ? 0 : 1,
        }}
      />

      <StatusBar style="light" />
      <SafeAreaView
        edges={['top']}
        style={{ backgroundColor: tabIndex === 1 ? 'transparent' : 'black' }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: tabIndex === 1 ? 'transparent' : 'black',
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
    </View>
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
