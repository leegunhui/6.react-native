import { createStackNavigator } from "@react-navigation/stack";
import BoardScreen from "../screens/BoardScreen";
import WriteScreen from "../screens/WriteScreen";
import { View, Pressable, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import DetailScreen from "../screens/DetailScreen";

const Stack = createStackNavigator();

const RootStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#505050' },
                headerTintColor: 'white',
                headerTitleAlign: 'center',
                headerTitleStyle: { color: '#fff', fontSize: 24 }
            }}
        >
            <Stack.Screen
                name="Board"
                component={BoardScreen}
                options={{
                    title: "네이버 카페",
                    headerRight: () => (
                        <View style={{ flexDirection: 'row', gap: 16, marginRight: 16 }}>
                            <Pressable onPress={() => alert('검색 기능 준비중')}>
                                <Ionicons name="search" size={24} color="white" />
                            </Pressable>
                            <Pressable onPress={() => alert('메뉴 기능 준비중')}>
                                <Ionicons name="menu" size={24} color="white" />
                            </Pressable>
                        </View>
                    )
                }}
            />
            <Stack.Screen
                name="Write"
                component={WriteScreen}
                options={({ navigation,route }) => ({
                    headerTitle: "글쓰기",
                    headerLeft: () => (
                        <Pressable onPress={() => navigation.goBack()}>
                            <Ionicons name="close" size={28} color="white" style={{ marginLeft: 12 }} />
                        </Pressable>
                    ),
                    headerRight: () => {
                        const onSubmit = route.params?.onSubmit;
                        return (
                            <Pressable
                                style={{ marginRight: 12 }}
                                onPress={() => {
                                    if (onSubmit) {
                                        onSubmit();
                                    } else {
                                        alert('등록버튼 준비중');
                                    }
                                }}
                            >
                                <View style={{
                                    backgroundColor: '#2ecc71',
                                    paddingHorizontal: 14,
                                    paddingVertical: 6,
                                    borderRadius: 6,
                                }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>등록</Text>
                                </View>
                            </Pressable>
                        );
                    }
                })}
            />
            <Stack.Screen
                name="Detail"
                component={DetailScreen}
                options={{ headerTitle: "게시글 상세보기" }}
            />
        </Stack.Navigator>
    )
}

export default RootStack;