import MultipleChoiceQuestionAnswerModel from '../types/muliple-choice-question-answer';
import MultipleChoiceQuestionModel from '../types/multiple-choice-question-model';

const fetchMcqAndAnswer = async (): Promise<{
  mcq: MultipleChoiceQuestionModel;
  answer: MultipleChoiceQuestionAnswerModel;
}> => {
  const responseMcq = await fetch(
    'https://cross-platform.rp.devfactory.com/following'
  );
  const jsonMcq = await responseMcq.json();
  const mcq = MultipleChoiceQuestionModel.fromJson(jsonMcq);

  const responseAnswer = await fetch(
    `https://cross-platform.rp.devfactory.com/reveal?id=${mcq.id}`
  );
  const jsonAnswer = await responseAnswer.json();
  const answer = MultipleChoiceQuestionAnswerModel.fromJson(jsonAnswer);

  return { mcq, answer };
};

export default fetchMcqAndAnswer;
