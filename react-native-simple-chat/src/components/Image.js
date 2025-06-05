import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons'
import { Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
//Expo SDK 52에서는 권한 요청 기능 자체는 당연히 지원되지만, 더 이상 별도의 expo-permissions 모듈을 사용하지 않는다.
//import * as Permissions from 'expo-permissions

const Container = styled.View`
  align-self: center;
  margin-bottom: 30px;
`;

const StyledImage = styled.Image`
  background-color: ${({ theme }) => theme.imageBackground};
  width: 100px;
  height: 100px;
  border-radius: ${({ rounded }) => (rounded ? 50 : 0)}px;
`;

const ButtonContainer = styled.TouchableOpacity`
  background-color : ${({ theme }) => theme.imageButtonBackground};
  position : absolute;
  bottom : 0;
  right: 0;
  width : 30px;
  border-radius : 15px;
  justify-content : center;
  align-items: center;
`

const ButtonIcon = styled(MaterialIcons).attrs({
  name: 'photo-camera',
  size: 22,
})`
  color: ${({ theme }) => theme.imageButtonIcon}
`;

const PhotoButton = ({ onPress }) => {
  return (
    <ButtonContainer onPress={onPress}>
      <ButtonIcon />
    </ButtonContainer>
  )
}

const Image = ({ url, imageStyle, rounded, showButton, onChangeImage }) => {
  // 컴포넌트가 마운트될 때, 한 번만 실행되는 useEffect
  // iOS 기기에서 미디어 라이브러리(사진첩) 접근 권한을 요청합니다.
  useEffect(() => {
    (async () => {
      try {
        // 플랫폼이 iOS일 때만 권한 요청 (Android는 별도의 권한 요청이 필요 없을 수 있음)
        if (Platform.OS === 'ios') {
          // 미디어 라이브러리 접근 권한을 비동기적으로 요청합니다.
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          // 권한이 부여되지 않았다면, 사용자에게 경고 메시지 출력
          if (status !== 'granted') {
            Alert.alert(
              'Photo Permission', // 경고창 제목
              'Please turn on the camera roll permissions' // 경고 메시지
            );
          }
        }
      } catch (e) {
        // 권한 요청 중 에러 발생 시, 에러 메시지를 포함한 경고창 출력
        Alert.alert('Photo Permission Error', e.message);
      }
    })();
  }, []);

  // 사용자가 "이미지 선택" 버튼을 눌렀을 때 호출되는 함수
  const _handleEditButton = async () => {
    try {
      // 이미지 라이브러리(갤러리)에서 이미지를 선택할 수 있는 인터페이스를 띄웁니다.
      const result = await ImagePicker.launchImageLibraryAsync({
        // 이미지 타입만 선택할 수 있도록 설정 (비디오 등은 선택 불가)
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        // 선택 후 사용자가 이미지를 편집할 수 있도록 허용 (크롭 등)
        allowsEditing: true,
        // 편집 시 고정될 비율 (여기서는 정사각형: 1:1)
        aspect: [1, 1],
        // 이미지의 품질 설정 (1은 최고 품질)
        quality: 1,
      });

      // 사용자가 이미지 선택을 취소하지 않았다면(result.canceled가 false라면)
      if (!result.canceled) {
        // 선택된 이미지 정보가 담긴 배열의 첫 번째 항목에서 URI를 추출합니다.
        const imageUri = result.assets[0].uri;
        // 추출한 이미지 URI를 부모 컴포넌트에 전달하여 이미지 변경을 알립니다.
        onChangeImage(imageUri);
      }
    } catch (e) {
      // 이미지 선택 또는 처리 중 에러 발생 시, 에러 메시지를 포함한 경고창 출력
      Alert.alert('Photo Error', e.message);
    }
  };
  return (
    <Container>
      <StyledImage source={{ uri: url }} style={imageStyle} rounded={rounded} />
      {showButton && <PhotoButton onPress={_handleEditButton} />}
    </Container>
  );
};

Image.defaultProps = {
  rounded: false,
  showButton: false,
  onChangeImage: () => { },
}

Image.propTypes = {
  uri: PropTypes.string,
  imageStyle: PropTypes.object,
  rounded: PropTypes.bool,
  showButton: PropTypes.bool,
  onChangeImage: PropTypes.func,
};

export default Image;