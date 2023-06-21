import { Text, View } from 'react-native';

import ArrowIcon from '../assets/icons/arrow.svg';
import VideoIcon from '../assets/icons/video.svg';
// eslint-disable-next-line import/order
import ActionBar from './ActionBar';

const Flashcard: React.FC<{
  id: number;
  playlist: string;
  flashcardFront: string;
  flashcardBack: string;
  description: string;
  tag: string;
  user: {
    name: string;
    avatar: string;
  };
}> = ({
  id,
  playlist,
  flashcardFront,
  flashcardBack,
  description,
  tag,
  user: { name, avatar },
}) => {
  return (
    <View style={{ flex: 1, flexDirection: 'column', gap: 16 }}>
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
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            gap: 24,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              width: 286,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontFamily: 'sf-pro-rounded-400',
                fontSize: 21,
                lineHeight: 25.06,
              }}
            >
              {flashcardFront}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              gap: 6,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontFamily: 'sf-pro-rounded-600',
                fontSize: 15,
                lineHeight: 17.9,
              }}
            >
              {name}
            </Text>
            <Text
              style={{
                color: 'white',
                fontFamily: 'sf-pro-rounded-400',
                fontSize: 12,
                lineHeight: 14.32,
              }}
            >
              {description}{' '}
              <Text style={{ fontFamily: 'sf-pro-rounded-700' }}>{tag}</Text>
            </Text>
          </View>
        </View>
        <ActionBar avatar={avatar} onFlip={() => {}} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 10,
          backgroundColor: '#161616',
        }}
      >
        <View style={{ flexDirection: 'row', gap: 4 }}>
          <VideoIcon width={20} height={16} fill="white" />
          <Text
            style={{
              color: 'white',
              fontFamily: 'sf-pro-rounded-600',
              fontSize: 13,
              lineHeight: 15.51,
            }}
          >
            {playlist}
          </Text>
        </View>
        <ArrowIcon width={11} height={16} fill="white" />
      </View>
    </View>
  );
};

export default Flashcard;
