import { Option } from './multiple-choice-question-model';

export default class MultipleChoiceQuestionAnswerModel {
  id: number;
  correctOptions: Option[];

  constructor(id: number, correctOptions: Option[]) {
    this.id = id;
    this.correctOptions = correctOptions;
  }

  static fromJson(json: any): MultipleChoiceQuestionAnswerModel {
    return new MultipleChoiceQuestionAnswerModel(
      json['id'],
      json['correct_options']
    );
  }
}
