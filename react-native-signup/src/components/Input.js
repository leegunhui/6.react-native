import styled from "styled-components/native";
import { useWindowDimensions } from "react-native";

const StyledInput = styled.TextInput.attrs({
  placeholderTextColor: "blue",
})`
  width: 200px;
  height: 60px;
  margin: 3px 0;
  padding: 15px 20px;
  border-bottom-width: 1px;
  border-bottom-color: gray;
  background-color: white;
  font-size: 25px;
  color: gray;
`;

const Input = ({
  placeholder,
  value,
  onChangeText,
  onSubmitEditing,
  onBlur
}) => {
  const { width } = useWindowDimensions();

  return (
    <StyledInput
      width={width}
      placeholder={placeholder}
      maxLength={50}
      autoCapitalize="none"
      autoCorrect={false}
      returnKeyType="done"
      keyboardAppearance="dark"
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      onBlur={onBlur}
    />
  );
};

export default Input;
