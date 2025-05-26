import React from 'react';
import { View, StatusBar } from 'react-native';
import Calculator from './components/Calculator';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <Calculator />
    </View>
  );
}
