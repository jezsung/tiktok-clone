import { Text, View } from 'react-native';

import ArrowIcon from '../../assets/icons/arrow.svg';
import VideoIcon from '../../assets/icons/video.svg';

const Playlist: React.FC<{
  playlist: string;
}> = ({ playlist }) => {
  return (
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
  );
};

export default Playlist;
