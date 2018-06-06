import React from 'react';
import { StyleSheet, Text, View, Button, Image, Modal, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Token } from '../../resources/Token';
import Loader from '../Loader';
import { ListItem, Divider } from 'react-native-elements';
import moment from 'moment';


export default class AccidentDisplay extends React.Component {
    
    render() {

        iconColour = this.props.vhrReport.AccidentEvents === null ? '#3890EA' : '#E2001D'
        iconName = this.props.vhrReport.AccidentEvents === null ? 'smile-o' : 'warning'
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
