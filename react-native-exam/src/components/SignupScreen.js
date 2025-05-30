import React, { useState } from 'react';
import {View,Text,TextInput,Pressable,Alert,StyleSheet,SafeAreaView,} from 'react-native';

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const isValid = validateEmail(email) && password.length >= 6;

  const onPressSignup = () => {
    Alert.alert('회원가입 완료');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>회원가입</Text>

      <TextInput
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />

      <TextInput
        placeholder="비밀번호 (6자 이상)"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <TextInput
        placeholder="이름"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <Pressable
        onPress={onPressSignup}
        disabled={!isValid}
        hitSlop={{ top: 30, bottom: 30, left: 50, right: 50 }}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: isValid ? 'blue' : 'lightgray' },
        ]}>
        <Text style={styles.buttonText}>가입하기</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    width: '100%',           
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
    padding: 15,
    fontSize: 15,
    marginBottom: 15,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
