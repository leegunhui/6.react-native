import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Fragment } from 'react';
import App from './src/App';

export default function App() {
  const name = "Mal-Dong";
  return (
    <View style={{flex:1,
      backgroundColor:'#fff',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Text>zzzz</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
