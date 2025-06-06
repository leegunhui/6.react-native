import React from "react";
import styled from "styled-components";
import {Text, Button} from 'react-native'

const Container = styled.View`
    flex : 1;
    background-color : ${({ theme}) => theme.background};
`

const ChannelList = ({navigation}) => {
    return(
        <Container>
            <Text style={{ fontSize: 24}}>ChannelList</Text>
            <Button
                title="Channel Creation"
                onPress={()=> navigation.navigate('Channel Creation')}
            />
        </Container>
    )
}

export default ChannelList;