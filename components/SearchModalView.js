import React from 'react';
import { Button, FlatList, Share, StyleSheet, Text, View } from 'react-native';
import ScreenBackground from '../common/ScreenBackground';

const SearchModalView = (props) => {
    const {setModalVisible,selectedResult, setSelectedResult} = props
    const sampleMembers = [{id:1,name:'John William',age:20,gender:'male'},{id:2,name:'Sara William',age:17,gender:'female'}];

    const handleShare = async(item) => {
        const statement = `${item.name.toUpperCase()} , ${item.gender.toUpperCase()} aged ${item.age} scheduled visit on ${selectedResult.date} at ${selectedResult.name} for ${selectedResult.vaccine}`
        try{
            const result = await Share.share({
                message:statement,
                title:'Share or Copy'
            })
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                  // shared with activity type of result.activityType
                } else {
                  // shared
                }
              } else if (result.action === Share.dismissedAction) {
                // dismissed
              }
        }catch(err){
            alert(err.message);

        }
    }

    const renderMembers = ({item}) => {
        return(
            <View style={styles.memberView}>
                <View>
                    <View>
                        <Text>{item?.name.toUpperCase()}</Text>
                    </View>
                    <View>
                        <Text>{item?.age}</Text>
                        <Text>{item?.gender.toUpperCase()}</Text>
                    </View>
                </View>
                <View style={{paddingTop:10}}>
                    <Button
                        title='Share'
                        onPress={()=>handleShare(item)}
                        color='brown'
                        disabled={item.age<selectedResult.min_age_limit}
                    />
                </View>
            </View>
        )
    };

    return (
        <ScreenBackground>
        <View style={styles.modalView}>
            <View style={styles.vInfo}>
            <Text style={{fontWeight:'500'}}>{selectedResult.name}</Text>
            <Text style={styles.vDetails}>Type - {selectedResult.vaccine}</Text>
            <Text style={styles.vDetails}>Min Age Limit - {selectedResult.min_age_limit}</Text>
            </View>
            {sampleMembers &&  <Text style={{textAlign:'center'}}>---Members---</Text>}
            {sampleMembers ? 
            <FlatList
                keyExtractor={(item)=>item.id}
                data={sampleMembers}
                renderItem={renderMembers}
            />
            :
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text style={{color:'#b2beb1'}}>No Members Added. Please Add Members & Try Again !</Text></View>
            }
            <Button title='Close' onPress={()=>{setModalVisible(false);setSelectedResult({});}} color='brown'/>
        </View>
        </ScreenBackground>
    )
};

export default SearchModalView;

const styles = StyleSheet.create({
    modalView: {
        width: '60%',
        height: '50%',
        backgroundColor: 'gray',
        marginTop: '40%',
        marginLeft: '20%',
        padding: 10
    },
    vInfo: {
        backgroundColor: '#eaddcc',
        padding: 5,
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 30
    },
    vDetails:{
        textDecorationLine:'underline',
        textDecorationColor:'brown',
        fontStyle:'italic'
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