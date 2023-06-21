/* eslint-disable import/order */
import { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

import fetchFlashcard from '../api/fetch-flashcard';
import usePagination from '../hooks/use-pagination';
import FlashcardModel from '../models/flashcard-model';
import Flashcard from './Flashcard';

const FlashcardList: React.FC = () => {
  const fetcher = useCallback(async () => {
    // Fetches 3 flashcards for each call.
    return Promise.all(Array.from({ length: 3 }, () => fetchFlashcard()));
  }, []);
  const [state, fetchNextPage] = usePagination<FlashcardModel[]>(fetcher);
  const [itemHeight, setItemHeight] = useState(512);

  if (state.pages.length === 0) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  if (state.status === 'error') {
    return (
      <View
        style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
      >
        <Text>Something went wrong...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={state.pages.flat()}
      renderItem={({ item }) => {
        return (
          <View style={{ height: itemHeight }}>
            <Flashcard flashcard={item} />
          </View>
        );
      }}
      // Suffixes the index to prevent duplicate keys for demo purpose.
      keyExtractor={(item, index) => item.id.toString() + index}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={1}
      refreshing={state.status === 'loading'}
      pagingEnabled
      onLayout={(event) => {
        setItemHeight(event.nativeEvent.layout.height);
      }}
    />
  );
};

export default FlashcardList;
