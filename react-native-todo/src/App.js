import { React, useState } from "react";
import { theme } from "./theme";
import { StatusBar } from "react-native";
import { styled, ThemeProvider } from "styled-components";
import Input from "./components/Input";
import IconButton from "./components/IconButton";
import { images } from "./image";
import Task from "./components/Task";
import { Dimensions } from "react-native";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  color: ${({ theme }) => theme.main};
  align-self: flex-start;
  margin: 20px;
`;

const List = styled.ScrollView`
    flex: 1;
    width: ${({ width }) => width - 40}px;
`

export default function App() {
  const [newTask, setNewTask] = useState('');

  const [tasks, setTasks] = useState({
    '1': { id: '1', text: 'Hanbit', completed: false },
    '2': { id: '2', text: 'React Native', completed: true },
    '3': { id: '3', text: 'Study', completed: false },
    '4': { id: '4', text: 'Game', completed: false },
  });

  const width = Dimensions.get('window').width;
  const ID = Date.now().toString();
  const _addTask = () => {
    const ID = Date.now().toString();
    const newTaskObject = { [ID]: { id: ID, text: newTask, completed: false }, }
    setNewTask('');
    setTasks({ ...tasks, ...newTaskObject })
  }

  const _deleteTask = id => {
    //상태 tasks를 복사하여 새로운 객체 currentTasks를 생성해.
    const currentTasks = Object.assign({}, tasks);
    //currentTasks에서 특정 작업을 삭제해.
    delete currentTasks[id];
    //업데이트된 객체를 설정하여 React 컴포넌트에서 작업이 삭제된 상태를 반영해.
    setTasks(currentTasks);
  };

  const _toggleTask = id => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[id]['completed'] = !currentTasks[id]['completed'];
    setTasks(currentTasks);
  }

  const _updateTask = item => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[item.id] = item;
    setTasks(currentTasks);
  }

  const _onBlur = () => {
    setNewTask('');
  }
  const _handleTextChange = text => {
    setNewTask(text);
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.background}
        />
        <Title>TODO List</Title>
        <Input
          placeholder="+ Add Task"
          value={newTask}
          onChangeText={_handleTextChange}
          onSubmitEditing={_addTask}
          onBlur={_onBlur} />

        <List width={width}>
          {Object.values(tasks)
            .reverse()
            .map(item => (
              <Task
                key={item.id}
                item={item}
                deleteTask={_deleteTask}
                toggleTask={_toggleTask}
                updateTask={_updateTask} />
            ))}
        </List>
      </Container>
    </ThemeProvider>
  )
}