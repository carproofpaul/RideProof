import React from 'react';
import { StyleSheet, Text, View, Button, Image, Modal, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Token } from '../../resources/Token';
import Loader from '../Loader';
import { ListItem, Divider } from 'react-native-elements';
import moment from 'moment';


export default class RegistrationDisplay extends React.Component {

    getRegistration() {
        currentDate = new moment()
        this.useType
        for (var i=0; i<this.props.vhrReport.TitleOrRegistrationEvents.length; i++) {
            if(currentDate.diff(this.props.vhrReport.TitleOrRegistrationEvents[i].Date, 'years', true) <=2) {
                this.useType = this.props.vhrReport.TitleOrRegistrationEvents[i].UseType
                return true
            }
        }
    }
    
    render() {
        iconColour = this.props.vhrReport.TitleOrRegistrationEvents === null || this.getRegistration()!==true  ? 'red' : this.useType=="Commercial_Use" ? 'green' : 'orange' 
        iconName = this.props.vhrReport.TitleOrRegistrationEvents === null || this.getRegistration()!==true  ? 'warning' : 'check' 
        text = this.props.vhrReport.TitleOrRegistrationEvents === null || this.getRegistration()!==true  
        ? 'Vehicle never registered' : this.useType=="Commercial_Use" 
        ? 'Vehicle registered for commerical use' : 'Vehicle registered for non-commerical use' 

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
        margin: 10,
        marginBottom: 10
    },
    text: {
        color: 'black',
        fontSize: 18,
        margin: 10,
    },
});
