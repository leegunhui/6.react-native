import React, { useEffect, useRef, useState, useContext } from 'react';
import styled from 'styled-components/native';
import { Image, Input, Button } from '../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail, removeWhitespace } from '../utils/common';
import { images } from '../utils/images';
import { signup } from '../utils/firebase';
import { Alert } from 'react-native';
import { ProgressContext, UserContext } from '../contexts'

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 40px 20px;
`;
const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`


const Signup = () => {
  //이름
  const [name, setName] = useState('');
  //이메일
  const [email, setEmail] = useState('');
  //비밀번호
  const [password, setPassword] = useState('');
  //비밀번호 확인
  const [passwordConfirm, setPasswordConfirm] = useState('');
  //에러 메시지
  const [errorMessage, setErrorMessage] = useState('');
  //버튼 활성/비활성화
  const [disabled, setDisabled] = useState(true);
  //프로필사진 이미지 URL
  const [photoUrl, setPhotoUrl] = useState(images.photo);

  const { spinner } = useContext(ProgressContext);
  const {dispatch} = useContext(UserContext);

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const didMountRef = useRef();

  //조건에 맞지 않을 때 에러문구 렌더링
  useEffect(() => {
    if (didMountRef.current) {
      let _errorMessage = '';
      if (!name) {
        _errorMessage = 'Please enter your name.';
      } else if (!validateEmail(email)) {
        _errorMessage = 'Please verify your email.';
      } else if (password.length < 6) {
        _errorMessage = 'The password must contain 6 characters at least.';
      } else if (password !== passwordConfirm) {
        _errorMessage = 'Passwords need to match';
      } else {
        _errorMessage = '';
      }
      setErrorMessage(_errorMessage);
    } else {
      didMountRef.current = true;
    }
  }, [name, email, password, passwordConfirm]);

  //조건에 따라 버튼 활성화/비활성화하기
  useEffect(() => {
    setDisabled(
      !(name && email && password && passwordConfirm && !errorMessage)
    )
  }, [name, email, password, passwordConfirm, errorMessage]);

const _handleSignupButtonPress = async () => {
    try {
      spinner.start();
      const user = await signup({email, password, name, photoUrl});
      dispatch(user);
      console.log(user);
      Alert.alert('Signup Success',user.email);
    } catch (error) {
      Alert.alert('Signup Error', error.message);
    } finally{
      spinner.stop();
    }
  };

  return (
    <KeyboardAwareScrollView
      extraHeight={20}>
      <Container>
        {/* 프로필 사진 */}
        <Image
          rounded
          url={photoUrl}
          showButton
          onChangeImage={url => setPhotoUrl(url)} />

        {/* 이름 입력 */}
        <Input
          label="name"
          value={name}
          onChangeText={text => setName(text)}
          onSubmitEditing={() => {
            setName(name.trim());
            emailRef.current.focus();
          }}
          onBlur={() => setName(name.trim())}
          placeholder="Name"
          returnKeyType="next"
        />

        {/* 이메일(아이디)입력 */}
        <Input
          ref={emailRef}
          label="Email"
          value={email}
          onChangeText={text => setEmail(removeWhitespace(text))}
          onSubmitEditing={() => passwordRef.current.focus()}
          placeholder="Email"
          returnKeyType="next"
        />

        {/* 비밀번호 입력 */}
        <Input
          ref={passwordRef}
          label="Password"
          value={password}
          onChangeText={text => setPassword(removeWhitespace(text))}
          onSubmitEditing={() => passwordConfirmRef.current.focus()}
          placeholder="Password"
          returnKeyType="done"
          isPassword
        />
        {/* 비밀번호일치 여부를 작성하는 Input */}
        <Input
          ref={passwordConfirmRef}
          label="Password Confirm"
          value={passwordConfirm}
          onChangeText={text => setPasswordConfirm(removeWhitespace(text))}
          onSubmitEditing={_handleSignupButtonPress}
          placeholder="Password"
          returnKeyType="done"
          isPassword
        />

        {/* 에러메시지 출력 */}
        <ErrorText>{errorMessage}</ErrorText>
        <Button
          title="Signup"
          onPress={_handleSignupButtonPress}
          disabled={disabled}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
}

export default Signup;