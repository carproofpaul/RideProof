import React from 'react';
import { StyleSheet, Text, View, Button, Image, Modal, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Token } from '../../resources/Token';
import Loader from '../Loader';
import { ListItem, Divider } from 'react-native-elements';
import moment from 'moment';


export default class ServiceDisplay extends React.Component {
    
    render() {

        var currentDate = new moment();
        try {
            var serv = moment(this.props.vhrReport.ServiceEvents[this.props.vhrReport.ServiceEvents.length-1].Date.split('T')[0])
            lastServ = serv.toString();
            console.log(serv)
            console.log(currentDate)

            if(currentDate.diff(serv, 'years', true) <=1) {
                var inRange=true;
            }
            else {
                var inRange=false;
            }

        } catch(error){}

        iconColour = this.props.vhrReport.ServiceEvents === null ? '#3890EA' : '#E2001D'
        iconName = this.props.vhrReport.ServiceEvents === null ? 'wrench' : 'warning'
        text = this.props.vhrReport.ServiceEvents === null ? null : inRange
            ? 'Last service reported' + lastServ.split(' ').slice(1,4).join(' ')
            : 'Vehicle has no reported service \nin the last year'

        return (
            <View style={styles.rows}>
                <Icon name={iconName} color={iconColour} size={40} />
                <Text style={styles.text}>{text}</Text>
            </View>
        )
    }
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
