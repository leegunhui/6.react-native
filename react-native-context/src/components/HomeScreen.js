import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import UserContext from '../contexts/UserContext';


const HomeScreen = () => {
  const { user, login, logout } = useContext(UserContext);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {user ? (
        <>
          <Text>Welcome, {user.name}!</Text>
          <Button title="Logout" onPress={logout} />
        </>
      ) : (
        <Button title="Login" onPress={login} />
      )}
    </View>
  );
};

export default HomeScreen;