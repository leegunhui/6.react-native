import { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Pressable, Alert } from 'react-native'

const WriteScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const onSubmit = async () => {
        if (!title.trim() || !description.trim()) {
            Alert.alert('입력 오류', '제목과 내용을 모두 입력하세요');
            return;
        }

        try {
            const response = await fetch('http://10.0.2.2:10000/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description }),
            });

            const json = await response.json();

            if (response.ok) {
                // 성공하면 이전 화면으로 돌아가기
                navigation.goBack();
            } else {
                Alert.alert('등록 실패', json.message || '오류가 발생했습니다');
            }
        } catch (error) {
            Alert.alert('네트워크 오류', '서버에 연결할 수 없습니다');
        }
    };

    useEffect(() => {
        navigation.setParams({ onSubmit });
    }, [title, description]);
    
    return (
        <View style={styles.container}>
            <TextInput
                placeholder="제목"
                placeholderTextColor="#fff"
                style={styles.titleInput}
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                placeholder="내용을 입력하세요"
                placeholderTextColor="#666"
                style={styles.descriptionInput}
                value={description}
                onChangeText={setDescription}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    titleInput: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        marginBottom: 12,
        paddingVertical: 8,
    },
    descriptionInput: {
        flex: 1,
        fontSize: 16,
        color: '#fff',
        textAlignVertical: 'top',
    }
});
export default WriteScreen;