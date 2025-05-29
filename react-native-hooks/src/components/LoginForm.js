import { useReducer } from "react";
import {View, Text, TextInput, Button, StyleSheet} from 'react-native'
//로그인폼을 만들어야 하는데 다음과 같은 상태가 필요하다
//email(문자열)
//password(문자열)
//errorMessage(문자열)
//isSubmitting(논리형)
//isLoggedIn(논리형)
//상태가 많아지게 되면 관리가 복잡해지고, 로직이 흩어지게된다.

const initialState = {
    email:'',
    password:'',
    isSubmitting : false,
    isLoggedIn : false,
    errorMessage : '',
}




const LoginForm = () => {
    const [state, dispatch] = useReducer(loginReducer, initialValue);

        const handleLogin = () => {
        dispatch({type: 'LOGIN_START'});

        setTimeout(() => {
            if(state.email === 'test@example.com' && state.password === '1234'){
                dispatch({type:'LOGIN_SUCCESS'});
            } else {
                dispatch({type:'LOGIN_FAILURE', payload: '이메일 또는 비밀번호가 틀렸습니다.'})
            }
        },1000)
    }0

    return(
        <View style={styles.container}>
            {/* 
            아이디 : test@example.com, 비밀번호 '1234'
            isLoggedIn이 true면 로그인 성공! 문자열 출력하기 
            false면 이메일 입력란, 비밀번호 입력란, 에러메시지, 로그인 버튼*/}
            {state.isLoggedIn ? (
                <Text style={styles.successText}>로그인 성공!</Text>
            ) : (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="이메일"
                        value={state.email}
                        onChangeText={(text) => dispatch({type:'SET_EMAIL', payload: text})}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="비밀번호"
                        value={state.password}
                        onChangeText={(text) => dispatch({type:'SET_PASSWORD', payload: text})}
                    />
                    {state.errorMessage && <Text style={styles.errorText}>{state.errorMessage}</Text>}
                    <Button title={state.isSubmitting ? '로그인중...':'로그인'} onPress={handleLogin}/>
                </>
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        padding : 20,
        marginTop : 100,
    },
    input:{
        borderWidth: 1,
        borderColor: '#aaa',
        padding : 10,
        marginBottom : 10,
        borderRadius : 5,
    },
    errorText:{
        color:'red',
        marginBottom:10,
    },
    successText:{
        fontSize: 18,
        color:'green',
    }
})