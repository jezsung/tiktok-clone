import { useState } from 'react';
import { FlatList, View } from 'react-native';

import Flashcard from './Flashcard';
import FlashcardModel from '../types/flashcard-model';

const FlashcardList: React.FC<{
  flashcards: FlashcardModel[];
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
}> = ({ flashcards, onEndReached, onEndReachedThreshold }) => {
  const [itemHeight, setItemHeight] = useState(512);

  return (
    <FlatList
      data={flashcards}
      renderItem={({ item }) => {
        return (
          <View style={{ height: itemHeight }}>
            <Flashcard flashcard={item} />
          </View>
        );
      }}
      // Suffixes the index to prevent duplicate keys for demo purpose.
      keyExtractor={(item, index) => item.id.toString() + index}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      pagingEnabled
      onLayout={(event) => {
        setItemHeight(event.nativeEvent.layout.height);
      }}
    />
  );
};

export default FlashcardList;
