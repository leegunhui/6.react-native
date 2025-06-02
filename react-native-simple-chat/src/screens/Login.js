import React from 'react';
import styled from 'styled-components/native';
import { Text, Button } from 'react-native';
import { images } from '../utils/images';
import { Image } from '../components';
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;

const Login = ({ navigation }) => {
  return (
    <Container>
      <Image url={images.logo} imagestyle={{ borderRadius: 8 }} />
      <Button title="Signup" onPress={() => navigation.navigate('Signup')} />
    </Container>
  );
};

export default Login;