import { Image, Pressable, Text, View } from 'react-native';

import BookmarkIcon from '../../assets/icons/bookmark.svg';
import CommentIcon from '../../assets/icons/comment.svg';
import FlipIcon from '../../assets/icons/flip.svg';
import HeartIcon from '../../assets/icons/heart.svg';
import PlusIcon from '../../assets/icons/plus.svg';
import ShareIcon from '../../assets/icons/share.svg';

const PROFILE_SIZE = 45;

const ActionBar: React.FC<{
  avatar: string;
  onProfilePress?: () => void | undefined;
  onFlip?: () => void | undefined;
}> = ({ avatar, onProfilePress, onFlip }) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        gap: 15,
      }}
    >
      <ActionItem
        icon={
          <View style={{ height: 53 }}>
            <Image
              source={{ uri: avatar }}
              style={{
                width: PROFILE_SIZE,
                height: PROFILE_SIZE,
                borderColor: 'white',
                borderWidth: 1,
                borderRadius: PROFILE_SIZE / 2,
              }}
            />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                position: 'absolute',
                bottom: 0,
                width: 22,
                height: 22,
                borderRadius: 22 / 2,
                backgroundColor: '#28B18F',
                opacity: onProfilePress ? 1 : 0,
              }}
            >
              <PlusIcon width={11} height={11} fill="white" />
            </View>
          </View>
        }
      />
      <ActionItem
        icon={<HeartIcon width={30} height={30} fill="white" />}
        label="87"
      />
      <ActionItem
        icon={<CommentIcon width={30} height={30} fill="white" />}
        label="2"
      />
      <ActionItem
        icon={<BookmarkIcon width={30} height={30} fill="white" />}
        label="203"
      />
      <ActionItem
        icon={<ShareIcon width={26.08} height={25.18} fill="white" />}
        label="17"
      />
      {onFlip && (
        <Pressable onPress={onFlip}>
          <ActionItem
            icon={<FlipIcon width={38} height={38} fill="white" />}
            label="Flip"
          />
        </Pressable>
      )}
    </View>
  );
};

const ActionItem: React.FC<{
  icon: React.ReactElement;
  label?: string;
}> = ({ icon, label }) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      {icon}
      {label && (
        <Text
          style={{
            color: 'white',
            fontFamily: 'sf-pro-rounded-500',
            fontSize: 12,
            lineHeight: 14.32,
            letterSpacing: -0.01,
            textAlign: 'center',
          }}
        >
          {label}
        </Text>
      )}
    </View>
  );
};

export default ActionBar;
