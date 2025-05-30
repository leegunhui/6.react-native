import React, {useState} from "react";
import styled from "styled-components";
import Button from "./Button";

const StyledText = styled.Text`
    font-size : 24px;
    margin: 10px;
`

const Counter = () => {
    const[count, setCount] = useState(0);
    return(
        <>
            <StyledText>
                Count: {count}
            </StyledText>
            <Button
                title="+"
                onPress={() => {
                    setCount(count +1);
                }}
            />
            <Button
                title="-"
                onPress={() => {
                    setCount(count -1);
                }}
            />
        </>
    )
}
export default Counter;