import React, { useContext } from 'react';
import { Button, Text, View } from 'react-native';
import ScreenBackground from '../common/ScreenBackground';
import { userContext } from '../contexts/UserContext';

const LoginScreen = () => {
    const {setUser} = useContext(userContext);
    return (
        <ScreenBackground>
        <View><Text>LoginScreen</Text>
        <Button title='Login' onPress={()=>setUser('User')} />
        <Button title='Logout' onPress={()=>setUser('')} />
        </View>
        </ScreenBackground>
    )
};

export default LoginScreen;