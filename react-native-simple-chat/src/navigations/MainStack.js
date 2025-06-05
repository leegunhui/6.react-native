import React,{useContext} from 'react'
import {ThemeContext} from 'styled-components'
import { createStackNavigator } from '@react-navigation/stack'
import { Channel, ChannelCreation } from '../screens'
import MainTab from './MainTab'

const Stack = createStackNavigator();

const MainStack = () => {
    const theme = useContext(ThemeContext);

    return(
        <Stack.Navigator
            initialRouteName="Main"
            screenOptions={{
                headerTitleAlign: 'center',
                headerTintColor : theme.headerTintColor,
                cardStyle : {backgroundColor: theme.backgroundColor},
                headerBackTitleVisible: false,
            }}
        >
            <Stack.Screen 
                name="Main" 
                component={MainTab}
                options={{
                    headerShown: true, // false면헤더를 숨긴다.
                }}/>
            <Stack.Screen name="Channel Creation" component={ChannelCreation} />
            <Stack.Screen name="Channel" component={Channel} />
        </Stack.Navigator>
    )
}

export default MainStack;