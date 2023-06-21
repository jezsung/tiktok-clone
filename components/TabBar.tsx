import React, { RefObject, useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, Text, View } from 'react-native';

type Props = {
  currentIndex: number;
  tabs: string[];
  onTap: (index: number) => void;
};

const INDICATOR_WIDTH = 30;

const TabBar: React.FC<Props> = ({ currentIndex = 0, tabs, onTap }) => {
  const indicatorPosition = useRef(new Animated.Value(0)).current;
  const containerRef = useRef<View>(null);
  const tabRefs = useMemo<RefObject<Text>[]>(() => {
    return Array.from({ length: tabs.length }, () => React.createRef<Text>());
  }, [tabs.length]);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    tabRefs[currentIndex].current?.measureLayout(
      containerRef.current,
      (left, top, width, height) => {
        Animated.timing(indicatorPosition, {
          toValue: left + (width - INDICATOR_WIDTH) / 2,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }).start();
      }
    );
  }, [currentIndex, tabs.length]);

  return (
    <View
      ref={containerRef}
      style={{
        flexDirection: 'column',
        gap: 5,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          gap: 20,
        }}
      >
        {tabs.map((tab, index) => (
          <Text
            ref={tabRefs[index]}
            key={index}
            onLayout={(event) => {
              if (index !== currentIndex) return;

              const { x, width } = event.nativeEvent.layout;
              indicatorPosition.setValue(x + (width - INDICATOR_WIDTH) / 2);
            }}
            onPress={() => {
              onTap(index);
            }}
            style={{
              color: 'white',
              opacity: index === currentIndex ? 1 : 0.6,
              fontFamily: 'sf-pro-rounded-600',
              fontSize: 16,
              lineHeight: 22,
              letterSpacing: -0.01,
            }}
          >
            {tab}
          </Text>
        ))}
      </View>
      <Animated.View
        style={{
          width: INDICATOR_WIDTH,
          height: 4,
          backgroundColor: 'white',
          transform: [{ translateX: indicatorPosition }],
        }}
      />
    </View>
  );
};

export default TabBar;
