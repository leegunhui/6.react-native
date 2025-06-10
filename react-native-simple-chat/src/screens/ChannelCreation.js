import React, { useState, useRef, useEffect, useContext } from 'react';
// 필요 없는 import는 정리할 수 있습니다. (예: useContext가 사용되지 않음)
import styled from 'styled-components';
import { Input, Button } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Alert } from 'react-native';
import { ProgressContext } from '../contexts';
import { createChannel } from '../utils/firebase';

// 화면 전체를 감싸는 컨테이너
const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

// 에러 메시지를 표시할 텍스트
const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;

const ChannelCreation = ({ navigation }) => {
  // 타이틀과 설명을 관리하는 상태 변수
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
    
  // 입력창 중에서 'description' 인풋에 포커스를 주기 위해 useRef 활용
  const descriptionRef = useRef();

  // 타이틀이 비었을 때 표시할 에러 메시지 상태
  const [errorMessage, setErrorMessage] = useState('');

  // “Create” 버튼 활성/비활성 관리를 위한 상태
  const [disabled, setDisabled] = useState(true);

// ProgressContext에서 스피너 객체 가져오기
  const { spinner } = useContext(ProgressContext);

  // title, description, errorMessage 상태가 바뀔 때마다 disabled 여부를 갱신
  // 현재 로직상 'title'이 없거나 에러가 있으면 버튼이 disabled 상태가 됨
  useEffect(() => {
    setDisabled(!(title && !errorMessage));
  }, [title, description, errorMessage]);

  // 타이틀이 변경될 때 호출되는 함수
  // 공백만 입력되었는지 체크 후 에러 메시지를 업데이트
  const _handleTitleChange = (title) => {
    setTitle(title);
    setErrorMessage(title.trim() ? '' : 'Please enter the title.');
  };

  // “Create” 버튼을 눌렀을 때 동작할 함수
  // 실제 채널 생성 로직(예: 서버 API 호출 등)을 작성할 수 있음
   // 채널 생성 버튼을 눌렀을 때 실행되는 함수 (비동기)
  const _handleCreateButtonPress = async () => {
    try {
      // 스피너 표시 시작
      spinner.start();
      // Firebase에 채널 생성 후, 생성된 문서의 id 반환
      const id = await createChannel({ title, description });
      // 생성된 채널 화면으로 이동하며, id와 title 정보를 함께 전달
      // replace를 사용해 현재 스택을 교체(뒤로 가기 시 이전 화면이 아닌 다른 화면으로 돌아갈 때 사용)
      navigation.replace('Channel', { id, title });
    } catch (e) {
      // 만약 에러가 발생하면 Alert로 사용자에게 표시
      Alert.alert('Creation Error', e.message);
    } finally {
      // 에러 발생 여부와 무관하게 스피너 중단
      spinner.stop();
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      extraScrollHeight={20}
    >
      <Container>
        {/* 타이틀 입력 */}
        <Input
          label="Title"
          value={title}
          onChangeText={_handleTitleChange}
          onSubmitEditing={() => {
            // 타이틀 양끝 공백 제거 후 description 입력창으로 이동
            setTitle(title.trim());
            descriptionRef.current.focus();
          }}
          onBlur={() => setTitle(title.trim())}
          placeholder="Title"
          returnKeyType="next"
          maxLength={20}
        />
        {/* 설명 입력 */}
        <Input
          ref={descriptionRef}
          label="Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
          onSubmitEditing={() => {
            setDescription(description.trim());
            _handleCreateButtonPress();
          }}
          onBlur={() => setDescription(description.trim())}
          placeholder="Description"
          returnKeyType="done"
          maxLength={40}
        />
        {/* 에러 메시지 표시 영역 */}
        <ErrorText>{errorMessage}</ErrorText>
        {/* 채널 생성 버튼 (비활성화 여부는 disabled 상태로 제어) */}
        <Button
          title="Create"
          onPress={_handleCreateButtonPress}
          disabled={disabled}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default ChannelCreation;