import { Pressable } from "react-native";
import styled from "styled-components";
import { images } from "../Image";

const Icon = styled.Image`
    tint-color: ${({theme}) => theme.text};
    width: 30px;
    height: 30px;
    margin : 10px;
`


const IconButton = ({type,onPressOut, id}) => {
    const _onPressOut = () => {
        onPressOut(id);
    }
    return(
        <Pressable onPressOut={_onPressOut}>
            <Icon source={type} />
        </Pressable>
    )
}

export default IconButton;