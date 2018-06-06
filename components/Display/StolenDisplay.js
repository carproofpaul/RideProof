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

        return (
            <View>
            {
                this.props.vhrReport.StolenEvents === null ? 
                    <Icon name='check' color='#3890EA' size={40}>
                    <Text style={styles.list}>Not reported stolen</Text></Icon> 
                : 
                    <Icon raised name='warning'color='#E2001D' size={40}>
                        <Text>Vehicle reported stolen</Text>
                    </Icon>
            }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        color: 'black',
        fontSize: 18,
    },
});
