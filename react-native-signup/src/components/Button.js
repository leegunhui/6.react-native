import styled from "styled-components/native";
import { Pressable } from "react-native";

const ButtonContainer = styled(Pressable)`
  background-color: blue;
  padding: 14px 24px;
  border-radius: 12px;
  align-items: center;
  margin: 10px 0;
  width: 100%;
`;

const Title = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 600;
`;

const MyButton = (props) => {
  return (
    <ButtonContainer onPress={props.onPress}>
      <Title>{props.title}</Title>
    </ButtonContainer>
  );
};

export default MyButton;
