import { useState } from 'react';
import { Text, View } from 'react-native';

type Rating = 1 | 2 | 3 | 4 | 5;

const RatingBar: React.FC = () => {
  const [selectedRating, setSelectedRating] = useState<Rating | null>(null);

  function rate(rating: Rating) {
    setSelectedRating(rating);
  }

  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      {[1, 2, 3, 4, 5].map((rating) => {
        const color = (() => {
          switch (rating) {
            case 1:
              return '#F17D23';
            case 2:
              return '#FBB668';
            case 3:
              return '#FFD449';
            case 4:
              return '#16624F';
            case 5:
              return '#1F8A70';
            default:
              throw new Error('Unimplemented rating color');
          }
        })();

        if (selectedRating && rating !== selectedRating) {
          return null;
        }

        return (
          <View
            key={rating}
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: 52,
              backgroundColor: color,
              borderRadius: 8,
            }}
            onTouchEnd={() => rate(rating)}
          >
            <Text
              style={{
                color: 'white',
                fontFamily: 'sf-pro-rounded-600',
                fontSize: 17,
                lineHeight: 20.29,
              }}
            >
              {rating}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default RatingBar;
