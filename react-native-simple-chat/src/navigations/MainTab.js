import React,{useContext, useEffect} from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Profile, ChannelList } from "../screens";
import {MaterialIcons} from '@expo/vector-icons'
import { ThemeContext } from "styled-components";


const Tab = createBottomTabNavigator();

const TabBarIcon = ({ focused, name}) => {
    const theme = useContext(ThemeContext);
    return(
        <MaterialIcons
            name={name}
            size={26}
            color={focused ? theme.tabActiveColor : theme.tabInactiveColor}
        />
    )
}

const MainTab = ({navigation,route}) => {
    const theme = useContext(ThemeContext);

     useEffect(() => {
        const titles = route.state?.routeNames || ['Channels'];
        const index = route.state?.index || 0;
        navigation.setOptions({
            headerTitle:titles[index],
        });
    },[route])

    return(
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.tabActiveColor,
                tabInactiveColor: theme.tabInactiveColor,
                headerTitleAlign: 'center',
            }}>
            <Tab.Screen 
                name="Channel List" 
                component={ChannelList} 
                options={{
                    tabBarIcon: ({focused}) =>
                        TabBarIcon({
                            focused,
                            name: focused ? 'chat-bubble' : 'chat-bubble-outline',
                        }),
                }}
            />
            <Tab.Screen 
                name="Profile" 
                component={Profile}
                options={{
                    tabBarIcon: ({focused}) =>
                        TabBarIcon({
                            focused,
                            name: focused ? 'person' : 'person-outline',
                        }),
                }}
            />
        </Tab.Navigator>
    )
}

export default MainTab;