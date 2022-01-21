import React from 'react';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    outerView: {
        flex: 1
    },
    header: {
        backgroundColor: 'lightblue',
        borderWidth: 2,
        borderColor: 'blue',
        borderRadius: 10,
        padding: 10,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        alignItems:'center'
    },
    headerText: {
        fontSize: 20,
        fontFamily: 'serif',
        fontStyle: 'italic',
        color: 'brown'
    },
    headerCount: {
        color: 'darkblue',
        fontSize: 25
    },
    heading: {
        alignItems: 'center',
        padding: 5,
        backgroundColor: 'lightgray',
        borderColor: 'gray',
        borderWidth: 5
    },
    headingText: {
        fontSize: 25,
        color: 'darkblue',
        fontStyle: 'italic',
        fontWeight: '500'
    },
    buttonBox:{
        alignItems:'center',
        justifyContent:'center',
        margin:10,
        padding:10
    }
})