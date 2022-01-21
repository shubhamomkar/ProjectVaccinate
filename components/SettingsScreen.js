import React, { useContext, useState } from 'react';
import { Alert, Button, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import ScreenBackground from '../common/ScreenBackground';
import { userContext } from '../contexts/UserContext';
import AddUsers from './AddUsers';
import AsyncStorage from '@react-native-async-storage/async-storage';


const defaultUser = {id:'admin',username:'admin',password:'admin'};
const SettingsScreen = () => {
    const {setUser,user,setAllUsers,allUsers} = useContext(userContext);
    const [modalVisible, setModalVisible] = useState(false);
    let val = user ? false : true;

    const deleteUser = async(id) => {
        const newAllUsers = allUsers.filter((user)=>user.id!=id);
        await AsyncStorage.setItem('users',JSON.stringify(newAllUsers),()=>{
            try{
                setAllUsers(newAllUsers);
            }catch(err){
                Alert.alert('Deletion failed','Please Try Again Later',[
                    {
                        text:'Okay'
                    }
                ])
            }
        })
    }

    const renderAllUsers = ({item,index}) => {
        return (
                <View style={styles.memberView}>
                    <View>
                        <Text style={{fontSize:18}}>{index+1}. {item.username.toUpperCase()} </Text>
                        <Text>  ID - {item.id}</Text>
                    </View>
                    <View>
                        <Button title='Delete User' onPress={()=>deleteUser(item.id)} color='#6082B6' disabled={item.id=='admin'} />
                    </View>

                </View>
        )

    }

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
                        <Button title='Add New User' onPress={()=>setModalVisible(true)} disabled={user ? false : true} style={{textAlign:'left'}} color='gray'/>    
                    </View>
                    <View style={{textAlign:'left',backgroundColor:'#a0522d',borderBottomColor:'#a0522d',borderBottomWidth:2,marginTop:5}}>
                        <Button title='Clear All Users' onPress={clearAllUsers} disabled={!(user?.username=='admin')} style={{textAlign:'left'}} color='gray'/>    
                    </View>
                    <View style={{textAlign:'left',backgroundColor:'#a0522d',borderBottomColor:'#a0522d',borderBottomWidth:2,marginTop:5}}>
                        <Button title='Log out' onPress={()=>setUser('')} disabled={val} style={{textAlign:'left'}} color='gray'/>    
                    </View>
                    <View>
                        <Text style={{fontSize:18,fontWeight:'500',color:'brown',margin:5}}>App Users</Text>
                    </View>
                    <View >
                        <FlatList
                            data={allUsers}
                            keyExtractor={item=>item.id}
                            renderItem={renderAllUsers}
                        />
                    </View>
                    <View>
                        <Text>Logged In User : {user ? user.username.toUpperCase() : 'N.A.'} </Text>
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
    },
    memberView:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:10,
        borderBottomWidth:1,
        borderBottomColor:'#b2beb5',
        borderRightWidth:2,
        borderRightColor:'#b2beb1',
        borderBottomRightRadius:5,
        padding:5
    }
})