import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, Keyboard, ScrollView, Button, ActivityIndicator, Modal, Alert } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { FlatList } from 'react-native-gesture-handler';
import ScreenBackground from '../common/ScreenBackground';
import SearchModalView from './SearchModalView';

const SearchScreen = () => {
    const [searchValue, setSearchValue] = useState({ pincode: '', date: new Date() });
    const [open, setOpen] = useState(false);
    const [result, setResult] = useState({ loading: false, resultData: {} });
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedResult , setSelectedResult ] = useState({});

    const searchDisabled = (searchValue.pincode.length == 6 && searchValue.date) ? false : true;

    const renderResults = ({ item }) => {
        return (
            <View style={styles.renderResultsStyle}>
                <View style={{width:150}}>
                    <Text style={{flex:1,flexWrap:'wrap'}}>{item.name}</Text>
                    <Button 
                        title='Apply' 
                        onPress={()=>{
                                setSelectedResult(item);
                                setModalVisible(true);
                            }}
                        color='#6082B6'
                        disabled={item.available_capacity<1}
                    />
                </View>
                <View>
                    <Text>Doses : {item.available_capacity}</Text>
                    <Text>Min Age : {item.min_age_limit}</Text>
                    <Text>Type : {item.vaccine}</Text>
                </View>
            </View>
        )
    
    }

    const formatDate = (date) => {
        let [year, month, day] = date.toISOString().substring(0, 10).split('-');
        return `${day}-${month}-${year}`
    }

    const searchResults = async () => {
        try {
            setResult({ ...result, loading: true });
            const response = await fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${searchValue.pincode}&date=${formatDate(searchValue.date)}`);
            const data = await response.json();
            setTimeout(() => { setResult({ loading: false, resultData: data }) }, 1000)


        } catch (err) {
            setResult({ loading: false, resultData: {} })
            // stoploading ,try aggain
        }
    }

    return (
        <ScreenBackground>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View>
                    {/* Header */}
                    <View style={styles.searchHeading}>
                        <Text style={styles.searchHeadingText}>
                            Find Vaccine Sessions
                        </Text>
                    </View>

                    {/* Search Area */}
                    <View style={styles.searchArea}>
                        <View>
                            <Text style={styles.searchFormText}>Enter Area Pincode</Text>
                            <TextInput initialValue='' value={searchValue.pincode} onChangeText={(val) => setSearchValue({ ...searchValue, pincode: val })} keyboardType='numeric' textAlign='center' maxLength={6} style={styles.inputPincode} />
                        </View>
                        <View>
                            <Text style={[styles.searchFormText, { textAlign: 'center' }]}>{searchValue?.date.toISOString().substring(0, 10)}</Text>
                            <Button title='Select Date' onPress={() => setOpen(true)} color='brown' />
                            <DatePicker
                                modal
                                open={open}
                                date={searchValue.date}
                                onConfirm={(date) => {
                                    setOpen(false)
                                    setSearchValue({ ...searchValue, date: date })
                                }}
                                onCancel={() => {
                                    setOpen(false)
                                }}
                                minimumDate={new Date()}
                                maximumDate={new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)}
                                mode='date'
                                title='Select date within next 7 days'
                            />
                        </View>
                        <View style={{ paddingTop: 20 }}>
                            <Button title='Search' color='brown' disabled={searchDisabled} onPress={searchResults} />
                        </View>
                    </View>

                    {/* Search Results Area */}
                    <View>
                        {result.loading  ? 
                        <ActivityIndicator size='large' color='green' animating={result.loading} />
                        :
                        <View>
                            <Text>Search Results</Text>
                        {result.resultData?.sessions &&
                            <FlatList
                                data={result.resultData.sessions}
                                keyExtractor={item => item.session_id}
                                renderItem={renderResults}
                            />
                        }
                        </View>}
                    </View>
                    {/* <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={()=>{
                            Alert.alert('Modalclosed');
                            setModalVisible(!modalVisible);
                        }}
                        >
                            <View style={{width:200,height:200,backgroundColor:'white'}}><Text>Hello</Text>
                            <Button title='Close' onPress={()=>setModalVisible(false)}/>
                            </View>
                        </Modal>
                        </View> */}

                    <View>
                        <Modal
                            animationType='fade'
                            transparent={false}
                            visible={modalVisible}
                            onRequestClose={() => {
                                Alert.alert('Modal closed');
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <SearchModalView setModalVisible={setModalVisible} selectedResult={selectedResult} setSelectedResult={setSelectedResult} />
                        </Modal>
                    </View>


                </View>
            </TouchableWithoutFeedback>
        </ScreenBackground>
    )
};

export default SearchScreen;


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
    searchFormText: {
        fontSize: 14,
        color: 'brown',
    },
    searchArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        margin: 5,
        borderRadius: 5,
        backgroundColor: 'gray'
    },
    inputPincode: {
        borderBottomWidth: 2,
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
    }
})