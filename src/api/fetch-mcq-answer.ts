import McqAnswerModel from '../types/mcq-answer-model';

const fetchMcqAnswer = async (id: number): Promise<McqAnswerModel> => {
  const response = await fetch(
    `https://cross-platform.rp.devfactory.com/reveal?id=${id}`
  );
  const json = await response.json();
  return McqAnswerModel.fromJson(json);
};

export default fetchMcqAnswer;
