import {View,Text, StyleSheet} from 'react-native'

const PostItem = ({post}) => {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.meta}>
                {post.author} {post.time} 조회 {post.views}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        padding : 12,
        borderBottomWidth : 0.5,
        borderBottomColor : '#333',
        backgroundColor : '#121212',
    },
    title : {
        color: '#fff',
        fontWeight : 'bold',
        fontSize : 15,
        marginBottom : 4,
    },
    meta : {
        color: '#aaa',
        fontSize : 12,
    }
})

export default PostItem;