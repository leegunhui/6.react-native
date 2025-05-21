import React from "react";
import { ScrollView, StyleSheet, View, Text, Button } from "react-native";
import MyButton from "./components/MyComponent";
// const App = () => {
//     return(
//         <View
//             style={{
//                 flex:1,
//                 backgroundColor:'#fff',
//                 alignItems: 'center',
//                 justifyContent: 'center'
//             }}
//         >
//             <Text style={{fontSize:30, marginBottom:10}}>Button Component</Text>
//             <Button title="button" onPress={()=> alert('Click!!')}/>
//         </View>
//     )
// }

// function App() {
//   return (
//     <ScrollView style={styles.container}>
//       {Array.from({ length: 20 }, (_, i) => (
//         <View key={i} style={styles.item}>
//           <Text>Item {i + 1}</Text>
//         </View>
//       ))}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   item: {
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     alignItems: 'center',
//   },
// });
const App = () => {
    return(
        <View
            style={{
                flex:1,
                backgroundColor:'#fff',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Text style={{fontSize:30, marginBottom:10}}>Button Component</Text>
            {/* <Button title="button" onPress={()=> alert('Click!!')}/> */}
            <MyButton />
        </View>
    )
}

export default App;
