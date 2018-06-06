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

        var currentDate = new Date();
        var yearAgo = new Date();
        yearAgo.setFullYear(yearAgo.getFullYear()-1);

        var inRange = true
        try {
            var serv = new Date(this.props.vhrReport.ServiceEvents[this.props.vhrReport.ServiceEvents.length-1].Date);
            lastServ = serv.toString();

            if(serv < currentDate && serv > yearAgo)
                inRange=true;
            else 
                inRange=false;

        } catch(error){}

        return (
            <View>
                {
                    this.props.vhrReport.ServiceEvents === null ? 
                    null : 
                    inRange == true ? 
                    <View style={styles.rows}>
                        <Icon name='wrench' color='#3890EA' size={40}></Icon> 
                        <Text style={styles.list}>Last service reported {lastServ.split(' ').slice(1,4).join(' ')}</Text>
                    </View>
                    :
                    <View style={styles.rows}>
                        <Icon name='warning' color='#E2001D' size={40}></Icon>
                        <Text style={styles.list}>Vehicle has no reported service in the last year</Text>
                        </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rows: {
        flexDirection: 'row', 
        paddingBottom: 10
      },
    list: {
        color: 'black',
        fontSize: 18,
        paddingLeft: 10,
    },
});
