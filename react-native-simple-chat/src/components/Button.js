import styled from "styled-components";

const TRANSPARENT = 'transparent'

const Container = styled.Pressable`
    background-color: ${({theme, isFilled}) => 
        isFilled ? theme.buttonBackground : TRANSPARENT};
    align-items : center;
    border-radius : 4px;
    width : 90%;
    padding : 10px;
    opacity : ${({disabled}) => (disabled? 0.5 : 1)}
`

const Title = styled.Text`
    height : 30px;
    line-height : 30px;
    font-size : 16px;
    color : ${({theme,isFilled}) =>
     isFilled ? theme.buttonTitle : theme.buttonUnFilledTitle};
`

const Button = ({
    containerStyle,
    title,
    onPress,
    isFilled = true,
    disabled = false,
}) => {
    return(
        <Container
            style={containerStyle}
            onPress={!disabled ? onPress : null}
            isFilled={isFilled}
            disabled={disabled}
        >
            <Title isFilled={isFilled}>{title}</Title>
        </Container>
    )
}

export default Button;