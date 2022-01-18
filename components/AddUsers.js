import React, { useContext, useState } from 'react';
import { Alert, Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRef } from 'react/cjs/react.development';
import ScreenBackground from '../common/ScreenBackground';
import { userContext } from '../contexts/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddUsers = ({modalVisible,setModalVisible}) => {

    const {allUsers,setAllUsers} = useContext(userContext);

    const pwdRef = useRef();

    const [ form , setForm ] = useState({username:'',password:''});

    const addUser = async (userEntry) => {
        try {
            await AsyncStorage.setItem('users', JSON.stringify(allUsers.concat([userEntry])), () => {
                setAllUsers(allUsers.concat([userEntry]));
                setModalVisible(false);
                Alert.alert(
                    'User Added !',
                    'Check Users List',
                    [
                        {
                            text: "Okay",
                        }
                    ]

                );
            })
        } catch (err) {
            setForm({ username: '', password: '' });
            setModalVisible(false);
        }
    }

    const handleAddUser = () => {
        try {
            const userEntry = {id:String(new Date().valueOf()),password: form.password, username: form.username.toLowerCase() };
            var success = false;
            for (var user of allUsers) {
                if ((userEntry.username == user.username) && (userEntry.password == user.password)) {
                    success = user;
                }
            }
            if (success) {
                Alert.alert(
                    'User Already Exists',
                    `Try another username & password !`,
                    [
                        {
                            text: "Okay",
                        }
                    ]
                )

            } else {
                addUser(userEntry);
            }
        } catch (err) {
            Alert.alert(
                'System Error',
                `Restart the app or clear all !`,
                [
                    {
                        text: "Okay",
                        onPress: () => {
                            setForm({ username: '', password: '' });
                            setModalVisible(false);
                        }
                    }
                ]
            )
        }
    }


    return (
        <View>
            <Modal
                animationType='slide'
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal closed');
                    setModalVisible(!modalVisible);
                }}
            >
                <ScreenBackground>
                    <View style={[styles.modalView,styles.shadowCurve]}>
                        <View style={[styles.shadowCurve,{padding:5}]}>
                            <Text style={{fontSize:20,color:'brown',fontWeight:'500'}}>Add New User Info.</Text>
                        </View>
                        <View style={styles.formRow}>
                            <View style={styles.eachField}>
                                <Text>Username : </Text>
                            </View>
                            <View style={styles.eachField}>
                                <TextInput initialValue={form.username} placeholder='Type Here' onChangeText={(val)=>setForm({...form,username:val})} onSubmitEditing={()=>pwdRef.current.focus()} />
                            </View>
                        </View>
                        <View style={styles.formRow}>
                            <View style={styles.eachField}>
                                <Text>Password : </Text>
                            </View>
                            <View style={styles.eachField}>
                                <TextInput initialValue={form.password} placeholder='Type Here' onChangeText={(val)=>setForm({...form,password:val})} maxLength={10} ref={pwdRef}/>
                            </View>
                        </View>
                        <View style={[styles.formRow,{justifyContent:'space-around',marginTop:20}]}>
                            <Button title='Add' onPress={handleAddUser} color='#6082B6' disabled={!(form.password && form.username)} />
                            <Button title='Close' onPress={()=>setModalVisible(false)} color='#6082B6' />
                        </View>
                    </View>
                </ScreenBackground>
            </Modal>
        </View>

    )

};

export default AddUsers;

const styles = StyleSheet.create({
    modalView: {
        width: '60%',
        height: '50%',
        backgroundColor: 'gray',
        marginTop: '40%',
        marginLeft: '20%',
        padding: 10
    },
    shadowCurve:{
        borderBottomWidth:2,
        borderLeftWidth:2,
        borderRightWidth:2,
        borderColor:'white',
        borderRadius:10
    },
    formRow:{
        flexDirection:'row',
        margin:5
    },
    eachField:{
        justifyContent:'center',
        borderBottomWidth:1,
        borderColor:'white',
        flex:1
    }

})