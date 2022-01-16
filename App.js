import React, { useEffect } from "react";
import { View , Text, SafeAreaView, StyleSheet, Button, Alert, Modal, ActivityIndicator, Share, Platform } from "react-native";
import { useState } from "react/cjs/react.development";

import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
	const [ showModal,setShowModal] = useState(false);


	useEffect(()=>{
	fetch('https://facebook.github.io/react-native/movies.json')
      .then(response => response.json())
      .then(responseData => {
        console.log('API data',responseData);
      })
      .catch(error => {
        console.error(error);
      });
		AsyncStorage.clear();
		AsyncStorage.setItem('alertLabel', 'Hi from stoqraage')
	})
	
	const user = 'SYSTEM';
	const handleAlert = async () => {
		const al = await AsyncStorage.getItem('alertLabel')
		Alert.alert('Are you sure ?',al,[
			{
				text:'Close',
				onPress:()=>console.log('closed'),
				style:'cancel'
			},
			{
				text:'Okay',
				onPress:()=>console.log('Success')
			}
		],
		{cancelable:true}
		)
	}

	const handleShare = async () => {
			try {
				const result = await Share.share({
					message:user
				});
				if (result.action === Share.sharedAction) {
					if (result.activityType) {
					  // shared with activity type of result.activityType
					} else {
					  // shared
					}
				  } else if (result.action === Share.dismissedAction) {
					// dismissed
				  }
			}catch (error) {
				alert(error.message);
			  }
	}

	return (
		<SafeAreaView style={{flex:1}}>
		<View style={{
			flex:1,
			alignItems:'center',
			justifyContent:'center'
		}}>
			<Modal
			visible={showModal}
			onDismiss={()=>{
				Alert.alert('Modal closing !','Modal Closed',[{text:'Okay',onPress:()=>console.log('Modal closing')}])
			}}
			>
				<View style={{backgroundColor:'gray',justifyContent:'center',alignItems:'center'}}><Text>Inside Modal</Text></View>
				<ActivityIndicator color='blue' size='small' />
				<Button onPress={()=>setShowModal(false)} title='Hide Modal'/>
			</Modal>
			<Text style={styles.text}>Hello World {user}</Text>
			<Button onPress={handleAlert} title='Generate Alert'/>
			{Platform.OS !== 'android' && <Button onPress={()=>setShowModal(true)} title='Show Modal'/>}
			<Button onPress={handleShare} title='Share'/>
		</View>
		</SafeAreaView>
	)
};

export default App;

const styles = StyleSheet.create({
	container: {flex: 1},
	layout: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
	},
	text: {fontSize: 20,borderColor:'blue',borderWidth:2,padding:10, fontWeight: 'bold', color: 'blue',
		...Platform.select({
			android:{
				borderColor:'yellow'
			},
			ios:{
				borderColor:'red'
			}
		})
		},
  });
  
