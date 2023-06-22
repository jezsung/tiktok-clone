import { Text, View } from 'react-native';

const Metadata: React.FC<{
  username: string;
  description: string;
}> = ({ username, description }) => {
  const desc = description.split(' #')[0];
  const tag = description.split(' #')[1];

  return (
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
        {desc} <Text style={{ fontFamily: 'sf-pro-rounded-700' }}>#{tag}</Text>
      </Text>
    </View>
  );
};

export default Metadata;
