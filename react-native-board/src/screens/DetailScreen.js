import { View, Text, StyleSheet } from 'react-native';

const DetailScreen = ({ route }) => {
    const { post } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.meta}>
                작성자:  {post.author} · {post.time} · 조회 {post.views}
            </Text>
            <Text style={styles.description}>{post.description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    meta: {
        fontSize: 12,
        color: '#aaa',
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        color: '#fff',
        lineHeight: 22,
    },
});

export default DetailScreen;
