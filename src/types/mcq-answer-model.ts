import { Option } from './mcq-model';

export default class McqAnswerModel {
  id: number;
  correctOptions: Option[];

  constructor(id: number, correctOptions: Option[]) {
    this.id = id;
    this.correctOptions = correctOptions;
  }

  static fromJson(json: any): McqAnswerModel {
    return new McqAnswerModel(json['id'], json['correct_options']);
  }
}
