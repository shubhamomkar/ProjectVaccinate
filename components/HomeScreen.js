import React, { useContext, useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import ScreenBackground from '../common/ScreenBackground';
import { userContext } from '../contexts/UserContext';
import { styles } from './HomeScreenStyles';

const url = `https://api.cowin.gov.in/api/v1/reports/v2/getPublicReports?state_id=&district_id=&date=${new Date().toISOString().substring(0, 10)}`;

const HomeScreen = ({navigation}) => {
    const [vaccinationInfo, setVaccinationInfo] = useState({});
    const {user} = useContext(userContext);
    const isUser = user ? true : false;

    const fetchUpdates = async () => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            const values = data?.topBlock?.vaccination;
            setVaccinationInfo(values);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchUpdates();
        }, 120 * 1000);
        return () => clearInterval(intervalId);
    }, [])

    const handleUserButton = () => {
        if(isUser){
            navigation.navigate('Others',{screen:'Members'});
        }else{
            navigation.navigate('Others',{screen:'Login'});
        }
    }




    return (
        <ScreenBackground>
        <View style={styles.outerView} >
            <View style={styles.heading}>
                <Text style={styles.headingText}>Project Vaccinate</Text>
            </View>
            <View style={styles.header}>
                <Text style={styles.headerText}>Doses given till now : <Text style={styles.headerCount}>{vaccinationInfo?.total ? vaccinationInfo.total.toLocaleString('en-US') : `---`}</Text></Text>
            </View>
            <View style={styles.header}>
                <Text style={styles.headerText}>Doses given today : <Text style={styles.headerCount}>{vaccinationInfo?.today ? vaccinationInfo.today.toLocaleString('en-US') : `---`}</Text></Text>
            </View>
            <View style={styles.buttonBox}>
                <View style={styles.buttonBox}>
                    <Button title={isUser ? 'Members' : 'Login'} onPress={handleUserButton} />
                </View>
                <View style={styles.buttonBox}>
                    <Button title='Search' onPress={() => navigation.navigate('Others',{screen:'Search'})} />
                </View>

            </View>

        </View>
        </ScreenBackground>
    )

}

export default HomeScreen;

// const styles = StyleSheet.create({
//     outerView: {
//         flex: 1
//     },
//     header: {
//         backgroundColor: 'lightblue',
//         borderWidth: 2,
//         borderColor: 'blue',
//         borderRadius: 10,
//         padding: 10,
//         marginLeft: 20,
//         marginRight: 20,
//         marginTop: 20
//     },
//     headerText: {
//         fontSize: 20,
//         fontFamily: 'serif',
//         fontStyle: 'italic',
//         color: 'brown'
//     },
//     headerCount: {
//         color: 'darkblue',
//         fontSize: 25
//     },
//     heading: {
//         alignItems: 'center',
//         padding: 5,
//         backgroundColor: 'lightgray',
//         borderColor: 'gray',
//         borderWidth: 5
//     },
//     headingText: {
//         fontSize: 25,
//         color: 'darkblue',
//         fontStyle: 'italic',
//         fontWeight: '500'
//     },
//     buttonBox:{
//         alignItems:'center',
//         justifyContent:'center',
//         margin:10,
//         padding:10
//     }
// })