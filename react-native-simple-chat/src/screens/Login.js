import React from 'react';
import styled from 'styled-components/native';
import { Text /*,Button */ } from 'react-native';
import { images } from '../utils/images';
import { Image, Input, Button } from '../components';
import { useState, useRef, useEffect } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail, removeWhitespace } from '../utils/common'
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

  const _handleLoginButtonPress = () => { };

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