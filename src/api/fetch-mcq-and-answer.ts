import McqAnswerModel from '../types/mcq-answer-model';
import McqModel from '../types/mcq-model';

const fetchMcqAndAnswer = async (): Promise<{
  mcq: McqModel;
  answer: McqAnswerModel;
}> => {
  const responseMcq = await fetch(
    'https://cross-platform.rp.devfactory.com/following'
  );
  const jsonMcq = await responseMcq.json();
  const mcq = McqModel.fromJson(jsonMcq);

  const responseAnswer = await fetch(
    `https://cross-platform.rp.devfactory.com/reveal?id=${mcq.id}`
  );
  const jsonAnswer = await responseAnswer.json();
  const answer = McqAnswerModel.fromJson(jsonAnswer);

  return { mcq, answer };
};

export default fetchMcqAndAnswer;
