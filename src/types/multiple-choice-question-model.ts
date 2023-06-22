import UserModel from './user-model';

export type OptionId = 'A' | 'B' | 'C';

export interface Option {
  id: OptionId;
  answer: string;
}

export default class MultipleChoiceQuestionModel {
  id: number;
  playlist: string;
  description: string;
  image: string;
  question: string;
  options: Option[];
  user: UserModel;

  constructor(
    id: number,
    playlist: string,
    description: string,
    image: string,
    question: string,
    options: Option[],
    user: UserModel
  ) {
    this.id = id;
    this.playlist = playlist;
    this.description = description;
    this.image = image;
    this.question = question;
    this.options = options;
    this.user = user;
  }

  static fromJson(json: any): MultipleChoiceQuestionModel {
    return new MultipleChoiceQuestionModel(
      json['id'],
      json['playlist'],
      json['description'],
      json['image'],
      json['question'],
      json['options'],
      UserModel.fromJson(json['user'])
    );
  }
}
