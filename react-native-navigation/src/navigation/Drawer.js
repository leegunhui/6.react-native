import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {

    return (
        <Drawer.Navigator
            screenOptions={{
                drawerStyle: { backgroundColor: '#e6e6e6', width: 240 },
                drawerLabelStyle: { fontSize: 18 },
                drawerActiveTintColor: '#4CAF50',
                drawerInactiveTintColor: '#757575',
                borderWidth: 3,
                borderColor: '#ccc',
                // headerShown: false,
            }}
        >
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigation;