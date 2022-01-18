import React, { useContext, useEffect, useRef } from 'react';
import { Alert, Button, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { useState } from 'react/cjs/react.development';
import ScreenBackground from '../common/ScreenBackground';
import { userContext } from '../contexts/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


// const defaultUser = {id:'admin',username:'admin',password:'admin'};
const LoginScreen = () => {
    const {setUser,setAllUsers,allUsers} = useContext(userContext);
    const [logInfo , setLogInfo] = useState({username:'',password:''});
    const [ verifyCode , setVerifyCode] = useState(Math.floor(Math.random() * (999 - 100) + 100));
    const [ otp ,setOtp ] = useState();
    const pwdRef = useRef();
    const codeRef = useRef();

    const handleUsers = async() => {
        try{
            await AsyncStorage.getItem('users',(storageUsers)=>{
                if(storageUsers){
                    setAllUsers(allUsers.concat(storageUsers));
                }else{
                    AsyncStorage.setItem('users',JSON.stringify(allUsers));
                }
            })
        }
        catch(err){
            console.log('Restart App')
        }
    }

    const handleLogin = () => {
        console.log('allUsers',allUsers);
        if(otp==verifyCode){
            const userEntry = {password:logInfo.password,username:logInfo.username.toLowerCase()};
            var success = false;
            for(var user of allUsers){
                console.log('userEntry',userEntry,'user',user);
                if((userEntry.username==user.username) && (userEntry.password==user.password)){
                    success=user;
                }
            }
            if(success){
                Alert.alert(
                    'Login Successful',
                    `Hi ${userEntry.username}`,
                        [
                        {
                          text: "Okay",
                          onPress : () => {
                                            setOtp();
                                            setUser(success);
                          }
                        }
                        ]
                    )
            }else{
                Alert.alert(
                    'Login Failed',
                    `Credentials incorrect !`,
                        [
                            {
                            text: "Okay",
                            onPress: () => {
                                            setLogInfo({username:'',password:''});
                                            setOtp();
                                            }
                            }
                        ]
                    )

            }
        }else{
            Alert.alert(
                'Error',
                'Enter Correct Code',
                [
                    {
                      text: "Okay",
                      onPress: () => {
                          setOtp('');
                      }
                    }
                ]
            )
        }
    }

    useEffect(()=>{
        handleUsers();
        const intervalId = setInterval(() => {
            let code = Math.floor(Math.random() * (999 - 100) + 100);
            setVerifyCode(code);
        }, 20 * 1000);
        return () => clearInterval(intervalId);
    }, [allUsers])
    

    return (
        <ScreenBackground>
             <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                 <ScrollView>
            <View>
                <View style={styles.searchHeading}>
                    <Text style={styles.searchHeadingText}>
                            Login Page
                    </Text>
                </View>
                <View style={{height:'100%'}}>
                    <View style={styles.logRows}>
                        <Text style={styles.logText}>Username</Text>
                        <TextInput value={logInfo.username} placeholder='Type Here' onChangeText={(val)=>setLogInfo({...logInfo,username:val})} onSubmitEditing={()=>pwdRef.current.focus()} />
                    </View>
                    <View style={styles.logRows}>
                        <Text style={styles.logText}>Password</Text>
                        <TextInput value={logInfo.password} placeholder='Type Here' onChangeText={(val)=>setLogInfo({...logInfo,password:val})} ref={pwdRef} onSubmitEditing={()=>codeRef.current.focus()} secureTextEntry={true} />
                    </View>
                    <View style={styles.logRows}>
                    <Text style={[styles.logText,styles.verifyCode]}>Verification Code</Text>
                        <Text style={[styles.logText,styles.verifyCode]}>{verifyCode}</Text>
                    </View>
                    <View style={styles.logRows}>
                        <Text style={styles.logText}>Enter Verify Code</Text>
                        <TextInput value={otp} placeholder='Type Here' onChangeText={(val)=>setOtp(val)} ref={codeRef} keyboardType='numeric' />
                    </View>
                    <View style={styles.logRows}>
                        <Text style={styles.logText}>Login</Text>
                        <Button title='Log in' onPress={()=>handleLogin()} disabled={(logInfo.username && logInfo.password) ? false : true} color='brown' />
                    </View>
                    
                   
                </View>
        </View>
        </ScrollView>
        </TouchableWithoutFeedback>
        </ScreenBackground>
    )
};

export default LoginScreen;

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
    logRows:{
        padding:5,
        marginRight:10,
        backgroundColor:'#edeade',
        borderBottomWidth:4,
        borderRightWidth:4,
        borderColor:'#6082B6',
        borderBottomRightRadius:20,
        height:'16%'
    },
    logText:{
        fontSize:18,
        textDecorationLine:'underline'
    },
    verifyCode:{
        textAlign:'center',
        color:'brown',
        fontWeight:'500'
    }
})