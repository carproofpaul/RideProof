import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';


export default class AccidentDisplay extends React.Component {

    isWithinYear(data){
        for (i = 0; i < data.length; i++) {
            if(moment().diff(data[i].Date, 'years', true) <= 1) {
                return true
            }
        }
        return false
    }
    
    render() {
        iconColour = this.props.vhrReport.AccidentEvents === null ? 'green' : this.isWithinYear(this.props.vhrReport.AccidentEvents) ? 'red' : 'orange'
        iconName = this.props.vhrReport.AccidentEvents === null ? 'check' : 'warning'
        text = this.props.vhrReport.AccidentEvents === null 
            ? 'No Accidents Reported' 
            : this.props.vhrReport.AccidentEvents.length + ' Accident(s) Reported'  

        return (
            <View style={styles.rows} >
                <Icon raised name={iconName} color={iconColour} size={40} />
                <Text style={styles.text}>{text}</Text>
            </View>
        )
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
