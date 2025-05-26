import styled from "styled-components";
import IconButton from "./IconButton";
import { images } from "../Image";
import { useState } from "react";
import Input from "./Input";

const Container = styled.View`
    flex-direction : row;
    align-items : center;
    background-color: ${({theme}) => theme.itemBackground};
    border-radius : 10px;
    padding : 5px;
    margin : 3px 0;
`

const Contents = styled.Text`
    flex : 1;
    font-size : 24px;
    color:${({theme,completed}) =>(completed? theme.done :  theme.text)};
    text-decoration-line:${({completed}) => completed ? 'line-through':'none'}
`

const Task = ({item,deleteTask,toggleTask,updateTask}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text,setText] = useState(item.text);

    const _handleUpdateButtonPress = () => {
        setIsEditing(true);
    }

    const _onSubmitEditing = () => {
        if(isEditing){
            const editedTask = Object.assign({}, item, {text});
            setIsEditing(false);
            updateTask(editedTask);
        }
    }

    return isEditing ?(
        <Input
            value={text}
            onChangeText={text => setText(text)}
            onSubmitEditing={_onSubmitEditing}
        />) :(
        <Container>
            {/* 넘어온 item의 completed여부에 따라
            체크된 체크박스 또는 체크가 안된 체크박스 보여주기 */}
            <IconButton 
                type={item.completed ? images.complete : images.uncomplete}
                id={item.id}
                onPressOut={toggleTask}
            />
            <Contents completed={item.completed}>{item.text}</Contents>

            {/* 완료상태면 아이콘이 안보이게 수정하기 */}
            {item.completed || <IconButton type={images.update} onPressOut={_handleUpdateButtonPress} />}

            <IconButton 
                type={images.delete} 
                id={item.id} 
                onPressOut={deleteTask} />
        </Container>
    )
}

export default Task;