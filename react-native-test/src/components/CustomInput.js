import React from 'react';
import styled from 'styled-components/native';

const Input = styled.TextInput`
  width: 80%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

export default function CustomInput({ placeholder, value, onChangeText, secureTextEntry }) {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  );
}
