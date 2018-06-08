import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const StolenDisplay = ({stolenEvents}) => {

    iconColour = stolenEvents=== null ? 'green' : 'red'
    iconName = stolenEvents === null ? 'check' : 'warning'
    text = stolenEvents === null ? 'Not Reported Stolen' : 'Stolen Reports Found'

    return (
        <View style={styles.rows}>
            <Icon raised name={iconName} color={iconColour} size={40} />
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    rows: {
        flexDirection: 'row', 
        margin: 10
    },
    text: {
        color: 'black',
        fontSize: 18,
        margin: 10,
    },
});

export default StolenDisplay;
