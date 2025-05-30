import React from 'react';
import { SafeAreaView } from 'react-native';
import SignupScreen from './components/SignupScreen';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SignupScreen />
    </SafeAreaView>
  );
}
