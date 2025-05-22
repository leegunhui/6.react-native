import React, {useState} from "react";
import { View, Text } from "react-native";
import MyButton from "./MyComponent";

const Counter = () => {
    const [count, setCount] = useState(0);
    const [double, setDouble] = useState(0);

    return(
        <View style={{alignItems: 'center'}}>
            <Text style={{ fontSize: 30, margin: 10}}>{count}</Text>
            <Text style={{ fontSize: 30, margin: 10}}>{double}</Text>
            <MyButton title="+1" onPress={() => {setCount(count + 1); setDouble(double+2);}}/>
            <MyButton title="-1" onPress={() => {setCount(count - 1); setDouble(double-2)}}/>
        </View>
    )
}

export default Counter;