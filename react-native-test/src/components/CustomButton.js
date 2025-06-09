import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';

const Button = styled.TouchableOpacity`
  width: 80%;
  padding: 14px;
  background-color: ${props => props.bg || '#3498db'};
  margin: 10px 0;
  border-radius: 8px;
  align-items: center;
`;

export default function CustomButton({ title, onPress, backgroundColor }) {
  return (
    <Button onPress={onPress} bg={backgroundColor}>
      <Text style={{ color: 'white' }}>{title}</Text>
    </Button>
  );
}
