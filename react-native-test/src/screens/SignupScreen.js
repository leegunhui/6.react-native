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

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  return (
    <Container>
      <Title>회원가입</Title>

     <CustomInput
        placeholder="이름"
        value={name}
        onChangeText={setName}
      />

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
        title="회원가입"
        onPress={() => console.log('회원가입 버튼 클릭')}
      />
      <CustomButton
        title="로그인"
        onPress={() => navigation.navigate('Login')}
        backgroundColor="orange"
      />
    </Container>
  );
}
