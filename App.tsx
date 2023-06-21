import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import CountdownTimer from './components/CountdownTimer';

export default function App() {
  return (
    <SafeAreaProvider>
      <LinearGradient
        colors={['#001D28', '#00425A']}
        style={{
          flex: 1,
        }}
      >
        <StatusBar style="auto" />
        <SafeAreaView>
          <View
            style={{
              alignSelf: 'stretch',
              backgroundColor: 'black',
              padding: 16,
            }}
          >
            <CountdownTimer />
          </View>
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  );
}
