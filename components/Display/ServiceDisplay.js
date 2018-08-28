import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

/**
 * Display available service history for the vehicle
 * NOTE: having no service history does not mean it has never been serviced. Some companies do not report. 
 */

const ServiceDisplay = ({serviceEvents}) => {
    
    if(serviceEvents !== null){
        //only show service that's been done within one year. 
        numberOfService = 0
        now = moment()
        for(i = 0; i < serviceEvents.length; i++){
            then = moment(serviceEvents[i].Date.split('T')[0])
            if( now.diff(then, 'years', true) <= 1 ){
                numberOfService++
            }
        }

        iconColour = numberOfService == 0 ? 'red' : numberOfService >= 1 && numberOfService <= 2 ? 'orange' : 'green'
        iconName = numberOfService < 3 ? 'warning' : 'check'
        text = numberOfService == 0 ? 'Vehicle not Serviced in the Past Year' : 'Vehicle Serviced ' + numberOfService + ' Time(s) in the Past Year'
    } else {
        iconColour = 'red'
        iconName = 'warning'
        text = 'Vehicle has no Service Records'
    }

    return (
        <View style={styles.rows}>
            <Icon name={iconName} color={iconColour} size={40} />
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    rows: {
        flexDirection: 'row', 
        margin: 10,
    },
    text: {
        color: 'black',
        fontSize: 18,
        margin: 10,
        flexWrap: 'wrap'
    },
});

export default ServiceDisplay;

