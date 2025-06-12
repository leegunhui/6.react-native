import { View, StyleSheet, FlatList, Button, Pressable, Text } from 'react-native'
import PostItem from '../components/PostItem'
import FloatingButton from '../components/FloatingButton'
import posts from '../data/posts'
import { useEffect, useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'

const BoardScreen = ({ navigation }) => {
    console.log('navigation : ', navigation);

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://10.0.2.2:10000/api/posts'); // 에뮬레이터에서 localhost 접근 주소
            const json = await response.json();
            // 백엔드 응답 구조에 따라 맞춰서 처리
            // 예: ResponseDTO<PostDTO> 구조라면 json.data에 리스트가 있을 거예요
            setPosts(json.data || []);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
        setLoading(false);
    };

    useFocusEffect(
        useCallback(() => {
            fetchPosts();
        }, [])
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Pressable onPress={() => navigation.navigate('Detail', { post: item })}>
                        <PostItem post={item} />
                    </Pressable>
                )}
            />
            <FloatingButton onPress={() => navigation.navigate('Write')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    }
})

export default BoardScreen;