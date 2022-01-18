import React, { useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import ScreenBackground from '../common/ScreenBackground';
import { userContext } from '../contexts/UserContext';

const SettingsScreen = () => {
    const {setUser,user} = useContext(userContext);
    let val = user ? false : true;

    return (
        <ScreenBackground>
        <View>
                    <View style={styles.searchHeading}>
                        <Text style={styles.searchHeadingText}>
                            Settings
                        </Text>
                    </View>
                    <View style={{textAlign:'left',backgroundColor:'#a0522d',borderBottomColor:'#a0522d',borderBottomWidth:2,marginTop:5}}>
                        <Button title='Add New User' onPress={()=>setUser('')} disabled={val} style={{textAlign:'left'}} color='#a0522d'/>    
                    </View>
                    <View style={{textAlign:'left',backgroundColor:'#a0522d',borderBottomColor:'#a0522d',borderBottomWidth:2,marginTop:5}}>
                        <Button title='Log out' onPress={()=>setUser('')} disabled={val} style={{textAlign:'left'}} color='#a0522d'/>    
                    </View>
                    <View style={{textAlign:'left',backgroundColor:'#a0522d'}}>
                        <Button title='Log out' onPress={()=>setUser('')} disabled={val} style={{textAlign:'left'}} color='#a0522d'/>    
                    </View>
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