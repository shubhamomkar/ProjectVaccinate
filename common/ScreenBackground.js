import React from 'react';
import { ImageBackground, StyleSheet } from "react-native";
import appwallpaper from './../assets/appwallpaper.jpg';

const ScreenBackground = ({children}) => {
    return (
    <ImageBackground source={appwallpaper} style={styles.imagebackground} >
        {children}
    </ImageBackground>
    )
};

export default ScreenBackground;

const styles = StyleSheet.create({
    imagebackground:{
        flex:1
    }
});