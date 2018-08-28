import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

/**
 * Displays a quick summary of the vehicle's accident history. 
 */

const AccidentDisplay = ({accidentEvents}) => {

    iconColour = accidentEvents === null 
        ? 'green' 
        : isWithinYear(accidentEvents) 
            ? 'red' 
            : 'orange'
    iconName = accidentEvents === null 
        ? 'check' 
        : 'warning'
    text = accidentEvents === null 
        ? 'No Accidents Reported' 
        : accidentEvents.length + ' Accident(s) Reported'  

    return (
        <View style={styles.rows} >
            <Icon raised name={iconName} color={iconColour} size={40} />
            <Text style={styles.text}>{text}</Text>
        </View>
    )

    function isWithinYear(data){
        for (i = 0; i < data.length; i++) {
            if(moment().diff(data[i].Date, 'years', true) <= 1) {
                return true
            }
        }
        return false
    }
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

export default AccidentDisplay;
