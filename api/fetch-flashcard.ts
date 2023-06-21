import FlashcardModel from '../models/flashcard-model';

const fetchFlashcard = async (): Promise<FlashcardModel> => {
  const response = await fetch(
    'https://cross-platform.rp.devfactory.com/following'
  );
  const json = await response.json();
  return FlashcardModel.fromJson(json);
};

export default fetchFlashcard;
