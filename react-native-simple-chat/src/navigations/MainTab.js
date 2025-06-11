import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Profile, ChannelList } from "../screens"
import {MaterialIcons} from '@expo/vector-icons'
import {ThemeContext} from 'styled-components'
import { useContext } from "react";
//BottomTab네비게이터 객체 생성

const Tab = createBottomTabNavigator();

//TabBarIcon이라는 컴포넌트를 만들고 매개변수로 {focused,name}을 받는다.
//<MaterialIcons>를 반환한다 속성은 name, size는 26, color는 focused면 tabActiveColor, 아니면tabInactiveColor
//첫번째 스크린에 들어갈 아이콘의 name은 chat-bubble,chat-bubble-outline
//두번째 스크린에 들어갈 아이콘의 name은 person, person-outline
const TabBarIcon = ({focused,name}) => {
    const theme = useContext(ThemeContext);

    return(
        <MaterialIcons
            name={name}
            size={26}
            color={focused ? theme.tabActiveColor : theme.tabInactiveColor}
        />
    )
}


const MainTab = ({navigation, route}) => {

    //각 스크린에 대해 아이콘을 줘야한다.

    return(
        //Channel List, Profile 컴포넌트를 Screen으로 갖도록 설정
        <Tab.Navigator
            screenOptions={{
                // headerShown : false,
                headerTitleAlign : 'center',
            }}>
            <Tab.Screen 
                name="Channel List" 
                component={ChannelList}
                options={{
                    tabBarIcon : ({focused}) => (
                        // 컴포넌트 호출해서 정보 넘기기
                        <TabBarIcon 
                            focused={focused}
                            name={focused ? "chat-bubble" : "chat-bubble-outline"}
                        />
                    ),
                    headerRight : () => (
                        <MaterialIcons
                            name="add"
                            size={26}
                            style={{margin:10}}
                            onPress={() => navigation.navigate('Channel Creation')}
                        />
                    ),
                }}
                
            />
            <Tab.Screen 
                name="Profile" 
                component={Profile}
                options={{
                    tabBarIcon : ({focused}) => (
                        <TabBarIcon
                            focused={focused}
                            name={focused ? "person" : "person-outline"}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default MainTab;