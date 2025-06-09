import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #ffecef;
`;

const Title = styled.Text`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 30px;
`;

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  return (
    <Container>
      <Title>로그인</Title>
      <CustomInput
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
      />
      <CustomInput
        placeholder="비밀번호"
        value={pw}
        onChangeText={setPw}
        secureTextEntry
      />
      <CustomButton
        title="로그인"
        onPress={() => console.log('로그인 버튼 클릭')}
      />
      <CustomButton
        title="회원가입"
        onPress={() => navigation.navigate('Signup')}
        backgroundColor="#66b366"
      />
    </Container>
  );
}
