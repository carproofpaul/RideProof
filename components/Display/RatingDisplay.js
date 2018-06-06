import React from 'react';
import { StyleSheet, Text, View, Button, Image, Modal, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Token } from '../../resources/Token';
import Loader from '../Loader';
import { ListItem, Divider } from 'react-native-elements';
import moment from 'moment';


export default class RatingDisplay extends React.Component {
    
    render() {

        return (
            <View style={{alignItems: 'center', margin: 5}}>
            <Text style={styles.header}>{this.props.recalls.ModelYear + " " + this.props.recalls.Make + " " + this.props.recalls.Model}</Text>
                <Text style={{fontSize: 30, fontWeight: 'bold'}}>7/10 PROOFSCORE</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        fontSize: 25,
        fontWeight: 'bold',
    },

});
