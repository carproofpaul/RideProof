import React from 'react';
import { StyleSheet, Text, View, Button, Image, Modal, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Token } from '../../resources/Token';
import Loader from '../Loader';
import { ListItem, Divider } from 'react-native-elements';
import moment from 'moment';


export default class StolenDisplay extends React.Component {
    
    render() {

        iconColour = this.props.vhrReport.StolenEvents === null ? '#3890EA' : '#E2001D'
        iconName = this.props.vhrReport.StolenEvents === null ? 'check' : 'warning'
        text = this.props.vhrReport.StolenEvents === null ? 'Not Reported Stolen' : 'Vehicle Reported Stolen'

        return (
            <View style={styles.rows}>
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
