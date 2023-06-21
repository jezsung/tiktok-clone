import UserModel from './user-model';

export default class FlashcardModel {
  id: number;
  playlist: string;
  flashcardFront: string;
  flashcardBack: string;
  description: string;
  tag: string;
  user: UserModel;

  constructor(
    id: number,
    playlist: string,
    flashcardFront: string,
    flashcardBack: string,
    description: string,
    tag: string,
    user: UserModel
  ) {
    this.id = id;
    this.playlist = playlist;
    this.flashcardFront = flashcardFront;
    this.flashcardBack = flashcardBack;
    this.description = description;
    this.tag = tag;
    this.user = user;
  }

  static fromJson(json: any): FlashcardModel {
    return new FlashcardModel(
      json['id'],
      json['playlist'],
      json['flashcard_front'],
      json['flashcard_back'],
      (json['description'] as string).split(' #')[1],
      '#' + (json['description'] as string).split(' #')[2],
      UserModel.fromJson(json['user'])
    );
  }
}
