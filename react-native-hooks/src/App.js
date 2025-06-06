import React from 'react'
import styled from 'styled-components'
import Counter from './components/Counter'
import Form from './components/Form'
import Button from './components/Button'
import { useState } from 'react'
import Length from './components/Length'
import Dog from './components/Dog'
import ChangeTheme from './components/ChangeTheme'
const Container = styled.View`
    flex:1;
    background-color: #fff;
    justify-content : center;
    align-items: center;
`


const App = () => {
    const [isVisible, setIsVisible] = useState(true);
  
    return (
      <Container>
        {/* <Counter /> */}
        {/* <Button
          title={isVisible ? 'Hide' : 'Show'}
          onPress={() => setIsVisible(prev => !prev)}
        />
        {isVisible && <Form />} */}
    
        {/* <Length /> */}
        {/* <Dog /> */}
        <ChangeTheme/>
      </Container>
    );
  };

export default App;