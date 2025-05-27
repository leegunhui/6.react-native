import { View,Button } from "react-native";

//state는 "데이터"이고, setState는 데이터를 바꾸는 "함수"이다.
//자식 컴포넌트가 setState를 props로 전달받아서 호출하면
//그 함수는 부모 컴포넌트에 있는 state를 직접 변경하게 된다.
const Child = ({changeCount}) => {
    return (
        <View>
            <Button 
                title="+1"
                onPress={() => changeCount(prev => prev+1)}
            />
        </View>
    )
}

export default Child;