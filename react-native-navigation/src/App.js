import React from 'react';
import styled from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './navigation/Stack';
import TabNavigation from './navigation/Tab';
import DrawerNavigation from './navigation/Drawer';

const Container = styled.View`
    flex : 1;
    background-color : #ffffff;
    justify-content : center;
    align-items : center;
`

const App = () => {
  return (
    <NavigationContainer>
        {/* <StackNavigation /> */}
        {/* <TabNavigation /> */}
        <DrawerNavigation/>
    </NavigationContainer>
  );
};


export default App;