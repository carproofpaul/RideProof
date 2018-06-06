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
                console.log("Use Type: " + this.props.vhrReport.TitleOrRegistrationEvents[i].UseType)
                return true
            }
        }
    }
    
    render() {
        iconColour = this.props.vhrReport.TitleOrRegistrationEvents === null ? '#E2001D' : this.getRegistration()==true ? '#3890EA' : '#E2001D'
        iconName = this.props.vhrReport.TitleOrRegistrationEvents === null ? 'warning' : this.getRegistration()==true ? 'check' : 'warning'
        text = this.props.vhrReport.TitleOrRegistrationEvents === null 
            ? 'Vehicle never been registered' 
            :  this.getRegistration()==true ? 'Vehicle currently registered' : 'Vehicle not currently registered'  

        return (
            <View style={styles.rows} >
                <Icon raised name={iconName} color={iconColour} size={40} />
                {/* {this.getRegistration()==true ? <Text style={styles.text}>Vehicle registered</Text> : <Text style={styles.text}>Vehicle not registered</Text>} */}
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
