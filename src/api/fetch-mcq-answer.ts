import MultipleChoiceQuestionAnswerModel from '../types/muliple-choice-question-answer';

const fetchMcqAnswer = async (): Promise<MultipleChoiceQuestionAnswerModel> => {
  const response = await fetch(
    'https://cross-platform.rp.devfactory.com/following'
  );
  const json = await response.json();
  return MultipleChoiceQuestionAnswerModel.fromJson(json);
};

export default fetchMcqAnswer;
