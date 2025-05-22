import React, { useState } from "react";
import { View, Text, Button } from 'react-native';
import { box_styles } from '../styles';

const AlignItemsTest = () => {
    const [alignment, setAlignment] = useState('flex-start');

    return (
        <View style={box_styles.container}>
            <Text style={box_styles.title}>AlignItems: {alignment}</Text>
            
            {/* 아래의 View에 감싸진 요소들을 alignItems로 수직 정렬을 설정 */}
            <View style={[box_styles.boxContainer, { alignItems: alignment }]}>
                <View style={box_styles.box}><Text>1</Text></View>
                <View style={box_styles.box}><Text>2</Text></View>
                <View style={box_styles.box}><Text>3</Text></View>
            </View>
            
            <View style={box_styles.buttons}>
                <Button title="Flex Start" onPress={() => setAlignment('flex-start')} />
                <Button title="Center" onPress={() => setAlignment('center')} />
                <Button title="Flex End" onPress={() => setAlignment('flex-end')} />
                <Button title="Stretch" onPress={() => setAlignment('stretch')} />
            </View>
        </View>
    );
}

export default AlignItemsTest;