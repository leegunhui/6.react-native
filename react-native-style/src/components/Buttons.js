
import React from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#9b59b6',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginVertical: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
});

const Button = props => {
  return (
    <ButtonContainer>
    <Title>{props.title}</Title>
  </ButtonContainer>
  );
};

export default Button;