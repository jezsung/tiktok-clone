import { useRef, useState } from 'react';
import { Animated, Easing, Text, View } from 'react-native';

import ActionBar from './ActionBar';
import Metadata from './Metadata';
import Playlist from './Playlist';
import RatingBar from './RatingBar';
import FlashcardModel from '../types/flashcard-model';

const Flashcard: React.FC<{
  flashcard: FlashcardModel;
}> = ({ flashcard }) => {
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
          <Animated.View style={{ flex: 1, opacity }}>
            <Front
              front={flashcard.flashcardFront}
              description={flashcard.description}
              username={flashcard.user.name}
            />
          </Animated.View>
        )}
        {side === 'back' && (
          <Animated.View
            style={{
              flex: 1,
              opacity: opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
            }}
          >
            <Back
              front={flashcard.flashcardFront}
              back={flashcard.flashcardBack}
              description={flashcard.description}
              username={flashcard.user.name}
            />
          </Animated.View>
        )}

        <ActionBar avatar={flashcard.user.avatar} onFlip={flip} />
      </View>
      <Playlist playlist={flashcard.playlist} />
    </View>
  );
};

const Front: React.FC<{
  front: string;
  description: string;
  username: string;
}> = ({ front, description, username }) => {
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
      <Metadata username={username} description={description} />
    </View>
  );
};

const Back: React.FC<{
  front: string;
  back: string;
  description: string;
  username: string;
}> = ({ front, back, description, username }) => {
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

      <Metadata username={username} description={description} />
    </View>
  );
};

export default Flashcard;
