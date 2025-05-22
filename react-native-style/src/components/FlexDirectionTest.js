import React from 'react';
import { View, Text, Button } from 'react-native';
import { box_styles } from '../styles';

const FlexDirectionTest = () => {
    const [direction, setDirection] = React.useState('row');

    return (
        <View style={box_styles.container}>
            <Text style={box_styles.title}>flexDirection: {direction}</Text>
            <View style={[box_styles.boxContainer, { flexDirection: direction }]}>
                <View style={box_styles.box}><Text style={box_styles.boxText}>1</Text></View>
                <View style={box_styles.box}><Text style={box_styles.boxText}>2</Text></View>
                <View style={box_styles.box}><Text style={box_styles.boxText}>3</Text></View>
            </View>

            <View style={box_styles.buttons}>
                <Button title="Row" onPress={() => setDirection('row')} />
                <Button title="Column" onPress={() => setDirection('column')} />
                <Button title="Row Reverse" onPress={() => setDirection('row-reverse')} />
                <Button title="Column Reverse" onPress={() => setDirection('column-reverse')} />
            </View>
        </View>
    );
};

export default FlexDirectionTest;