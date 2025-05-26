import styled from "styled-components/native";
import { Alert } from "react-native";
import { useState } from "react";
import Input from "./components/Input";
import Button from "./components/Button";

const Container = styled.View`
  flex: 1;
  background-color: white;
  padding: 30px 20px;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: gray;
  margin-bottom: 30px;
  align-self: center;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 4px;
`;

const Label = styled.Text`
  width: 80px;
  color: gray;
  font-weight: 600;
  font-size: 16px;
`;

const StyledInput = styled(Input)`
  flex: 1;
  height: 40px;
  padding-left: 10px;
  font-size: 16px;
`;

export default function App() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [email, setEmail] = useState("");

  const onPressSignup  = () => {
    Alert.alert(`입력된 id는 ${id}, 이메일은 ${email}입니다.`);
  };

  return (
    <Container>
      <Title>회원가입</Title>

      <Row>
        <Label>아이디</Label>
        <StyledInput value={id} onChangeText={setId} />
      </Row>

      <Row>
        <Label>비밀번호</Label>
        <StyledInput value={pw} onChangeText={setPw} />
      </Row>

      <Row>
        <Label>메일</Label>
        <StyledInput
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </Row>

      <Button title="가입하기" onPress={onPressSignup} />
    </Container>
  );
}
