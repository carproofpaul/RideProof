import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

const RegistrationDisplay = ({registration}) => {
    
    iconColour = registration === null || getRegistration() !== true  
        ? 'red' 
        : this.useType == "Commercial_Use" 
            ? 'green' 
            : 'orange' 

    iconName = registration === null || getRegistration() !== true  
        ? 'warning' 
        : 'check' 

    text = registration === null 
        ? 'Vehicle Never Registered' 
        : !getRegistration()
            ? 'Vehicle has not been Registered for\nthe past 2 years'
            : this.useType == "Commercial_Use" 
                ? 'Vehicle Registered for\nCommerical Use' 
                : 'Vehicle Registered for\nNon-Commerical Use' 

    return (
        <View style={styles.rows} >
            <Icon raised name={iconName} color={iconColour} size={40} />
            <Text style={styles.text}>{text}</Text>
        </View>
    )

    function getRegistration() {
        currentDate = new moment()
        this.useType
        for (var i=0; i< registration.length; i++) {
            if(currentDate.diff(registration[i].Date, 'years', true) <=2) {
                this.useType = registration[i].UseType
                return true
            }
        }
    }
<<<<<<< HEAD
    
    render() {
        iconColour = this.props.vhrReport.TitleOrRegistrationEvents === null || this.getRegistration()!==true  ? 'red' : this.useType=="Commercial_Use" ? 'green' : 'orange' 
        iconName = this.props.vhrReport.TitleOrRegistrationEvents === null || this.getRegistration()!==true  ? 'warning' : 'check' 
        text = this.props.vhrReport.TitleOrRegistrationEvents === null || this.getRegistration()!==true  
        ? 'Vehicle not currently registered' : this.useType=="Commercial_Use" 
        ? 'Vehicle registered for commerical use' : 'Vehicle registered for non-commerical use' 

        return (
            <View style={styles.rows} >
                <Icon raised name={iconName} color={iconColour} size={40} />
                <Text style={styles.text}>{text}</Text>

            </View>
        )
    }
=======
>>>>>>> a12302aab046ed5bc2302b21bf2986a98e1076fb
}

const styles = StyleSheet.create({
    rows: {
        flexDirection: 'row', 
        margin: 10,
        marginBottom: 10
    },
    text: {
        color: 'black',
        fontSize: 18,
        margin: 10,
    },
});

export default RegistrationDisplay;
