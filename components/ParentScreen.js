import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import HomeScreen from './HomeScreen';
import TabsScreen from './TabsScreen';

const Stack = createNativeStackNavigator();

const ParentScreen = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRoute='Home'>
                <Stack.Screen name='Home' component={HomeScreen} />
                <Stack.Screen name='Others' component={TabsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
};

export default ParentScreen;