import React from 'react';
import styled from 'styled-components/native';
import UserContext from '../contexts/User';
import { UserConsumer } from '../contexts/User';
import { useContext } from 'react';
const StyledText = styled.Text`
  font-size: 24px;
  margin: 10px;
`;

const User = () => {
    const {user} = useContext(UserContext);
    return <StyledText>Name: {user.name}</StyledText>
};

export default User;