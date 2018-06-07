import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';


export default class ServiceDisplay extends React.Component {
    
    render() {

            if(this.props.vhrReport.ServiceEvents !== null){
                numberOfService = 0
                now = moment()
                for(i = 0; i < this.props.vhrReport.ServiceEvents.length; i++){
                    then = moment(this.props.vhrReport.ServiceEvents[i].Date.split('T')[0])
                    if( now.diff(then, 'years', true) <= 1 ){
                        numberOfService++
                    }
                }

                iconColour = numberOfService == 0 ? 'red' : numberOfService >= 1 && numberOfService <= 2 ? 'orange' : 'green'
                iconName = numberOfService < 3 ? 'warning' : 'check'
                text = numberOfService == 0 ? 'Vehicle not serviced in the past year' : 'Vehicle serviced ' + numberOfService + ' time(s) in the past year'
            } 
            else {
                iconColour = 'red'
                iconName = 'warning'
                text = 'Vehicle has no service records'
            }


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
