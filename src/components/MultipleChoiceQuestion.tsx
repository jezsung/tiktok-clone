import { useState } from 'react';
import { Text, View } from 'react-native';

import ActionBar from './ActionBar';
import Metadata from './Metadata';
import Playlist from './Playlist';
import MultipleChoiceQuestionAnswerModel from '../types/muliple-choice-question-answer';
import MultipleChoiceQuestionModel, {
  OptionId,
} from '../types/multiple-choice-question-model';

const MultipleChoiceQuestion: React.FC<{
  mcq: MultipleChoiceQuestionModel;
  answer: MultipleChoiceQuestionAnswerModel;
}> = ({ mcq, answer }) => {
  const [selectedAnswerId, setSelectedAnswerId] = useState<OptionId | null>(
    null
  );

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'flex-end',
          gap: 12,
          paddingTop: 17,
          paddingRight: 8,
          paddingLeft: 16,
        }}
      >
        <View style={{ flex: 1, flexDirection: 'column', gap: 24 }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              alignItems: 'stretch',
              gap: 24,
            }}
          >
            <View style={{ flex: 1, paddingVertical: 40 }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'sf-pro-rounded-500',
                  fontSize: 22,
                  lineHeight: 26.25,
                }}
              >
                {mcq.question}
              </Text>
            </View>
            <View
              style={{ flexDirection: 'column', alignItems: 'stretch', gap: 8 }}
            >
              {mcq.options.map((option) => {
                const isCorrectAnswer = answer.correctOptions.some(
                  (o) => o.id === option.id
                );
                const isSelectedWrongAnswer =
                  !isCorrectAnswer && selectedAnswerId === option.id;

                let backgroundColor: string;
                if (!selectedAnswerId) {
                  backgroundColor = '#FFFFFF80';
                } else {
                  if (isCorrectAnswer) {
                    backgroundColor = '#28B18FB2';
                  } else if (isSelectedWrongAnswer) {
                    backgroundColor = '#DC5F5FB2';
                  } else {
                    backgroundColor = '#FFFFFF80';
                  }
                }

                return (
                  <View
                    key={option.id}
                    style={{
                      backgroundColor,
                      borderRadius: 8,
                      paddingHorizontal: 12,
                      paddingVertical: 16,
                    }}
                    onTouchEnd={() => setSelectedAnswerId(option.id)}
                  >
                    <Text
                      style={{
                        color: 'white',
                        opacity: 1,
                        fontFamily: 'sf-pro-rounded-500',
                        fontSize: 17,
                        lineHeight: 20.29,
                        textShadowColor: 'black',
                        textShadowOffset: {
                          width: 1,
                          height: 1.5,
                        },
                        textShadowRadius: 2,
                      }}
                    >
                      {option.answer}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
          <Metadata username={mcq.user.name} description={mcq.description} />
        </View>
        <ActionBar avatar={mcq.user.avatar} />
      </View>
      <Playlist playlist={mcq.playlist} />
    </View>
  );
};

export default MultipleChoiceQuestion;