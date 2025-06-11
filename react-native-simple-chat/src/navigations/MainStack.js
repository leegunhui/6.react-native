import { createStackNavigator } from "@react-navigation/stack"
import { Channel, ChannelCreation } from "../screens"
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import MainTab from "./MainTab";

//Stack객체 만들기
const Stack = createStackNavigator();

const MainStack = () => {

    const theme = useContext(ThemeContext);

    //ChannelCreation
    //Channel
    //두개의 컴포넌트를 Screen으로 갖는 Stack네비게이션만들기
    return(
    <Stack.Navigator
        screenOptions={{
            headerTitleAlign:'center',
            headerTintColor : theme.headerTintColor,
            cardStyle : {backgroundColor : theme.backgroundColor},
            headerBackTitleVisible :false,
        }}>
        {/* 바텀탭네비게이터 컴포넌트를 Stack의 Screen으로 넣었다. */}
        <Stack.Screen 
            name="Main" 
            component={MainTab}
            options={{
                headerShown:false,
            }}
            />
        <Stack.Screen name="Channel Creation" component={ChannelCreation}/>
        <Stack.Screen name="Channel" component={Channel}/>
    </Stack.Navigator>
)}

export default MainStack;