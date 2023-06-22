import McqModel from '../types/mcq-model';

const fetchMcq = async (): Promise<McqModel> => {
  const response = await fetch(
    'https://cross-platform.rp.devfactory.com/for_you'
  );
  const json = await response.json();
  return McqModel.fromJson(json);
};

export default fetchMcq;
