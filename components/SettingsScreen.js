import React, { useContext, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import ScreenBackground from '../common/ScreenBackground';
import { userContext } from '../contexts/UserContext';
import AddUsers from './AddUsers';
import AsyncStorage from '@react-native-async-storage/async-storage';


const defaultUser = {id:'admin',username:'admin',password:'admin'};
const SettingsScreen = () => {
    const {setUser,user,setAllUsers} = useContext(userContext);
    const [modalVisible, setModalVisible] = useState(false);
    let val = user ? false : true;

    const clearAllUsers = async() => {
        try{
            await AsyncStorage.setItem('users', JSON.stringify([defaultUser]), () => {
                        setAllUsers([defaultUser]);
                        Alert.alert(
                            'Clear Successful !',
                            'All Users Cleared',
                            [
                                {
                                    text: "Okay",
                                }
                            ]
        
                        );
                })
            }catch(err){
                Alert.alert(
                    'Clear Failed !',
                    'Try Again Later',
                    [
                        {
                            text: "Okay",
                        }
                    ]

                );
            }
    }

    return (
        <ScreenBackground>
        <View>
                    <View style={styles.searchHeading}>
                        <Text style={styles.searchHeadingText}>
                            Settings
                        </Text>
                    </View>
                    <View style={{textAlign:'left',backgroundColor:'#a0522d',borderBottomColor:'#a0522d',borderBottomWidth:2,marginTop:5}}>
                        <Button title='Add New User' onPress={()=>setModalVisible(true)} disabled={user ? false : true} style={{textAlign:'left'}} color='#a0522d'/>    
                    </View>
                    <View style={{textAlign:'left',backgroundColor:'#a0522d',borderBottomColor:'#a0522d',borderBottomWidth:2,marginTop:5}}>
                        <Button title='Clear All Users' onPress={clearAllUsers} disabled={!(user?.username=='admin')} style={{textAlign:'left'}} color='#a0522d'/>    
                    </View>
                    <View style={{textAlign:'left',backgroundColor:'#a0522d',borderBottomColor:'#a0522d',borderBottomWidth:2,marginTop:5}}>
                        <Button title='Add' onPress={()=>setUser('')} disabled={val} style={{textAlign:'left'}} color='#a0522d'/>    
                    </View>
                    <View style={{textAlign:'left',backgroundColor:'#a0522d'}}>
                        <Button title='Log out' onPress={()=>setUser('')} disabled={val} style={{textAlign:'left'}} color='#a0522d'/>    
                    </View>
                    <AddUsers modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </View>
        </ScreenBackground>
    )
};

export default SettingsScreen;

const styles = StyleSheet.create({
    searchHeading: {
        margin: 5,
        backgroundColor: 'gray',
        alignItems: 'center'
    },
    searchHeadingText: {
        fontSize: 20,
        color: 'brown',
        fontWeight: '500',
        textDecorationLine: 'underline',
        textDecorationColor: 'yellow'
    }
})