import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import useToggle from "../hooks/useToggle";

const ChangeTheme = () => {
    const [isOn, toggle] = useToggle(false);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>현재 상태: {isOn ? "On" : "Off"}</Text>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: isOn ? "green" : "gray" }]}
                onPress={toggle}
            >
                <Text style={styles.buttonText}>상태 변경</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ChangeTheme;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
    },
});
