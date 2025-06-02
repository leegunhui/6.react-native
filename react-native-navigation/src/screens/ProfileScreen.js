import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ProfileScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default ProfileScreen;