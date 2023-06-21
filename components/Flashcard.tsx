import { useRef, useState } from 'react';
import { Animated, Easing, Text, View } from 'react-native';

import ArrowIcon from '../assets/icons/arrow.svg';
import VideoIcon from '../assets/icons/video.svg';
// eslint-disable-next-line import/order
import ActionBar from './ActionBar';
// eslint-disable-next-line import/order
import RatingBar from './RatingBar';

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
  const [side, setSide] = useState<'front' | 'back'>('front');
  const opacity = useRef(new Animated.Value(1)).current;

  function flip() {
    setSide((prev) => (prev === 'front' ? 'back' : 'front'));
    opacity.stopAnimation((value) => {
      Animated.timing(opacity, {
        toValue: value > 0.5 ? 0 : 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    });
  }

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
        {side === 'front' && (
          <Animated.View style={{ opacity }}>
            <Front
              front={flashcardFront}
              description={description}
              tag={tag}
              username={name}
            />
          </Animated.View>
        )}
        {side === 'back' && (
          <Animated.View
            style={{
              opacity: opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
            }}
          >
            <Back
              front={flashcardFront}
              back={flashcardBack}
              description={description}
              tag={tag}
              username={name}
            />
          </Animated.View>
        )}

        <ActionBar avatar={avatar} onFlip={flip} />
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

const Front: React.FC<{
  front: string;
  description: string;
  tag: string;
  username: string;
}> = ({ front, description, tag, username }) => {
  return (
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
          {front}
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
          {username}
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
  );
};

const Back: React.FC<{
  front: string;
  back: string;
  description: string;
  tag: string;
  username: string;
}> = ({ front, back, description, tag, username }) => {
  return (
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
          gap: 24,
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
          {front}
        </Text>

        <View
          style={{
            alignSelf: 'stretch',
            backgroundColor: 'white',
            opacity: 0.2,
            height: 2,
          }}
        />

        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <Text
              style={{
                color: '#2DC59F',
                fontFamily: 'sf-pro-rounded-800',
                fontSize: 13,
                lineHeight: 15.51,
                paddingBottom: 4,
              }}
            >
              Answer
            </Text>
            <Text
              style={{
                color: 'white',
                opacity: 0.7,
                fontFamily: 'sf-pro-rounded-400',
                fontSize: 21,
                lineHeight: 25.06,
              }}
            >
              {back}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              gap: 5,
            }}
          >
            <Text
              style={{
                color: 'white',
                opacity: 0.6,
                fontFamily: 'sf-pro-rounded-400',
                fontSize: 15,
                lineHeight: 17.9,
              }}
            >
              How well did you know this?
            </Text>
            <RatingBar />
          </View>
        </View>
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
          {username}
        </Text>
        <Text
          style={{
            color: 'white',
            fontFamily: 'sf-pro-rounded-400',
            fontSize: 13,
            lineHeight: 14.32,
          }}
        >
          {description}{' '}
          <Text style={{ fontFamily: 'sf-pro-rounded-700' }}>{tag}</Text>
        </Text>
      </View>
    </View>
  );
};

export default Flashcard;
