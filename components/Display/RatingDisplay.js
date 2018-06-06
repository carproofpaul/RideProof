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

        scale = 0

        //Registration 1 for registered, 3 for not
        if(this.props.vhrReport.TitleOrRegistrationEvents !== null){
            isRegistered = false
            now = moment()
            
            for(i = 0; i < this.props.vhrReport.TitleOrRegistrationEvents.length; i++){
                then = moment(this.props.vhrReport.TitleOrRegistrationEvents[i].Date.split('T')[0])
                if( then.diff(now, 'years', true) <= 2 ){
                    isRegistered = true
                }
            }

            if(isRegistered == true) scale = scale + 1
            else scale = scale - 3
        }

        //ACCIDENT 0 - 3
        if(this.props.vhrReport.AccidentEvents !== null){
            numberOfAccidents = 0
            for(i = 0; i < this.props.vhrReport.AccidentEvents.length; i++){
                now = moment()
                then = moment(this.props.vhrReport.AccidentEvents[i].Date.split('T')[0])
                if( then.diff(now, 'years', true) <= 1 ){
                    numberOfAccidents++
                }
            }

            if(numberOfAccidents == 0) scale = scale + 4
            else if(numberOfAccidents == 1) scale = scale + 2
            //numberOfAccidents > 1, bad 
        } else {scale = scale + 3}

        //Recalls 0 - 3
        if(this.props.vhrReport.RecallEvents !== null){
            numberOfRecalls = 0
            for(i = 0; i < this.props.vhrReport.RecallEvents.length; i++){
                if( this.props.vhrReport.RecallEvents[i].Status === 'Outstanding' || this.props.vhrReport.RecallEvents[i].Status === 'Unknown'){
                    numberOfRecalls++
                }
            }
            if(numberOfRecalls == 0) scale = scale + 3
            else if(numberOfRecalls == 1) scale = scale + 2
            else if(numberOfRecalls > 1) scale = scale + 3
        } else {scale = scale + 3}

        //Service 0-3
        if(this.props.vhrReport.ServiceEvents !== null){
            numberOfService = 0
            now = moment()
            for(i = 0; i < this.props.vhrReport.ServiceEvents.length; i++){
                then = moment(this.props.vhrReport.ServiceEvents[i].Date.split('T')[0])
                if( then.diff(now, 'years', true) <= 1 ){
                    numberOfService++
                }
            }
            if(numberOfService >= 3) scale = scale + 3
            else if(numberOfService == 2) scale = scale + 2
            else if(numberOfService == 1) scale++
        } else {scale = scale + 2}


        return (
<<<<<<< HEAD
            <View style={{alignItems: 'center', margin: 5}}>
            <Text style={styles.header}>{this.props.recalls.ModelYear + " " + this.props.recalls.Make + " " + this.props.recalls.Model}</Text>
                <Text style={{fontSize: 30, fontWeight: 'bold'}}>7/10 PROOFSCORE</Text>
=======
            <View style={{alignItems: 'center', margin: 10}}>
                <Text style={{fontSize: 30, fontWeight: 'bold'}}>{scale}/10 PROOFSCORE</Text>
                <Text style={styles.header}>{this.props.recalls.ModelYear + " " + this.props.recalls.Make + " " + this.props.recalls.Model}</Text>
                <Text>{this.props.recalls.Vin}</Text>                
>>>>>>> c8f48267eed5d108e9b27889b877b46207b66736
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
