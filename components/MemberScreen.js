import React from 'react';
import { Text, View, Keyboard, StyleSheet, Button, FlatList, Alert } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import ScreenBackground from '../common/ScreenBackground';

const MembersScreen = () => {

    const sampleMembers = [{id:1,name:'John William',age:20,gender:'male'},{id:2,name:'Sara William',age:17,gender:'female'}];

    const renderMembers = ({item,index}) => {
        return(
            <View style={styles.renderResultsStyle}>
                <View>
                    <Text>{index+1}</Text>
                </View>
                <View>
                    <Text>{item.name.toUpperCase()}</Text>
                    <Text>{item.gender.toUpperCase()}  {item.age}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <View style={{marginRight:2}}>
                        <Button title='View' onPress={()=>wipMessage()} color='#6082B6'/>
                    </View>
                    <View>
                        <Button title='Share' onPress={()=>wipMessage()} color='#6082B6'/>
                    </View>
                </View>
            </View>
        )
    }

    const wipMessage = () => {
        Alert.alert('This feature doesnt exist now , will be created later !','Please explore other features for now .',
                    [
                        {
                            text:'Ok'
                        }
                    ],
                    {cancelable:true}
        )
    }

    return (
        <ScreenBackground>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss()} accessible={false}>
                <View>
                    <View style={styles.searchHeading}>
                        <Text style={styles.searchHeadingText}>
                            Members Information
                        </Text>
                    </View>
                    <View style={styles.addMember}>
                        <View style={{justifyContent:'center'}}>
                            <Text style={{fontSize:15,color:'brown'}}>Total Members : {sampleMembers.length}</Text>
                        </View>
                        <View style={{borderWidth:5,borderRadius:10,borderColor:'#a0522d'}}>
                            <Button title='Add member' onPress={()=>wipMessage()} color='brown' disabled={sampleMembers.length>=4} />
                        </View>
                    </View>
                    <View>
                        {sampleMembers ?
                        <FlatList
                            data={sampleMembers}
                            keyExtractor={(item)=>item.id}
                            renderItem={renderMembers}
                        />
                        :
                        <View style={styles.noMembers}>
                            <Text style={{fontSize:18}}>No Members Added.</Text>
                            <Text style={{fontSize:20}}>Please Add Members !</Text>     
                        </View>   
                    }
                    </View>
                    
                </View>
            </TouchableWithoutFeedback>
        </ScreenBackground>
    )
};

export default MembersScreen;

const styles=StyleSheet.create({
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
    addMember:{
        margin: 5,
        backgroundColor: 'gray',
        flexDirection:'row',
        justifyContent:'space-between',
        padding:5    ,
    },
    renderResultsStyle: {
        backgroundColor: '#d7ebf2',
        margin: 10,
        borderWidth: 15,
        padding: 10,
        borderTopWidth: 0,
        paddingTop: 20,
        borderColor: '#e4f2f7',
        borderBottomRightRadius: 20,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    noMembers:{
        alignItems:'center',
        justifyContent:'center',
       
    }
})