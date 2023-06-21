import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import ActivityIcon from '../assets/icons/activity.svg';

const CountdownTimer: React.FC = () => {
  const [timeSpentInMilliseconds, setTimeSpentInMilliseconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpentInMilliseconds((prev) => prev + 1000);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
      <ActivityIcon fill="white" fillOpacity={0.6} />
      <Text
        style={{
          color: 'white',
          opacity: 0.6,
          fontFamily: 'sf-pro-rounded-400',
          fontSize: 14,
          lineHeight: 16.71,
        }}
      >
        {format(timeSpentInMilliseconds)}
      </Text>
    </View>
  );
};

function format(timeInMilliseconds: number): string {
  const seconds = Math.floor(timeInMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return `${seconds}s`;
  }
  if (minutes < 60) {
    return `${minutes}m`;
  }
  if (hours < 24) {
    return `${hours}h`;
  }
  return `${days}d`;
}

export default CountdownTimer;
