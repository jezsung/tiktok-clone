import { Text, View } from 'react-native';

import ActivityIcon from '../../assets/icons/activity.svg';
import BookmarkIcon from '../../assets/icons/bookmark.svg';
import DiscoverIcon from '../../assets/icons/discover.svg';
import HomeIcon from '../../assets/icons/home.svg';
import ProfileIcon from '../../assets/icons/profile.svg';

const BottomNavigationBar: React.FC = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
      }}
    >
      <BottomNavigationItem
        icon={<HomeIcon height={21} fill="white" />}
        label="Home"
        active
      />
      <BottomNavigationItem
        icon={<DiscoverIcon height={21} fill="white" />}
        label="Discover"
      />
      <BottomNavigationItem
        icon={<ActivityIcon height={21} fill="white" />}
        label="Activity"
      />
      <BottomNavigationItem
        icon={<BookmarkIcon height={21} fill="white" />}
        label="Bookmarks"
      />
      <BottomNavigationItem
        icon={<ProfileIcon height={21} fill="white" />}
        label="Profile"
      />
    </View>
  );
};

const BottomNavigationItem: React.FC<{
  icon: React.ReactElement;
  label: string;
  active?: boolean;
}> = ({ icon, label, active = false }) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        opacity: active ? 1 : 0.4,
        width: 48,
        paddingTop: 6,
        paddingBottom: 3,
      }}
    >
      {icon}
      <Text
        style={{
          color: 'white',
          // The design spec has 500 weight but I had to make it 400 to make the label one-line.
          fontFamily: 'sf-pro-rounded-400',
          fontSize: 10,
          lineHeight: 11.93,
          textAlign: 'center',
        }}
      >
        {label}
      </Text>
    </View>
  );
};

export default BottomNavigationBar;
