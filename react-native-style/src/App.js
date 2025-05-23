import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { viewStyles, textStyles } from './styles';
import { Header, Contents, Footer } from './components/Layout';
import FlexDirectionTest from './components/FlexDirectionTest';
import JustifyContentTest from './components/JustifyContentTest';
import AlignItemsTest from './components/AlignItemsTest';
import { Platform } from 'react-native';
import ShadowBox from './ShadowBox';
import Button from './components/Buttons';
import styled from 'styled-components/native';

const App = () => {
    return (
        <View style={viewStyles.container}>
            {/* <Text style={[textStyles.text, { color: 'green' }]}>
        Inline Styling - Text
      </Text>
      <Text style={[textStyles.text, textStyles.error]}>
        Inline Styling - Error
      </Text> */}
            {/* <Header />
      <Contents />
      <Footer /> */}
            {/* <FlexDirectionTest/> */}
            {/* <JustifyContentTest/> */}
            {/* <AlignItemsTest /> */}
            {/* {Platform.OS === 'ios' ? (
        <Text>iOS에서 실행 중</Text>
      ) : (
        <Text>Android에서 실행 중</Text>
      )} */}
            {/* <Text>현재 플랫폼 버전: {Platform.Version}</Text>
      {Platform.OS === 'android' && Platform.Version < 30 ? (
        <Text>이 기능은 Android 30 이상에서만 지원됩니다.</Text>
      ) : (
        <Text>현재 플랫폼에서 지원되는 기능입니다.</Text>
      )} */}

        {/* <ShadowBox /> */}
      <Container>
      <Button title="Hanbit" />
      <Button title="React Native" />
      </Container>
        </View>
    

    );
};

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     text: {
//         padding: 10,
//         fontSize: 26,
//         fontWeight: '600',
//         color: 'black',
//     },
//     error: {
//         padding: 10,
//         fontSize: 26,
//         fontWeight: '400',
//         color: 'red',
//     },
// });
const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.select({
            ios: 50,      // iOS에서 paddingTop 50 적용
            android: 20,  // Android에서 paddingTop 20 적용
        }),
    },
});

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
`;
export default App;