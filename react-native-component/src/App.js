import {View, Text,Button,ScrollView} from 'react-native'
import MyButton from './components/MyComponent';
import Counter from './components/Counter';
import EventButton from './components/EventButton';
import EventInput from './components/EventInput';
const App = () => {
    return(
        // <View
        //     style={{
        //         flex:1,
        //         backgroundColor:'#fff',
        //         alignItems:'center',
        //         justifyContent: 'center'
        //     }}
        // >
        //     <Text style={{fontSize:30, marginBottom:10}}> Button Component</Text>
        //     <Button 
        //         title="button"
        //         color="#000"
        //         onPress={() => alert('Click')}/>
        // </View>
        <View style={{
            flex:1,
            backgroundColor: '#fff',
            alignItems : 'center',
            justifyContent : 'center',
        }}>
            {/* <ScrollView>
               Array.from({length:20}) : 길이 20의 배열을 만든다. 인덱스 i를 기준으로 0 ~19까지 반복 
                왜 _로 쓰는가 : 변수 이름을 _로 쓰는것은 이 값은 사용하지 않겠다는 의미
                {Array.from({length: 20}, (_,i) => (
                    <View key={i}>
                        <Text>Item {i+1}</Text>
                    </View>
                ))}
            </ScrollView> */}
            {/* <MyButton title="button"/> */}
            {/* 컴포넌트 태그 사이에 전달된 값은
            자식 컴포넌트의 props에서 children으로 전달된다. */}
            {/* <MyButton title="button">
                Children Props
            </MyButton>
            <MyButton /> */}
            {/* <Counter /> */}
            {/* <EventButton /> */}
            <EventInput />
        </View>
    )
}

export default App;