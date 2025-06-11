// 최상위 컴포넌트가 사용될 컴포넌트
import { useState, useEffect } from 'react';
import {StatusBar, Image} from 'react-native';

// expo-asset : 로컬 이미지 / 파일을 앱에 미리 로드할 때 사용하는 패키지
import {Asset} from 'expo-asset';

// expo-font : 커스텀 폰트를 로드하는 라이브러리
import * as Font from 'expo-font';

// expo-splash-screen : 앱 실행시 스플래시 화면을 제어하는 라이브러리
import * as SplashScreen from 'expo-splash-screen';
import {ThemeProvider} from 'styled-components';
import { theme } from './Theme';
import Navigation from './navigations';
import {images} from "./utils/images";

import { ProgressProvider,UserProvider } from './contexts/index';


// 앱 시작 시 스플래시 화면이 자동으로 사라지지 않도록 설정
// 이 함수 호출 이후로는 내가 직접 hideAsync()를 호출할 때 까지
// 스플래시 화면이 유지된다.
SplashScreen.preventAutoHideAsync();

// 이미지 캐싱 함수 정의
const cacheImages = images => {
  // images 배열의 각 요소에 대해 다음과 같은 처리를 하겠다.
  return images.map(image=> {
    // image가 문자열이면(즉, 네트워크 상의 URL 이미지라면)
    if(typeof image === 'string'){
      // Image.prefetch : URL 이미지를 미리 네트워크에서 받아서 캐싱해놓는다.
      return Image.prefetch(image);
    } else{
      // 문자열이 아니라면, 로컬파일로 간주한다.
      // Asset.fromModule(image).downloadAsync(); : 로컬파일을 미리 디바이스 스토리지에 다운로드
      return Asset.fromModule(image).downloadAsync();
    }
  })
}

const cacheFonts = fonts => {
  return fonts.map(font => Font.loadAsync(font));
}

const App = () => {
  // 초기화 여부를 추적하는 상태 변수
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // useEffect에서 비동기 함수를 호출하여 리소스를 로드
    const prepareResources = async() => {
      try {
        await _loadAssets();
      } catch (error) {
        console.warn(error);
      } finally{
        setIsReady(true); // 로딩이 완료되면 isReady를 true로 설정
        await SplashScreen.hideAsync(); // 스플래시 화면을 숨김
      }
    };
    prepareResources();
  },[])

  const _loadAssets = async() => {
    // 이미지와 폰트를 캐싱하여 리소스를 로드
    // require()
    // 로컬 파일 리소스(이미지, 동영상, 사운드 파일 등)를 가져오는데 사용된다.
    const imageAssets = cacheImages([
                              require('../assets/splash.png'),
                              ...Object.values(images),
                            ]);
    const fontAssets = cacheFonts([]); // 추가적인 폰트가 있다면 이 배열에 추가

    await Promise.all([...imageAssets, ...fontAssets]);
  };

  if(!isReady){
    return null; // 로딩이 완료되지 않은 경우 화면을 빈 상태로 유지
  }


  return (
    // 스타일드 컴포넌트의 ThemeProvider 컴포넌트를 사용해
    // 스타일드 컴포넌트에서 정의된 theme를 사용할 수 있도록 작성했다.
    <ThemeProvider theme={theme}>
      <UserProvider>
        <ProgressProvider>
          <StatusBar barStyle='dark-content'/>
          <Navigation />
        </ProgressProvider>
      </UserProvider>
    </ThemeProvider>
  )
}

export default App;