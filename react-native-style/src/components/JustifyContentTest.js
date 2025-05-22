import React, { useState } from "react";
import { View, Text, Button } from 'react-native';
import { box_styles } from '../styles';

const JustifyContentTest = () => {
    const [justifyContent, setJustifyContent] = useState('flex-start');

    return (
        <View style={box_styles.container}>
            <Text style={box_styles.title}>JustifyContent: {justifyContent}</Text>
            
            {/* 아래의 View에 감싸진 요소들을 justifyContent로 수평 정렬을 설정 */}
            <View style={[box_styles.boxContainer, { justifyContent: justifyContent }]}>
                <View style={box_styles.box}><Text>1</Text></View>
                <View style={box_styles.box}><Text>2</Text></View>
                <View style={box_styles.box}><Text>3</Text></View>
            </View>
            
            <View style={box_styles.buttons}>
                <Button title="Flex Start" onPress={() => setJustifyContent('flex-start')} />
                <Button title="Center" onPress={() => setJustifyContent('center')} />
                <Button title="Flex End" onPress={() => setJustifyContent('flex-end')} />
                <Button title="Space Between" onPress={() => setJustifyContent('space-between')} />
                <Button title="Space Around" onPress={() => setJustifyContent('space-around')} />
                <Button title="Space Evenly" onPress={() => setJustifyContent('space-evenly')} />
            </View>
        </View>
    );
}

export default JustifyContentTest;