import React from 'react'
import styled from 'styled-components'
import User from './components/User';
import UserContext from './contexts/User';
// import { UserProvider } from './contexts/User';
import Input from './components/Input';
import ThemedComponent from './components/ThemeComponent';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserProvider } from './contexts/UserContext';
import HomeScreen from './components/HomeScreen';
import CartScreen from './components/CarScreen';
import { CartProvider } from './contexts/CarContext';

const Container = styled.View`
    flex : 1;
    background-color : #ffffff;
    justify-content : center;
    align-items : center;
`;

const App = () => {
    return( 
    //  <UserProvider>
    // <Container>
    //     <User />
    //     <Input />
    // </Container>
    //  </UserProvider>

    // <ThemeProvider>
    //     <ThemedComponent />
    // </ThemeProvider>

    // <UserProvider>
    //   <HomeScreen />
    // </UserProvider>

    <CartProvider>
        <CartScreen />
    </CartProvider>

    )
}

export default App;