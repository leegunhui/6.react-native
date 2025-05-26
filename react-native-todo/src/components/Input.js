import styled from "styled-components";
import { Dimensions } from "react-native";
import { useWindowDimensions } from "react-native";
import { useState } from "react";


const StyledInput = styled.TextInput.attrs(({theme}) =>({
    placeholderTextColor: theme.main,
}))`
    width: ${({width}) => width -40}px;
    heigth : 60px;
    margin : 3px 0;
    padding : 15px 20px;
    border-radius : 10px;
    background-color : ${({theme}) => theme.itemBackground};
    font-size: 25px;
    color : ${({theme}) => theme.text};
`

//Dimensions.get('window')
//앱이 실행될 때 화면 크기를 반환
//이후 회전하거나 화면 크기가 바뀌어도 자동으로 갱신되지 않는다.
//화면 크기가 바뀌면 이벤트 리스너를 추가해서 수동으로 처리해야 한다.

//useWindowDimensions()
//화면이 회전하거나 리사이즈 될 때 자동으로 다시 계산된다.
//반응형 UI를 만들 때 유용하다
//매변 최신 크기를 자동으로 반영해줌

//App 컴포넌트에서 Input컴포넌트에 placeholder를 전달하도록 작성
//placeholder의 색은 타이틀과 같은 색으로 설정
//너무 긴 항목을 입력하지 못하도록 50자로 제한한다.
const Input = ({
    placeholder,
    value,
    onChangeText,
    onSubmitEditing,
    onBlur
    }) => {
    //화면에 너비 구하기
    // const width = Dimensions.get('window').width;
    const {width} = useWindowDimensions();
    return(
        // TextInput 컴포넌트는 기본값으로 첫 글자가 대문자로 나타나고
        //오타 입력시 자동으로 수정하는 기능이 켜져있다.
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
    )
}

export default Input;