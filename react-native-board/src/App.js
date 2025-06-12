import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./navigation/RootStack";
import { StatusBar } from "react-native"

export default function App(){
    return(
        <NavigationContainer>
            <StatusBar barStyle = 'light-content'/>
            <RootStack />
        </NavigationContainer>
    )
}