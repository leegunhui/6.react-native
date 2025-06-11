import styled from 'styled-components';
import { Image, Input, Button } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail, removeWhitespce } from '../utils/common';
import { useState,useRef, useEffect,useContext } from 'react';
import { images } from '../utils/images';
import { signup } from '../utils/firebase';
import { Alert } from 'react-native';
import { ProgressContext, UserContext } from '../contexts/index';


const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding : 20px 10px;
`;

const ErrorText = styled.Text`
  align-items : flex-start;
  width: 90%;
  height : 20px;
  margin-bottom : 10px;
  line-height : 20px;
  color : ${({theme}) => theme.errorText};
`

const Signup = () => {

  const {spinner} = useContext(ProgressContext);
  const {dispatch} = useContext(UserContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setIsDisabled] = useState(true);

  //프로필사진 이미지 URL
  const [photoURL, setPhotoURL] = useState(images.photo);

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  useEffect(() => {
    let _errorMessage = '';
    if(!name){
      _errorMessage = 'Please enter your name.';
    } else if(!validateEmail(email)){
      _errorMessage = 'Please verify your email';
    } else if(password.length < 6) {
      _errorMessage = 'The Password must contain 6 characters at least.';
    } else if(password != passwordConfirm){
      _errorMessage = 'Passwords need to match';
    } else {
      _errorMessage = '';
    }
    setErrorMessage(_errorMessage);
  },[name,email,password,passwordConfirm]);

  //조건에 따라 버튼 활성화/비활성화 하기
  useEffect(() => {
    setIsDisabled(
      !(name && email && password && passwordConfirm && !errorMessage))
  },[name,email,password,passwordConfirm, errorMessage])

  const _handleSignupButtonPress = async() => {
    try {
      spinner.start();
      const user = await signup({email,password,name,photoURL});
      dispatch(user);
      console.log(user);
      Alert.alert('Signup Success',user.email);
    } catch (error) {
      Alert.alert('Signup Error',error.message);
    } finally{
      spinner.stop();
    }
  };

  return (
    <KeyboardAwareScrollView
        extraScrollHeight={120}
        enableOnAndroid={true}
    >
    <Container>

      <Image 
        rounded 
        url={photoURL}
        showButton
        onChangeImage={url => {
          console.log('s_url :',url);
          setPhotoURL(url)
        }}
      />

      <Input
        label="name"
        value={name}
        onChangeText={text => setName(text)}
        onSubmitEditing = {() => {
          setName(name.trim());
          emailRef.current.focus();
        }}
        onBlur = {() => setName(name.trim())}
        placeholder="Name"
        returnKeyType="next"
      />

      <Input
        ref={emailRef}
        label="Email"
        value={email}
        onChangeText={text => setEmail(removeWhitespce(text))}
        onSubmitEditing={() => passwordRef.current.focus()}
        placeholder="Email"
        returnKeyType="next"
      />
      <Input
        ref={passwordRef}
        label="Password"
        value={password}
        onChangeText={text => setPassword(removeWhitespce(text))}
        onSubmitEditing={() => passwordConfirm.current.focus()}
        placeholder="Password"
        returnKeyType="done"
        isPassword
      />
      <Input
        ref={passwordConfirmRef}
        label="Password Confirm"
        value={passwordConfirm}
        onChangeText={text => setPasswordConfirm(text)}
        onSubmitEditing={_handleSignupButtonPress}
        placeholder="Password"
        returnKeyType="done"
        isPassword
      />
      {/* 에러메시지 출력 */}
      <ErrorText>{errorMessage}</ErrorText>

      {/* 회원가입버튼 */}
      <Button
        title="Signup"
        onPress={_handleSignupButtonPress}
        disabled={disabled}
      />
    </Container>
    </KeyboardAwareScrollView>
  );
};

export default Signup;