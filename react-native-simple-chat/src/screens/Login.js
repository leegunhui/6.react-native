import styled from "styled-components";
import {Image, Input, Button} from "../components/index.js";
import { images } from "../utils/images.js";
import { useState, useRef,useEffect,useContext } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { removeWhitespce,validateEmail } from "../utils/common.js";
import { login } from "../utils/firebase.js";
import { Alert } from "react-native";
import { ProgressContext,UserContext } from "../contexts/index.js";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;

const ErrorText = styled.Text`
    align-items : flex-start;
    width: 90%;
    height : 20px;
    margin-bottom : 10px;
    line-height : 20px;
    color : ${({theme}) => theme.errorText};
`

const Login = ({ navigation }) => {

    const {spinner} = useContext(ProgressContext);
    const {dispatch} = useContext(UserContext);

    //이메일 상태 관리
    const [email, setEmail] = useState('');
    //비밀번호 상태 관리
    const [password, setPassword] = useState('');
    //에러메시지 상태 관리
    const [errorMessage, setErrorMessage] = useState(''); 

    //버튼의 활성화 상태를 관리하는 state
    const [disabled, setIsDisabled] = useState(true);

    const passwordRef = useRef();

    //email,password,errorMessage의 state값이 변할때마다
    //조건에 맞게 disabled의 state에 값을 세팅한다.
    useEffect(() => {
        //로그인 버튼은 이메일과 비밀번호가 입력되어있어야 하고
        //오류메시지가 없어야 활성화된다.
        setIsDisabled(!(email && password && !errorMessage));
    },[email,password,errorMessage]);





    const _handleEmailChange = (email) => {
        //입력된 이메일에 공백이 있다면 먼저 지운다.
        const changedEmail = removeWhitespce(email);
        setEmail(changedEmail);
        setErrorMessage(
            validateEmail(changedEmail) ? '' : 'Please verifay your email'
        );
    }

    const _handlePasswordChange = (password) => {
        setPassword(removeWhitespce(password));
    }

    //이메일과 비밀번호를 가지고 로그인버튼을 눌렀을 때
    //이메일 얼럿 띄우기
    const _handleLoginButtonPress = async () => {
        try {
            spinner.start(); //inProgress가 true로 변경
            const user = await login({email,password});
            //UserContext의 dispatch함수를 통해 user의 상태가 인증된 사용자 정보로 변경된다.
            console.log(user);
            dispatch(user);
            Alert.alert('Login Success',user.email);
        } catch (error) {
            Alert.alert('Login Error',error.message);
        } finally{
            spinner.stop();
        }

    };


    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{flexGrow:1}}
            extraScrollHeight={80}
            enableOnAndroid={true}
        >
            <Container>
                <Image url={images.logo} imageStyle = {{borderRadius : 40}}/>
                <Input
                    label="Email"
                    value={email}
                    onChangeText={_handleEmailChange}
                    onSubmitEditing={() => passwordRef.current.focus()}
                    placeholder={"Email"}
                    returnKeyType="next"
                />
                <Input
                    ref={passwordRef}
                    label="password"
                    value={password}
                    onChangeText={_handlePasswordChange}
                    onSubmitEditing={() => {}}
                    placeholder="password"
                    returnKeyType="done"
                    isPassword
                />
                <ErrorText>{errorMessage}</ErrorText>
                <Button 
                    title="Login" 
                    onPress={_handleLoginButtonPress}
                    disabled={disabled} />
                <Button
                    title="Sign up with email"
                    onPress={() => navigation.navigate('Signup')}
                    isFilled={false}
                />
            </Container>
        </KeyboardAwareScrollView>
    );
};
  
export default Login;