import {useState, useMemo} from 'react'
import {View, Text, Button} from 'react-native';

const AverageCalculator = () => {
    const [numbers, setNumbers ] = useState([10,20,30,40,50]);
    const [extra, setExtra] = useState(0);

    const average = useMemo(() => {
        console.log("Calculating average...");
        const sum = numbers.reduce((acc,curr) => acc + curr, 0);
        return sum/numbers.length;
    },[numbers]);

    return(
        <View style={{padding:20}}>
            <Text style={{fontSize: 18}}>Average : {average} </Text>
            {/* 배열에 랜덤 숫자를 추가하는 버튼 */}
            <Button title="Add Number" onPress={() => setNumbers([...numbers,Math.floor(Math.random() * 100)])}/>
            {/* 평균과는 상관없는 상태 변경 버튼 */}
            <Button title="Change Extra State" onPress={() => setExtra(extra + 1)}/>
            
            <Text style={{fontSize: 18, marginTop: 10}}>
                Extra Value : {extra}
            </Text>
        </View>
    )
}
export default AverageCalculator;