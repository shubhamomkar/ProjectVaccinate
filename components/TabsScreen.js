import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { userContext } from '../contexts/UserContext';
import LoginScreen from './LoginScreen';
import MembersScreen from './MemberScreen';
import SearchScreen from './SearchScreen';
import SettingsScreen from './SettingsScreen';

const Tabs = createBottomTabNavigator();
const TabsScreen = () => {
    const {user} = useContext(userContext);
    let val = user ? true : false;
    return (
            <Tabs.Navigator>
                <Tabs.Screen name='Search' component={SearchScreen} options={{ headerShown: false }}/>
                {val && <Tabs.Screen name='Members' component={MembersScreen} options={{ headerShown: false }}/>}
               {!val && <Tabs.Screen name='Login' component={LoginScreen} options={{ headerShown: false }}/>}
                <Tabs.Screen name='Settings' component={SettingsScreen} options={{headerShown: false}} />
            </Tabs.Navigator>
        // <View><Text>TabsScreen</Text></View>
    )

};

export default TabsScreen;