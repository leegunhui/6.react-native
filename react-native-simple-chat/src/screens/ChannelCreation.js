//채널 화면으로 이동할 수 있는 버튼을 가진 간단한 채널 생성 화면
import styled from "styled-components";
import {useState, useRef, useEffect, useContext, use} from 'react'
import { Input,Button } from "../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { createChannel } from "../utils/firebase";
import { Alert } from "react-native";
import { ProgressContext } from "../contexts";

const Container = styled.View`
    flex : 1;
    background-color: ${({theme}) => theme.background};
    justify-content : center;
    align-items : center;
    padding : 0 20px;
`
//에러 메시지를 표시할 텍스트
const ErrorText = styled.Text`
    align-items : flex- start;
    width : 90%;
    height : 20px;
    margin-bottom : 10px;
    line-height : 20px;
    color : ${({theme}) => theme.errorText};
`

const ChannelCreation = ({navigation}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [disabled, setDisabled] = useState(true);

    const {spinner} = useContext(ProgressContext);

    const descriptionRef = useRef();

    const _handleTitleChange = (title) => {
        setTitle(title);
        setErrorMessage(title.trim() ? '' : 'Please enter the title')
    }

    //작성된 제목을 감지, 에러메시지가 없을 때 버튼 클릭 가능
    useEffect(() => {
        setDisabled(!(title && !errorMessage));
    },[title,description,errorMessage])




    //제목과 설명(옵션)을 입력하고 생성버튼을 눌렀을 때
    //firestore에 채널을 생성하기
    const _handleCreateButtonPress = async () => {
       try {
        spinner.start();
        const id = await createChannel({title, description});
        //생성된 채널 화면으로 이동하며, id와 title정보를 함께 전달
        //replace를 사용해 현재 스택을 교체
        navigation.replace('Channel', {id, title});
       } catch (error) {
        Alert.alert('Creation Error',error.message);
       } finally{
        spinner.stop();
       }
    }

    return(
        <Container>
            {/* 채팅방 제목을 작성할 Input
            placeholder : Title
            returnKeyType : next
            최대길이 : 20
            완료버튼 누르면 description작성란으로 포커스 이동하기 */}
            <Input
                label="Title"
                value={title}
                onChangeText = {_handleTitleChange}
                onSubmitEditing={() => {
                    setTitle(title.trim());
                    descriptionRef.current.focus();
                }}
                onBlur = {() => setTitle(title.trim())}
                placeholder="Title"
                returnKeyType="next"
                maxLength={20}
            />
            {/* 채팅방 설명을 작성할 Input */}
            <Input
                ref={descriptionRef}
                label="Description"
                value={description}
                onChangeText={(text) => setDescription(text)}
                onSubmitEditing={() => {
                    setDescription(description.trim());
                    _handleCreateButtonPress();
                }}
                onBlur={() => setDescription(description.trim())}
                placeholder="Description"
                returnKeyType="done"
                maxLength={40}
            />

            {/* 에러메시지 표시 영역(제목이 입력되지 않으면 Pleas enter the title) */}
            <ErrorText>{errorMessage}</ErrorText>
            {/* 채널 생성 버튼 (비활성화 여부는 disabled state로 제어)
            버튼을 눌렀을 때 콘솔에 제목과 설명을 띄워주세요 */}
            <Button
                title="Create"
                onPress={_handleCreateButtonPress}
                disabled={disabled}
            />
        </Container>
    )
}

export default ChannelCreation;