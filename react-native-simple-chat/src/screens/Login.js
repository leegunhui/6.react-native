import React from 'react';
import styled from 'styled-components/native';
import { Text /*,Button */ } from 'react-native';
import { images } from '../utils/images';
import { Image, Input, Button } from '../components';
import { useState, useRef, useEffect, useContext } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail, removeWhitespace } from '../utils/common'
import { Alert } from 'react-native';
import { login } from '../utils/firebase';
import { ProgressContext, UserContext } from '../contexts';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding : 20px;
`;

const ErrorText = styled.Text`
  align-items : flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');
  //버튼의 활성화 상태를 관리하는 state
  const [disabled, setDisabled] = useState(true);
  const {spinner} = useContext(ProgressContext);
  const {dispatch} = useContext(UserContext);

  const _handleEmailChange = email => {
    const changedEmail = removeWhitespace(email);
    setEmail(changedEmail);
    setErrorMessage(
      validateEmail(changedEmail) ? '' : 'Please verify your email.'
    );
  };

  const _handlePasswordChange = password => {
    setPassword(removeWhitespace(password));
  };

  const _handleLoginButtonPress = async() => {
      try {
        spinner.start();
        const user = await login({email, password});
        //UserContext의 dispatch함수를 통해 user의 상태가 인증된 사용자 정보로 변경된다.
        dispatch(user);
        Alert.alert('Login Success', user.email);
      } catch (error) {
        Alert.alert('Login Error', error.message);
      } finally{
        spinner.stop();
      }
    };

  useEffect(() => {
    //로그인 버튼은 이메일과 비밀번호가 입력되어 있어야 하고, 오류 메시지가 없어야 활성화된다.
    setDisabled(!(email && password && !errorMessage));
  }, [email, password, errorMessage])

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      extraScrollHeight={80}
      enableOnAndroid={true}
    >
      <Container>
        <Image url={images.logo} style={{ borderRadius: 8 }} />
        <Input
          label="Email"
          value={email}
          onChangeText={_handleEmailChange}
          onSubmitEditing={() => passwordRef.current?.focus()}
          placeholder="Email"
          returnKeyType="next"
        />
        <Input
          ref={passwordRef}
          label="Password"
          value={password}
          onChangeText={_handlePasswordChange}
          onSubmitEditing={_handleLoginButtonPress}
          placeholder="Password"
          returnKeyType="done"
          isPassword
        />
        <ErrorText>{errorMessage}</ErrorText>

        <Button
          title="Login"
          onPress={_handleLoginButtonPress}
          disabled={disabled}
        />
        <Button
          title="Sign up with email"
          onPress={() => navigation.navigate('Signup')}
          isFilled={false}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Login;