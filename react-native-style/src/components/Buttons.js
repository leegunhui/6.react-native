import styled from 'styled-components/native'
import { Pressable } from 'react-native'

//백틱(``)안에서 props에 접근할 수 있다는 장점을 이용해
//props의 값에 따라 스타일변경할수도 있다.
const ButtonContainer = styled.Pressable`
    background-color: ${props =>
    props.title === 'hanbit' ? props.theme.blue : props.theme.purple};
    padding : 14px 24px;
    border-radius : 8px;
    align-items : center;
    margin: 10px;
`

const Title = styled.Text`
    color : #fff;
    font-size : 20px;
    font-weight: 600;
`

const MyButton = (props) => {
    return(
        <ButtonContainer title={props.title}>
            <Title>{props.title}</Title>
        </ButtonContainer>
    )
}

export default MyButton;