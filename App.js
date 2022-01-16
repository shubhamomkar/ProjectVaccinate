import React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import appwallpaper from './assets/appwallpaper.jpg';
import ParentScreen from './components/ParentScreen';
import UserProvider from './contexts/UserContext';

const App = () => {
  return(
    <SafeAreaView style={styles.safeareaview}>
      <UserProvider>
      <ImageBackground source={appwallpaper} style={styles.imagebackground} >
      <ParentScreen/>
      </ImageBackground>
      </UserProvider>
    </SafeAreaView>
  )
};

export default App;

const styles = StyleSheet.create({
  safeareaview:{
    flex:1,
  },
  imagebackground:{
    flex:1
  }
});