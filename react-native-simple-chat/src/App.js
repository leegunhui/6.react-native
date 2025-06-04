import React from 'react'
import { StatusBar } from 'react-native'
import { theme } from './theme'
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'; // expo-splash-screen을 불러옴
import { ThemeProvider } from 'styled-components/native';
import { useState, useEffect } from 'react';
import Navigation from './navigations';
import { images } from './utils/images';
import { Image } from 'react-native';

// 스플래시 화면이 자동으로 숨겨지지 않도록 설정하여 초기화 작업이 완료될 때까지 유지함
SplashScreen.preventAutoHideAsync();

const cacheImages = images => {
    // 이미지 캐싱 함수: 문자열로 전달된 URL 이미지와 로컬 파일 이미지에 따라 각각 적절한 캐싱 방식으로 처리
    return images.map(image => {
        if (typeof image === 'string') {
            return Image.prefetch(image); // URL로 제공된 이미지의 경우, Image.prefetch로 캐싱
        } else {
            return Asset.fromModule(image).downloadAsync(); // 로컬 파일의 경우, expo-asset에서 제공하는 다운로드 방식으로 캐싱
        }
    });
};

const cacheFonts = fonts => {
    // 폰트 캐싱 함수: 폰트 배열을 받아 각 폰트를 로드
    return fonts.map(font => Font.loadAsync(font));
};


const App = () => {
    const [isReady, setIsReady] = useState(false); // 초기화 여부를 추적하는 상태 변수

    useEffect(() => {
        // useEffect에서 비동기 함수 호출하여 리소스를 로드
        const prepareResources = async () => {
            try {
                await _loadAssets(); // 리소스를 로드하는 비동기 함수 호출
            } catch (error) {
                console.warn(error); // 오류 발생 시 경고 메시지 출력
            } finally {
                setIsReady(true); // 로딩이 완료되면 isReady를 true로 설정
                await SplashScreen.hideAsync(); // 스플래시 화면 숨김
            }
        };

        prepareResources(); // 준비 함수 호출
    }, []); // 빈 의존성 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

    const _loadAssets = async () => {
        const imageAssets = cacheImages([
            require('../assets/splash.png'),
            ...Object.values(images),
        ]);
        const fontAssets = cacheFonts([]);

        await Promise.all([...imageAssets, ...fontAssets]);
    };

    if (!isReady) {
        return null; // 로딩이 완료되지 않은 경우 화면을 빈 상태로 유지
    }

    return (
        // 로딩 완료 시 앱의 실제 UI를 렌더링
        <ThemeProvider theme={theme}>
            <StatusBar barStyle="dark-content" /> {/* 상태 바 스타일 설정 */}
            <Navigation />
        </ThemeProvider>
    );
};


export default App;